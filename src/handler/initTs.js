const immutext = require('@src/immutext/');
const grenKeys = require('./grenKeys');

function grenJf () {
  const flags = [1, 0, 0];
  // 格式化检测通过执行
  const flag = --flags[1];
  // 反码检测通过执行
  return !flag;
}

module.exports = function(defdata) {
  const cp = [];
  cp[0] = immutext.$_ts.cp0;
  cp[1] = grenKeys(806, defdata.nsd);
  cp[2] = immutext.$_ts.cp2;
  cp[6] = '';
  return {
    nsd: 0,
    cd: '',
    jf: grenJf(),
    cp,
    aebi: [],
    scj: [],
    ...defdata,
  }
}
