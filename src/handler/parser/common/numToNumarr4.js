// 将数字转换为4位数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (num) {
  if (typeof num !== 'number') num = 0;
  return [
    num >> gv.cp2[4] & gv.cp2[34],
    num >> gv.cp2[2] & gv.cp2[34],
    num >> gv.cp2[52] & gv.cp2[34],
    num & gv.cp2[34]
  ];
}

module.exports.reverse = function (numarr) {
  return (numarr[0] << gv.cp2[4] | numarr[1] << gv.cp2[2] | numarr[2] << gv.cp2[52] | numarr[3]) >>> 0;
}
