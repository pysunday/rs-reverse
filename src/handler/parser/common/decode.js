const ascii2string = require('./ascii2string');
const gv = require('@src/handler/globalVarible');

function trans(numarr) {
  const ans = [];
  const mark = '?'.charCodeAt();
  for (var idx = 0; idx < numarr.length; idx++) {
    const num = numarr[idx];
    let val;
    if (num < 128) {
      val = num;
    } else if (num < 192) {
      val = mark;
    } else if (num < 224) {
      val = (num & 63) << 6 | numarr[idx + 1] & 63;
      idx++;
    } else if (num < 240) {
      val = (num & 15) << 12 | (numarr[idx + 1] & 63) << 6 | numarr[idx + 2] & 63;
      idx += 2;
    } else if (num < 248) {
      val = (num & 7) << 18 | (numarr[idx + 1] & 63) << 12 | (numarr[idx + 2] & 63) << 6 | numarr[idx + 3] & 63;
      idx += 3;
    } else if (num < 252) {
      val = mark;
      idx += 4;
    } else if (num < 254) {
      val = mark;
      idx += 5;
    } else {
      val = mark;
    }
    if (val > 65535) {
      val -= 65536;
      ans.push((val >> 10) + 55296, val % 1024 + 56320);
    } else {
      ans.push(val);
    }
  }
  return ans;
}

module.exports = function(numarr) {
  return ascii2string(trans(numarr));
}
