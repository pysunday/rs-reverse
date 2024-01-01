const gv = require('../globalVarible');
const common = require('./common');
const logger = require('@utils/logger');

function init(ts) {
  const startTime = new Date().getTime();
  gv.setAttr('utils', common);
  gv.setAttr('ts', ts);
  require('./r2mka').init();
  require('./tscp').init();
  require('./tscd').init();
  require('./bignum').init();
  logger.debug(`globalVarible完成初始化！用时：${new Date().getTime() - startTime}ms`);
}

module.exports = {
  ...common,
  init,
}

