const arraySwap = require('./arraySwap');

function grenKeys(maxlen) {
  const keys = "_$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
  const ans = [];
  for (let i = 0; i < keys.length; i ++) {
    for (let j = 0; j < keys.length; j ++) {
      ans.push('_$' + keys[i] + keys[j]);
      if (ans.length === maxlen) return ans;
    }
  }
  return ans;
}

module.exports = function (num, flag) {
  const keynames = grenKeys(num);
  return arraySwap(keynames, flag)
}
