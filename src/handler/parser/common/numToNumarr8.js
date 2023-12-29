// 将数字转换为8位数字数组
const gv = require('@src/handler/globalVarible');

module.exports = function (num) {
  if (typeof num !== 'number' || num < 0) num = 0;
  const one = num / gv.cp2[16];
  const two = num % gv.cp2[16];
  return [
    one >> gv.cp2[4] & gv.cp2[34],
    one >> gv.cp2[2] & gv.cp2[34],
    one >> gv.cp2[52] & gv.cp2[34],
    one & gv.cp2[34],
    two >> gv.cp2[4] & gv.cp2[34],
    two >> gv.cp2[2] & gv.cp2[34],
    two >> gv.cp2[52] & gv.cp2[34],
    two & gv.cp2[34],
  ]
}
