const gv = require('@src/handler/globalVarible');

exports.init = function() {
  const arr = [];
  for (let i = 0; i < gv.cp2[30]; i++) {
    let item = i;
    for (_$iv = 0; _$iv < gv.cp2[52]; _$iv++) {
      item = item & 1 ? gv.cp2[167] ^ item >>> 1 : item >>> 1;
    }
    arr[i] = item;
  }
  gv.setAttr('bignum', arr);
}
