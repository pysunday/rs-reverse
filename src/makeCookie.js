const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');

function parseR2mka(text) {
  const start = text.indexOf('"') + 1;
  const end = text.lastIndexOf('"') - 2;
  return unescape(text.substr(start, end));
}

module.exports = function (ts, immucfg) {
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const r2mkaText = parseR2mka(coder.r2mkaText);
  const cookie = new Cookie($_ts, r2mkaText).run();
  logger.info([`生成动态cookie成功！用时：${new Date().getTime() - startTime}ms\n`, `Cookie值: ${cookie}`, `Cookie长: ${cookie.length}\n`].join('\n  '))
}

