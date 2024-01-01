// 将数字转换为4位数字数组
const gv = require('@src/handler/globalVarible');
const _chunk = require('lodash/chunk');
const _flatten = require('lodash/flatten');

module.exports = function (num) {
  if (Array.isArray(num)) {
    return _flatten(num.map(it => {
      return module.exports(it);
    }));
  }
  if (typeof num !== 'number') num = 0;
  return [
    num >> gv.cp2[4] & gv.cp2[34],
    num >> gv.cp2[2] & gv.cp2[34],
    num >> gv.cp2[52] & gv.cp2[34],
    num & gv.cp2[34]
  ];
}

module.exports.reverse = function (numarr) {
  // 无符号
  if (numarr.length > 4) {
    if (numarr.length % 4 !== 0) throw new Error('使用numToNumarr4.reverse方法时传入的数字数组必须是4的倍数');
    return _chunk(numarr, 4).map(it => module.exports.reverse(it));
  }
  return (numarr[0] << gv.cp2[4] | numarr[1] << gv.cp2[2] | numarr[2] << gv.cp2[52] | numarr[3]) >>> 0;
}

module.exports.reverse_sign = function (numarr) {
  // 有符号
  if (numarr.length > 4) {
    if (numarr.length % 4 !== 0) throw new Error('使用numToNumarr4.reverse方法时传入的数字数组必须是4的倍数');
    return _chunk(numarr, 4).map(it => module.exports.reverse_sign(it));
  }
  return (numarr[0] << gv.cp2[4] | numarr[1] << gv.cp2[2] | numarr[2] << gv.cp2[52] | numarr[3]);
}
