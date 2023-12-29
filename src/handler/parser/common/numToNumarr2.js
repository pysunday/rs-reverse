// 将数字转换为2位数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (num) {
  if (typeof num !== 'number' || num < 0) {
    num = 0;
  } else if (num > gv.cp2[25]) {
    num = gv.cp2[25];
  }
  return [
    num >> gv.cp2[52],
    num & gv.cp2[34]
  ]
}
