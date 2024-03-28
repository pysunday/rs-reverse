const gv = require('@src/handler/globalVarible');

function makeCfgnum() {
  const arr1 = [[], [], [], [], []];
  const arr2 = [[], [], [], [], []];
  const arr1_4 = arr1[4];
  const arr2_4 = arr2[4];
  const one = [];
  const two = [];
  let i, j, temp;
  for (i = 0; i < 256; i++) {
    two[(one[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
  }
  for (i = j = 0; !arr1_4[i]; i ^= one[i] || 1, j = two[j] || 1) {
    temp = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4;
    temp = temp >> 8 ^ temp & 255 ^ 99;
    arr1_4[i] = temp;
    arr2_4[temp] = i;
  }
  for (i = 0; i < 256; i++) {
    arr2_4[arr1_4[i]] = i;
  }
  for (i = 0; i < 256; i++) {
    let ele1 = one[one[one[i]]] * 16843009 ^ one[one[i]] * 65537 ^ one[i] * 257 ^ i * 16843008;
    let ele2 = one[arr1_4[i]] * 257 ^ arr1_4[i] * 16843008;
    for (j = 0; j < 4; j++) {
      arr1[j][i] = ele2 = ele2 << 24 ^ ele2 >>> 8;
      arr2[j][arr1_4[i]] = ele1 = ele1 << 24 ^ ele1 >>> 8;
    }
  }
  for (i = 0; i < 5; i++) {
    arr1[i] = arr1[i].slice(0);
    arr2[i] = arr2[i].slice(0);
  }
  return [arr1, arr2]
}

function makeBignum() {
  const arr = [];
  for (let i = 0; i < 256; i++) {
    let item = i;
    for (_$iv = 0; _$iv < 8; _$iv++) {
      item = item & 1 ? 3988292384 ^ item >>> 1 : item >>> 1;
    }
    arr[i] = item;
  }
  return arr;
}

function makeDecryptKeys() {
  return gv.basestr.split('').reduce((ans, key, idx) => {
    const code = key.charCodeAt()
    ans[0][code] = idx << 2;
    ans[1][code] = idx >> 4;
    ans[2][code] = (idx & 15) << 4;
    ans[3][code] = idx >> 2;
    ans[4][code] = (idx & 3) << 6;
    ans[5][code] = idx;
    return ans
  }, [{}, {}, {}, {}, {}, { ...new Array(255 + 1).fill(-1) }]);
}

exports.init = function() {
  gv._setAttr('bignum', makeBignum());
  gv._setAttr('cfgnum', makeCfgnum());
  gv._setAttr('decryptKeys', makeDecryptKeys());
}
