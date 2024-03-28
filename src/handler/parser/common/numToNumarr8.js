// 将数字转换为8位数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (num) {
  if (typeof num !== 'number' || num < 0) num = 0;
  const one = num / 4294967296;
  const two = num % 4294967296;
  return [
    one >> 24 & 255,
    one >> 16 & 255,
    one >> 8 & 255,
    one & 255,
    two >> 24 & 255,
    two >> 16 & 255,
    two >> 8 & 255,
    two & 255,
  ]
}
