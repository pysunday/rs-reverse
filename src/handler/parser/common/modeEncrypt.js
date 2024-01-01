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
    , two = val[idx ? gv.cp2[58] : 1] ^ list[1]
    , three = val[2] ^ list[2]
    , four = val[idx ? 1 : gv.cp2[58]] ^ list[3]
    , cursor = gv.cp2[19];
  for (let i = 0; i < list.length / gv.cp2[19] - gv.cp2[56]; i++) {
    const none = cfgnum[0][one >>> gv.cp2[4]] ^ cfgnum[1][two >> gv.cp2[2] & gv.cp2[34]] ^ cfgnum[2][three >> gv.cp2[52] & gv.cp2[34]] ^ cfgnum[3][four & gv.cp2[34]] ^ list[cursor];
    const ntwo = cfgnum[0][two >>> gv.cp2[4]] ^ cfgnum[1][three >> gv.cp2[2] & gv.cp2[34]] ^ cfgnum[2][four >> gv.cp2[52] & gv.cp2[34]] ^ cfgnum[3][one & gv.cp2[34]] ^ list[cursor + 1];
    const nthree = cfgnum[0][three >>> gv.cp2[4]] ^ cfgnum[1][four >> gv.cp2[2] & gv.cp2[34]] ^ cfgnum[2][one >> gv.cp2[52] & gv.cp2[34]] ^ cfgnum[3][two & gv.cp2[34]] ^ list[cursor + gv.cp2[56]];
    four = cfgnum[0][four >>> gv.cp2[4]] ^ cfgnum[1][one >> gv.cp2[2] & gv.cp2[34]] ^ cfgnum[2][two >> gv.cp2[52] & gv.cp2[34]] ^ cfgnum[3][three & gv.cp2[34]] ^ list[cursor + gv.cp2[58]];
    cursor += gv.cp2[19];
    [one, two, three] = [none, ntwo, nthree]
  }
  for (let i = 0; i < gv.cp2[19]; i++) {
    arr[idx ? gv.cp2[58] & -i : i] = cfgnum[4][one >>> gv.cp2[4]] << gv.cp2[4] ^ cfgnum[4][two >> gv.cp2[2] & gv.cp2[34]] << gv.cp2[2] ^ cfgnum[4][three >> gv.cp2[52] & gv.cp2[34]] << gv.cp2[52] ^ cfgnum[4][four & gv.cp2[34]] ^ list[cursor++];
    [one, two, three, four] = [two, three, four, one];
  }
  return arr;
}

function getCfg(numarr) {
  const ret = combine4(numarr.length % gv.cp2[2] !== 0 ? numarrAddTime.reverse(numarr)[0] : numarr);
  const cfgnum_0_4 = gv.cfgnum[0][4];
  const len = ret.length;
  const arr = [];
  let i, j, temp;
  for (i = len, j = 1; i < gv.cp2[19] * len + gv.cp2[68]; i++) {
    temp = ret[i - 1];
    if (i % len === 0 || len === gv.cp2[52] && i % len === gv.cp2[19]) {
      temp = cfgnum_0_4[temp >>> gv.cp2[4]] << gv.cp2[4] ^ cfgnum_0_4[temp >> gv.cp2[2] & gv.cp2[34]] << gv.cp2[2] ^ cfgnum_0_4[temp >> gv.cp2[52] & gv.cp2[34]] << gv.cp2[52] ^ cfgnum_0_4[temp & gv.cp2[34]];
      if (i % len === 0) {
        temp = temp << gv.cp2[52] ^ temp >>> gv.cp2[4] ^ j << gv.cp2[4];
        j = j << 1 ^ (j >> gv.cp2[23]) * gv.cp2[93];
      }
    }
    ret[i] = ret[i - len] ^ temp;
  }
  for (j = 0; i; j++, i--) {
    temp = ret[j & gv.cp2[58] ? i : i - gv.cp2[19]];
    if (i <= gv.cp2[19] || j < gv.cp2[19]) {
      arr[j] = temp;
    } else {
      arr[j] = gv.cfgnum[1][0][cfgnum_0_4[temp >>> gv.cp2[4]]] ^ gv.cfgnum[1][1][cfgnum_0_4[temp >> gv.cp2[2] & gv.cp2[34]]] ^ gv.cfgnum[1][2][cfgnum_0_4[temp >> gv.cp2[52] & gv.cp2[34]]] ^ gv.cfgnum[1][3][cfgnum_0_4[temp & gv.cp2[34]]];
    }
  }
  return [ret, arr];
}

function encryptMode1(valarr, keyarr, flag = 1) {
  const cfg = getCfg(keyarr);
  var _$iv, _$j7, _$kb, _$ka, _$dV, _$du, _$jb;
  const max = Math.floor(valarr.length / gv.cp2[2]) + 1;
  let ans = [], arr;
  const fill = gv.cp2[2] - valarr.length % gv.cp2[2];
  if (flag) {
    ans = arr = new Array(4).fill(gv.cp2[17]).map(it => Math.floor(Math.random() * it));
  }
  const copyarr = numToNumarr4.reverse_sign([...valarr, ...new Array(fill).fill(fill)]);
  for (let i = 0; i < max; ) {
    let current = copyarr.slice(i << gv.cp2[56], ++i << gv.cp2[56]);
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
    arrsub = arrcom.slice(0, gv.cp2[19]);
    arrcom = arrcom.slice(gv.cp2[19]);
  }
  for (let i = 0; i < arrcom.length / gv.cp2[19]; ) {
    const next = arrcom.slice(i << gv.cp2[56], ++i << gv.cp2[56]);
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

