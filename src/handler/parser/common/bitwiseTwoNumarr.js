// 将两个数组经过位运算后生成新的数组
const combine4 = require('./combine4');
const gv = require('@src/handler/globalVarible');

module.exports = function (numarr1, numarr2) {
  const arr = new Array(numarr1.length - 8);
  const comb1 = combine4(numarr1);
  const comb2 = combine4(numarr2);
  let first = comb1[0];
  let second = comb1[1];
  let current, next, temp;
  let cursor = 0;
  for (let idx = 2; idx < comb1.length - 1; cursor += 8, idx += 2) {
    current = comb1[idx];
    next = comb1[idx + 1];
    temp = 3337565984;
    for (let i = 0; i < 32; ++i) {
      next = next - ((current << 4 ^ current >> 5 & 134217727) + current ^ temp + comb2[temp >> 11 & 2097151 & 3]) & 4294967295;
      temp = temp - 2654435769 & 4294967295;
      current = current - ((next << 4 ^ next >> 5 & 134217727) + next ^ temp + comb2[temp & 3]) & 4294967295;
    }
    first = current ^ first;
    second = next ^ second;
    arr[cursor] = first >> 24 & 255;
    arr[cursor + 1] = first >> 16 & 255;
    arr[cursor + 2] = first >> 8 & 255;
    arr[cursor + 3] = first & 255;
    arr[cursor + 4] = second >> 24 & 255;
    arr[cursor + 5] = second >> 16 & 255;
    arr[cursor + 6] = second >> 8 & 255;
    arr[cursor + 7] = second & 255;
    first = comb1[idx];
    second = comb1[idx + 1];
  }
  arr.splice(cursor - arr[cursor - 1], arr[cursor - 1]);
  return arr;
}
