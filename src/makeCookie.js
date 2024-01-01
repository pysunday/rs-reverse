const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');

module.exports = function (ts) {
  const startTime = new Date().getTime();
  const coder = new Coder(ts);
  const { code, $_ts } = coder.run();
  const cookie = new Cookie($_ts).run();
  logger.info([`生成动态cookie成功！用时：${new Date().getTime() - startTime}ms\n`, `Cookie值: ${cookie}`, `Cookie长: ${cookie.length}\n`].join('\n  '))
}

