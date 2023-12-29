// 用于将ascii码数组转字符后拼接
const gv = require('@src/handler/globalVarible');

module.exports = function (numarr, start = 0, end = numarr.length) {
  const arr = new Array(Math.ceil(numarr.length / gv.cp2[120]));
  let idx = 0;
  while (start < end - gv.cp2[120]) {
    arr[idx++] = String.fromCharCode(...numarr.slice(start, start += gv.cp2[120]));
  }
  if (start < end) {
    arr[idx++] = String.fromCharCode(...numarr.slice(start, end));
  }
  return arr.join('')
}
