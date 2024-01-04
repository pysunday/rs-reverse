const gv = require('@src/handler/globalVarible');

function makeCfgnum() {
  const arr1 = [[], [], [], [], []];
  const arr2 = [[], [], [], [], []];
  const arr1_4 = arr1[4];
  const arr2_4 = arr2[4];
  const one = [];
  const two = [];
  let i, j, temp;
  for (i = 0; i < gv.cp2[30]; i++) {
    two[(one[i] = i << 1 ^ (i >> gv.cp2[23]) * gv.cp2[93]) ^ i] = i;
  }
  for (i = j = 0; !arr1_4[i]; i ^= one[i] || 1, j = two[j] || 1) {
    temp = j ^ j << 1 ^ j << gv.cp2[56] ^ j << gv.cp2[58] ^ j << gv.cp2[19];
    temp = temp >> gv.cp2[52] ^ temp & gv.cp2[34] ^ gv.cp2[143];
    arr1_4[i] = temp;
    arr2_4[temp] = i;
  }
  for (i = 0; i < gv.cp2[30]; i++) {
    arr2_4[arr1_4[i]] = i;
  }
  for (i = 0; i < gv.cp2[30]; i++) {
    let ele1 = one[one[one[i]]] * gv.cp2[158] ^ one[one[i]] * gv.cp2[177] ^ one[i] * gv.cp2[111] ^ i * gv.cp2[64];
    let ele2 = one[arr1_4[i]] * gv.cp2[111] ^ arr1_4[i] * gv.cp2[64];
    for (j = 0; j < gv.cp2[19]; j++) {
      arr1[j][i] = ele2 = ele2 << gv.cp2[4] ^ ele2 >>> gv.cp2[52];
      arr2[j][arr1_4[i]] = ele1 = ele1 << gv.cp2[4] ^ ele1 >>> gv.cp2[52];
    }
  }
  for (i = 0; i < gv.cp2[29]; i++) {
    arr1[i] = arr1[i].slice(0);
    arr2[i] = arr2[i].slice(0);
  }
  return [arr1, arr2]
}

function makeBignum() {
  const arr = [];
  for (let i = 0; i < gv.cp2[30]; i++) {
    let item = i;
    for (_$iv = 0; _$iv < gv.cp2[52]; _$iv++) {
      item = item & 1 ? gv.cp2[167] ^ item >>> 1 : item >>> 1;
    }
    arr[i] = item;
  }
  return arr;
}

exports.init = function() {
  gv._setAttr('bignum', makeBignum());
  gv._setAttr('cfgnum', makeCfgnum());
}
