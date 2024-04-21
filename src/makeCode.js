const AppCode = require('./handler/AppCode');
const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const fs = require('fs');
const fse = require('fs-extra');
const logger = require('@utils/logger');
const { init } = require('@src/handler/parser/');

function filenameAddDesc(name, desc) {
  const arr = name.split('.');
  if (arr.length < 2) throw new Error(`文件名不正确: ${name}`);
  arr[arr.length - 2] += desc;
  return arr.join('.');
}

function writeFile(ts, immucfg, { jscode, html, appcode = [] }, $_ts, code) {
  const files = [
    {
      name: 'ts.json',
      desc: immucfg ? 'url方式提取的ts：' : '程序接收的ts：',
      text: JSON.stringify(ts),
    },
    immucfg ? {
      name: 'immucfg.json',
      desc: 'url方式提取的静态文本：',
      text: JSON.stringify(immucfg),
    } : null,
    {
      name: 'ts-full.json',
      desc: '程序生成的ts：',
      text: JSON.stringify($_ts),
    },
    html,
    jscode,
    {
      name: jscode ? filenameAddDesc(jscode.name, '-dynamic') : 'dynamic.js',
      desc: `${jscode?.name || '程序'}生成的动态代码：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
    },
    ...appcode.reduce((ans, it) => {
      ans.push(it);
      if (it.decryptCode) {
        ans.push({
          name: filenameAddDesc(it.name, '-decrypt'),
          desc: `${it.name}生成的解密代码：`,
          text: it.decryptCode,
        });
      }
      return ans;
    }, []),
  ].filter(Boolean).map(it => ({ ...it, filepath: paths.outputResolve('makecode', it.name) }))
  if (!fs.existsSync(paths.outputResolve('makecode'))) fse.ensureDirSync(paths.outputResolve('makecode'));
  files.forEach(({ filepath, text, code }) => filepath && fs.writeFileSync(filepath, text || code));
  return files;
}

module.exports = function (ts, immucfg, mate = {}) {
  const startTime = new Date().getTime();
  if (fs.existsSync(paths.outputResolve('makecode'))) {
    fse.moveSync(paths.outputResolve('makecode'), paths.outputResolve('makecode-old'), { overwrite: true });
  }
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  init($_ts);
  mate.appcode?.forEach((appcode, idx) => {
    appcode.decryptCode = new AppCode(AppCode.getParams(appcode.code)).run();
  });
  const files = writeFile(ts, immucfg, mate, $_ts, code);
  logger.info([
    `代码还原成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, typeof it === 'string' ? it : `${it.desc}${paths.relative(it.filepath)}${idx === files.length - 1 || it.newLine ? '\n' : ''}`]), []),
  ].join('\n  '));
}
