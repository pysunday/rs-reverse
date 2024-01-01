// 生成密钥
const gv = require('../globalVarible');
const decrypt = require('./common/decrypt');
const logger = require('@utils/logger');

exports.init = function() {
  const cdArr = decrypt(gv.ts.cd);
  const start = gv.r2mka('0>one>23-25').taskarr[9] + 2;
  const end = (cdArr[0] << 8 | cdArr[1]) + 2;
  const one = cdArr.slice(start, end); // arr127
  const offset = [1, 153, 3, 3, 4, 2, 6, 4];
  const ans = cdArr.slice(end).map((item, idx) => { // arr1575
      return item ^ offset[idx % gv.cp2[52]];
  })
  const keys = []
  for (let i = 0, op = 1; i < ans[0]; i ++) {
    const gap = ans[op++] << 8 | ans[op++];
    keys.push(ans.slice(op, op + gap));
    op += gap;
  }
  gv.setAttr('keys', keys);
  logger.debug('$_ts.cd完成解析!')
};
