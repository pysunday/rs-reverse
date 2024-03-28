// 数组中提取数据
const gv = require('@src/handler/globalVarible');

function getLens(numarr, idx) {
  const item = numarr[idx];
  if ((item & 128) === 0) return item;
  if ((item & 192) == 128) return (item & 63) << 8 | numarr[idx + 1];
  if ((item & 224) == 192) return (item & 31) << 16 | numarr[idx + 1] << 8 | numarr[idx + 2];
  if ((item & 240) == 224) return (item & 15) << 24 | numarr[idx + 1] << 16 | numarr[idx + 2] << 8 | numarr[idx + 3];
  if ((item & 248) == 240) return (numarr[idx + 1] << 24 | numarr[idx + 2] << 16 | numarr[idx + 3] << 8 | numarr[idx + 4]) >>> 0;
  return item;
}

module.exports = function (numarr) {
  const arr = [];
  for(let i = 1; i < numarr.length; i++) {
    const len = getLens(numarr, i);
    if (len === 0) {
      arr.push([]);
    } else {
      arr.push(numarr.slice(i + 1, i + 1 + len));
      i += len;
    }
  }
  return arr;
}
