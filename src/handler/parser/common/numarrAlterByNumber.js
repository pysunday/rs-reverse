// 根据uid修改数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (numarr, start, num = 0) {
  if (typeof num !== 'number') num = 0;
  numarr[start] = num >> 24 & 255;
  numarr[start + 1] = num >> 16 & 255;
  numarr[start + 2] = num >> 8 & 255;
  numarr[start + 3] = num & 255;
}
