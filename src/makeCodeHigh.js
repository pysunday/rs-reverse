const AppCode = require('./handler/AppCode');
const paths = require('@utils/paths');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const gv = require('@src/handler/globalVarible');
const getCode = require('@utils/getCode');
const adapt = require('@src/adapt');
const { getLength } = require('@src/handler/parser/common');

function parseR2mka(text) {
  const start = text.indexOf('"') + 1;
  const end = text.lastIndexOf('"') - 2;
  return unescape(text.substr(start, end));
}

function filenameAddDesc(name, desc) {
  const arr = name.split('.');
  if (arr.length < 2) throw new Error(`文件名不正确: ${name}`);
  arr[arr.length - 2] += desc;
  return arr.join('.');
}

function writeFile(step, ts, immucfg, { jscode, html, appcode = [] }, $_ts, code) {
  const files = [
    {
      name: 'ts.json',
      desc: 'url方式提取的ts：',
      text: JSON.stringify(ts),
    },
    {
      name: 'immucfg.json',
      desc: 'url方式提取的静态文本：',
      text: JSON.stringify(immucfg),
    },
    {
      name: 'ts-full.json',
      desc: '程序生成的ts：',
      text: JSON.stringify($_ts),
    },
    jscode,
    html,
    {
      name: filenameAddDesc(jscode.name, '-dynamic'),
      desc: `${jscode.name}生成的动态代码：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
    },
    ...appcode,
    ...appcode.filter(it => it.decryptCode).map(it => ({
      name: filenameAddDesc(it.name, '-decrypt'),
      desc: `${it.name}生成的解密代码：`,
      text: it.decryptCode,
    }))
  ].filter(Boolean).map(it => ({ ...it, filepath: paths.outputResolve('makecode-high', step, it.name) }))
  if (!fs.existsSync(paths.outputResolve('makecode-high', step))) fse.ensureDirSync(paths.outputResolve('makecode-high', step));
  return files;
}

function firstStep(ts, immucfg, mate) {
  gv._setAttr('_ts', ts);
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const files = writeFile('first', ts, immucfg, mate, $_ts, code);
  const r2mkaText = parseR2mka(coder.r2mkaText);
  const cookieVal = new Cookie($_ts, r2mkaText, coder, code).run();
  const cookieKey = gv.utils.ascii2string(gv.keys[7]).split(';')[5] + 'P';
  return [files, `${cookieKey}=${cookieVal}`];
}

function secondStep(ts, immucfg, mate) {
  gv._setAttr('_ts', ts);
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  mate.appcode.forEach((appcode, idx) => {
    appcode.decryptCode = new AppCode(AppCode.getParams(appcode.code), idx + 1).run();
  });
  return writeFile('second', ts, immucfg, mate, $_ts, code);
}

module.exports = async function (ts, immucfg, mate) {
  if (fs.existsSync(paths.outputResolve('makecode-high'))) {
    fse.moveSync(paths.outputResolve('makecode-high'), paths.outputResolve('makecode-high-old'), { overwrite: true });
  }
  const startTime = new Date().getTime();
  const [files, cookieStr] = firstStep(ts, immucfg, mate);
  files.unshift('\n第1次请求：\n');
  const result = await getCode(mate.url, cookieStr);
  files.push('\n第2次请求：\n', ...secondStep(result.$_ts, adapt(result, gv.argv.adapt), result));
  files.forEach(({ filepath, text, code }) => filepath && fs.writeFileSync(filepath, text || code));
  logger.info([
    `代码还原成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, typeof it === 'string' ? it : `${it.desc}${paths.relative(it.filepath)}${idx === files.length - 1 || it.newLine ? '\n' : ''}`]), []),
  ].join('\n  '));
}

