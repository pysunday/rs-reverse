// 将数字转换为2位数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (num) {
  if (typeof num !== 'number' || num < 0) {
    num = 0;
  } else if (num > 65535) {
    num = 65535;
  }
  return [
    num >> 8,
    num & 255
  ]
}
