// 将数字数组加密成字符串，即最终的cookie
const gv = require('@src/handler/globalVarible');
const string2ascii = require('./string2ascii');

module.exports = function(numarr, keys) {
  if (typeof numarr === 'string') {
    numarr = string2ascii(numarr);
  }
  keys = keys || gv.cp0_96(7, 41).split('');
  let idx = 0;
  const ans = [];
  while (idx < numarr.length - gv.cp2[56]) {
    const [one, two, three] = [numarr[idx], numarr[idx + 1], numarr[idx + 2]];
    idx += 3;
    ans.push(
      keys[one >> gv.cp2[56]],
      keys[(one & gv.cp2[58]) << gv.cp2[19] | two >> gv.cp2[19]],
      keys[(two & gv.cp2[31]) << gv.cp2[56] | three >> gv.cp2[55]],
      keys[three & gv.cp2[13]],
    );
  }
  if (idx < numarr.length) {
    ans.push(
      keys[numarr[idx] >> gv.cp2[56]],
      keys[(numarr[idx + 1] & gv.cp2[58]) << gv.cp2[19] | numarr[idx + 1] >> gv.cp2[19]],
    )
    if (numarr[idx + 1] !== undefined) {
      ans.push(keys[(numarr[idx + 1] & gv.cp2[31]) << gv.cp2[56]])
    }
  }
  return ans.join('');
}
