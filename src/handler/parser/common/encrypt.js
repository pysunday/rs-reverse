const gv = require('@src/handler/globalVarible');

function getTree() {
  let arr = [];
  for (let i = 1; i < gv.cp2[34]; i++) {
    arr.push({
      total: 1,
      idx: i
    });
  }
  arr.push({
    total: gv.cp2[55],
    idx: gv.cp2[34]
  }, {
    total: gv.cp2[49],
    idx: 0
  }
  );
  function parse(item) {
    for (let i = 0; i < arr.length; i++) {
      if (item.total <= arr[i].total) {
        arr.splice(i, 0, item);
        return;
      }
    }
    arr.push(item);
  }
  while (arr.length > 1) {
    const [one, two] = arr.slice(0, gv.cp2[56]);
    arr = arr.slice(gv.cp2[56]);
    parse({
      total: one.total + two.total,
      first: one,
      second: two
    });
  }
  return arr[0];
}

function getKey(arr) {
  for (let idx in arr) {
    if (arr[idx].val >= gv.cp2[52]) {
      return arr[idx].key >> arr[idx].val - gv.cp2[52];
    }
  }
}

function getEncryptConfig(tree, config = {key: 0, val: 0}, arr = []) {
  // 返回用于加密的配置数组
  if (tree.idx === undefined) {
    getEncryptConfig(tree.first, {
      key: config.key << 1,
      val: config.val + 1
    }, arr);
    getEncryptConfig(tree.second, {
      key: (config.key << 1) + 1,
      val: config.val + 1
    }, arr)
  } else {
    arr[tree.idx] = config;
  }
  return [arr, getKey(arr)];
}

let encryptConfig = undefined;

module.exports = function (numarr) {
  // 对数字数组加密并返回加密后数组
  if (!encryptConfig) encryptConfig = getEncryptConfig(getTree());
  const ans = [];
  const len = numarr.length;
  let one = 0, two = 0;
  for (let i = 0; i < len; i++) {
    const cfg = encryptConfig[0][numarr[i]];
    one = one << cfg.val | cfg.key;
    two += cfg.val;
    while (two >= gv.cp2[52]) {
      ans.push(one >> two - gv.cp2[52]);
      one &= ~(gv.cp2[34] << two - gv.cp2[52]);
      two -= gv.cp2[52];
    }
  }
  if (two > 0) {
    ans.push(one << gv.cp2[52] - two | encryptConfig[1] >> two);
  }
  return ans;
}
