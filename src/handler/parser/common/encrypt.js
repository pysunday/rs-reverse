// 加密两个数组生成新数组
const combine4 = require('./combine4');
const gv = require('@src/handler/globalVarible');

module.exports = function (numarr1, numarr2) {
  const arr = new Array(numarr1.length - gv.cp2[52]);
  const comb1 = combine4(numarr1);
  const comb2 = combine4(numarr2);
  let first = comb1[0];
  let second = comb1[1];
  let current, next, temp;
  let cursor = 0;
  for (let idx = gv.cp2[56]; idx < comb1.length - 1; cursor += 8, idx += 2) {
    current = comb1[idx];
    next = comb1[idx + 1];
    temp = gv.cp2[132];
    for (let i = 0; i < gv.cp2[48]; ++i) {
      next = next - ((current << gv.cp2[19] ^ current >> gv.cp2[29] & gv.cp2[12]) + current ^ temp + comb2[temp >> gv.cp2[57] & gv.cp2[105] & gv.cp2[58]]) & gv.cp2[17];
      temp = temp - gv.cp2[66] & gv.cp2[17];
      current = current - ((next << gv.cp2[19] ^ next >> gv.cp2[29] & gv.cp2[12]) + next ^ temp + comb2[temp & gv.cp2[58]]) & gv.cp2[17];
    }
    first = current ^ first;
    second = next ^ second;
    arr[cursor] = first >> gv.cp2[4] & gv.cp2[34];
    arr[cursor + 1] = first >> gv.cp2[2] & gv.cp2[34];
    arr[cursor + 2] = first >> gv.cp2[52] & gv.cp2[34];
    arr[cursor + 3] = first & gv.cp2[34];
    arr[cursor + 4] = second >> gv.cp2[4] & gv.cp2[34];
    arr[cursor + 5] = second >> gv.cp2[2] & gv.cp2[34];
    arr[cursor + 6] = second >> gv.cp2[52] & gv.cp2[34];
    arr[cursor + 7] = second & gv.cp2[34];
    first = comb1[idx];
    second = comb1[idx + 1];
  }
  arr.splice(cursor - arr[cursor - 1], arr[cursor - 1]);
  return arr;
}
