// 将加密的字符串解密并切割成数组
const gv = require('../globalVarible');
const parse = require('./common/main');
const logger = require('@utils/logger');

exports.init = function() {
  gv.setAttr('cp0', parse(gv.ts.cp[0]));
  gv.setAttr('cp2', parse(gv.ts.cp[2]).map(Number));
  gv.setAttr('cp6', parse(gv.ts.cp[6]));
  logger.debug('$_ts.cp完成解析!')
}
