const gv = require('@src/handler/globalVarible');
const numarrAddTime = require('./numarrAddTime');
const combine4 = require('./combine4');
const numToNumarr4 = require('./numToNumarr4');
const _zip = require('lodash/zip');
const decrypt = require('./decrypt');

function encode(cfg, val, idx, cfgnum) {
  const list = cfg[idx];
  const arr = [0, 0, 0, 0];
  let one = val[0] ^ list[0]
    , two = val[idx ? 3 : 1] ^ list[1]
    , three = val[2] ^ list[2]
    , four = val[idx ? 1 : 3] ^ list[3]
    , cursor = 4;
  for (let i = 0; i < list.length / 4 - 2; i++) {
    const none = cfgnum[0][one >>> 24] ^ cfgnum[1][two >> 16 & 255] ^ cfgnum[2][three >> 8 & 255] ^ cfgnum[3][four & 255] ^ list[cursor];
    const ntwo = cfgnum[0][two >>> 24] ^ cfgnum[1][three >> 16 & 255] ^ cfgnum[2][four >> 8 & 255] ^ cfgnum[3][one & 255] ^ list[cursor + 1];
    const nthree = cfgnum[0][three >>> 24] ^ cfgnum[1][four >> 16 & 255] ^ cfgnum[2][one >> 8 & 255] ^ cfgnum[3][two & 255] ^ list[cursor + 2];
    four = cfgnum[0][four >>> 24] ^ cfgnum[1][one >> 16 & 255] ^ cfgnum[2][two >> 8 & 255] ^ cfgnum[3][three & 255] ^ list[cursor + 3];
    cursor += 4;
    [one, two, three] = [none, ntwo, nthree]
  }
  for (let i = 0; i < 4; i++) {
    arr[idx ? 3 & -i : i] = cfgnum[4][one >>> 24] << 24 ^ cfgnum[4][two >> 16 & 255] << 16 ^ cfgnum[4][three >> 8 & 255] << 8 ^ cfgnum[4][four & 255] ^ list[cursor++];
    [one, two, three, four] = [two, three, four, one];
  }
  return arr;
}

function getCfg(numarr) {
  const ret = combine4(numarr.length % 16 !== 0 ? numarrAddTime.reverse(numarr)[0] : numarr);
  const cfgnum_0_4 = gv.cfgnum[0][4];
  const len = ret.length;
  const arr = [];
  let i, j, temp;
  for (i = len, j = 1; i < 4 * len + 28; i++) {
    temp = ret[i - 1];
    if (i % len === 0 || len === 8 && i % len === 4) {
      temp = cfgnum_0_4[temp >>> 24] << 24 ^ cfgnum_0_4[temp >> 16 & 255] << 16 ^ cfgnum_0_4[temp >> 8 & 255] << 8 ^ cfgnum_0_4[temp & 255];
      if (i % len === 0) {
        temp = temp << 8 ^ temp >>> 24 ^ j << 24;
        j = j << 1 ^ (j >> 7) * 283;
      }
    }
    ret[i] = ret[i - len] ^ temp;
  }
  for (j = 0; i; j++, i--) {
    temp = ret[j & 3 ? i : i - 4];
    if (i <= 4 || j < 4) {
      arr[j] = temp;
    } else {
      arr[j] = gv.cfgnum[1][0][cfgnum_0_4[temp >>> 24]] ^ gv.cfgnum[1][1][cfgnum_0_4[temp >> 16 & 255]] ^ gv.cfgnum[1][2][cfgnum_0_4[temp >> 8 & 255]] ^ gv.cfgnum[1][3][cfgnum_0_4[temp & 255]];
    }
  }
  return [ret, arr];
}

function encryptMode1(valarr, keyarr, flag = 1, random) {
  const cfg = getCfg(keyarr);
  var _$iv, _$j7, _$kb, _$ka, _$dV, _$du, _$jb;
  const max = Math.floor(valarr.length / 16) + 1;
  let ans = [], arr;
  const fill = 16 - valarr.length % 16;
  if (flag) {
    ans = arr = new Array(4).fill(4294967295).map(it => Math.floor((random || Math.random()) * it));
  }
  const copyarr = numToNumarr4.reverse_sign([...valarr, ...new Array(fill).fill(fill)]);
  for (let i = 0; i < max; ) {
    let current = copyarr.slice(i << 2, ++i << 2);
    if (arr) {
      current = [0, 1, 2, 3].map(it => current[it] ^ arr[it]);
    }
    arr = encode(cfg, current, 0, gv.cfgnum[0]);
    for (let j = 0; j < arr.length; j++) {
      ans.push(arr[j]);
    }
  }
  return numToNumarr4(ans);
}

function encryptMode2(valarr, keyarr, flag = 1) {
  const cfg = getCfg(keyarr);
  const arr = [];
  let arrcom = combine4(valarr);
  let arrsub = [];
  if (flag) {
    arrsub = arrcom.slice(0, 4);
    arrcom = arrcom.slice(4);
  }
  for (let i = 0; i < arrcom.length / 4; ) {
    const next = arrcom.slice(i << 2, ++i << 2);
    let val = encode(cfg, next, 1, gv.cfgnum[1]);
    if (arrsub.length) {
      val = _zip(val, arrsub).map(([a, b]) => a ^ b);
    }
    for (let j = 0; j < val.length; j++) {
      arr.push(val[j]);
    }
    arrsub = next;
  }
  const ret = arr.reduce((ans, it) => ([...ans, ...numToNumarr4(it)]), []);
  return ret.slice(0, ret.length - ret[ret.length - 1]);
}

module.exports = {
  encryptMode1,
  encryptMode2,
}

