const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');

module.exports = function (ts) {
  logger.info(`传入的$_ts.nsd: ${ts.nsd}`);
  logger.info(`传入的$_ts.cd: ${ts.cd}`);
  const coder = new Coder(ts);
  const { code, $_ts } = coder.run();
  const cookie = new Cookie($_ts);
  cookie.run();
}

