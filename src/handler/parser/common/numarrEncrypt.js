const gv = require('@src/handler/globalVarible');

function getTree() {
  let arr = [];
  for (let i = 1; i < 255; i++) {
    arr.push({
      total: 1,
      idx: i
    });
  }
  arr.push({
    total: 6,
    idx: 255
  }, {
    total: 45,
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
    const [one, two] = arr.slice(0, 2);
    arr = arr.slice(2);
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
    if (arr[idx].val >= 8) {
      return arr[idx].key >> arr[idx].val - 8;
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
    while (two >= 8) {
      ans.push(one >> two - 8);
      one &= ~(255 << two - 8);
      two -= 8;
    }
  }
  if (two > 0) {
    ans.push(one << 8 - two | encryptConfig[1] >> two);
  }
  return ans;
}
