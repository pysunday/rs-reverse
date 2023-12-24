// 数组中提取数据
const gv = require('@src/handler/globalVarible');

function getLens(numarr, idx) {
  const item = numarr[idx];
  if ((item & gv.cp2[37]) === 0) return item;
  if ((item & gv.cp2[46]) == gv.cp2[37]) return (item & gv.cp2[13]) << gv.cp2[52] | numarr[idx + 1];
  if ((item & gv.cp2[36]) == gv.cp2[46]) return (item & gv.cp2[1]) << gv.cp2[2] | numarr[idx + 1] << gv.cp2[52] | numarr[idx + 2];
  if ((item & gv.cp2[7]) == gv.cp2[36]) return (item & gv.cp2[31]) << gv.cp2[4] | numarr[idx + 1] << gv.cp2[2] | numarr[idx + 2] << gv.cp2[52] | numarr[idx + 3];
  if ((item & gv.cp2[99]) == gv.cp2[7]) return (numarr[idx + 1] << gv.cp2[4] | numarr[idx + 2] << gv.cp2[2] | numarr[idx + 3] << gv.cp2[52] | numarr[idx + 4]) >>> 0;
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
