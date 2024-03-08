// meta标签的content值解析
const gv = require('../globalVarible');
const logger = require('@utils/logger');
const { extrace, bitwiseTwoNumarr, decrypt, decode } = require('./common/index');

exports.init = function() {
  const content = gv._getAttr('_ts')?.metaContent;
  if (!content) return;
  const arr = extrace(bitwiseTwoNumarr(decrypt(content), gv.keys[17])).filter(it => it.length);
  if (!arr.length) {
    logger.debug(`meta标签content值：${content} 解析失败!`)
    return;
  }
  gv._setAttr('metaContent', {
    content,
    value: decode(arr.pop()),
  });
}
