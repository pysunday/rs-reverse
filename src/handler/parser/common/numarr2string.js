// 将数字数组加密成字符串，即最终的cookie
const gv = require('@src/handler/globalVarible');
const string2ascii = require('./string2ascii');

module.exports = function(numarr, keys) {
  if (typeof numarr === 'string') {
    numarr = string2ascii(numarr);
  }
  keys = keys || gv.basestr.split('');
  let idx = 0;
  const ans = [];
  while (idx < numarr.length - 2) {
    const [one, two, three] = [numarr[idx], numarr[idx + 1], numarr[idx + 2]];
    idx += 3;
    ans.push(
      keys[one >> 2],
      keys[(one & 3) << 4 | two >> 4],
      keys[(two & 15) << 2 | three >> 6],
      keys[three & 63],
    );
  }
  if (idx < numarr.length) {
    ans.push(
      keys[numarr[idx] >> 2],
      keys[(numarr[idx + 1] & 3) << 4 | numarr[idx + 1] >> 4],
    )
    if (numarr[idx + 1] !== undefined) {
      ans.push(keys[(numarr[idx + 1] & 15) << 2])
    }
  }
  return ans.join('');
}
