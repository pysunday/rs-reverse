// 生成密钥
const gv = require('../globalVarible');
const decrypt = require('./common/decrypt');
const logger = require('@utils/logger');
const numToNumarr4 = require('./common/numToNumarr4');
const runTask = require('./common/runTask');
const custask = require('./task');
const error = require('@utils/error');

function getValMaps() {
  let uid = gv.ts.cp[3];
  const ans = [];
  for (let i = 0; i < 4; i++) {
    uid = 15679 * (uid & 65535) + 2531011;
    ans.push(uid);
  }
  return numToNumarr4(ans);
}

function parse(arr) {
  const len = arr.length;
  const valMap = getValMaps();
  let idx = 4;
  do {
    idx += 16;
    const mod = idx % (len - idx > 16 ? 16 : len - idx);
    if (mod + idx < arr.length) {
      arr[mod + idx] ^= valMap[mod];
    }
  } while (idx < len);
  return arr;
}

function getTaskarr(arr, idx, ans = {}) {
  if (idx >= arr.length) return;
  const start = idx + 1;
  const end = start + arr[idx];
  const key = arr[idx - 2];
  ans[key] = gv.r2mka().child_one[key].taskarr = arr.slice(start, end);
  getTaskarr(arr, end + 2, ans);
  return ans;
}

exports.init = function() {
  const cdArr = decrypt(gv.ts.cd);
  const start = gv.r2mka('0>one>23-25').taskarr[9] + 2;
  const end = (cdArr[0] << 8 | cdArr[1]) + start;
  const one = parse(cdArr.slice(start, end));
  const offset = runTask('0>one>22-24', [], getTaskarr(one, one[3])); // 获取解密用偏移值数组
  gv._setAttr('dynamicTaskOffset', offset);
  gv._setAttr('dynamicTask', getTaskarr(one, one[3]));
  const ans = cdArr.slice(end).map((item, idx) => {
    return item ^ offset[idx % 8];
  })
  const keys = []
  for (let i = 0, op = 1; i < ans[0]; i ++) {
    const gap = ans[op++] << 8 | ans[op++];
    keys.push(ans.slice(op, op + gap));
    op += gap;
  }
  gv._setAttr('keys', keys);
  logger.debug('$_ts.cd完成解析!')
};
