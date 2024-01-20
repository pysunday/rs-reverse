const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const paths = require('@utils/paths');
const fs = require('fs');
const gv = require('@src/handler/globalVarible');

function parseR2mka(text) {
  const start = text.indexOf('"') + 1;
  const end = text.lastIndexOf('"') - 2;
  return unescape(text.substr(start, end));
}

function writefile(ts, immucfg) {
  // 如果是url形式的则保存ts和immucfg
  const now = new Date().getTime();
  const files = [
    {
      name: `makecookie_url_ts_${now}`,
      desc: 'url方式提取的ts：',
      text: JSON.stringify(ts),
    },
    {
      name: `makecookie_url_immutext_${now}`,
      desc: 'url方式提取的静态文本：',
      text: JSON.stringify(immucfg),
    },
  ].map(it => ({ ...it, filepath: paths.outputResolve(it.name) + '.json' }))
  if (!fs.existsSync(paths.outputPath)) fs.mkdirSync(paths.outputPath);
  files.forEach(({ filepath, text }) => fs.writeFileSync(filepath, text))
  logger.info('url方式保存文件：\n\n  ' + files.reduce((ans, it, idx) => ([...ans, `${it.desc}${it.filepath}${idx === files.length - 1 ? '\n' : ''}`]), []).join('\n  '));
}

module.exports = function (ts, immucfg) {
  gv._setAttr('_ts', ts);
  if (immucfg) writefile(ts, immucfg);
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const r2mkaText = parseR2mka(coder.r2mkaText);
  const cookie = new Cookie($_ts, r2mkaText).run();
  if (gv.metaContent) {
    logger.info(`存在meta-content值：${gv.metaContent.content} 解析结果：${gv.metaContent.value}`);
  }
  logger.info([`生成动态cookie成功！用时：${new Date().getTime() - startTime}ms\n`, `Cookie值: ${cookie}`, `Cookie长: ${cookie.length}\n`].join('\n  '))
  return cookie;
}

