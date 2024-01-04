// 生成密钥
const gv = require('../globalVarible');
const decrypt = require('./common/decrypt');
const logger = require('@utils/logger');
const numToNumarr4 = require('./common/numToNumarr4');
const dynamicExec = require('./common/dynamicExec');
const custask = require('./task');
const error = require('@utils/error');

function getValMaps() {
  let uid = gv.ts.cp[3];
  const ans = [];
  for (let i = 0; i < gv.cp2[19]; i++) {
    uid = gv.cp2[174] * (uid & gv.cp2[25]) + gv.cp2[135]
    ans.push(uid)
  }
  return numToNumarr4(ans);
}

function parse(arr) {
  const len = arr.length;
  const valMap = getValMaps();
  let idx = 4;
  do {
    idx += gv.cp2[2];
    const mod = idx % (len - idx > gv.cp2[2] ? gv.cp2[2] : len - idx);
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

function getOffset(arr) {
  const taskMap = getTaskarr(arr, arr[3]);
  const l81 = gv.r2mka("0-0").taskarr[42] + gv.cp2[56];
  const l82 = gv.cp0_96(1, gv.r2mka("0-0").taskarr[57]).charCodeAt() + l81;
  const l83 = l82 * l81;
  const global_res = {
    59: gv.cp2,
  };
  const loop_res = gv.r2mka().child_one.map((it, idx) => {
    if (!it) return it;
    return (...params) => {
      if (taskMap[idx]) {
        return dynamicExec(it, 0, params, loop_res, global_res);
      }
      if (custask[it.key]) {
        return custask[it.key](...params);
      }
      error(1000, { key: it.key }); // 任务方法未适配终止方法运行
    }
  })
  loop_res[81] = l81;
  loop_res[82] = l82;
  loop_res[83] = l83;
  return dynamicExec(gv.r2mka('0>one>22-24'), 0, undefined, loop_res, global_res);
}

exports.init = function() {
  const cdArr = decrypt(gv.ts.cd);
  const start = gv.r2mka('0>one>23-25').taskarr[9] + 2;
  const end = (cdArr[0] << gv.cp2[52] | cdArr[1]) + start;
  const one = parse(cdArr.slice(start, end)); // arr127
  const offset = getOffset(one);
  gv._setAttr('dynamicTaskOffset', offset);
  gv._setAttr('dynamicTask', getTaskarr(one, one[3]));
  const ans = cdArr.slice(end).map((item, idx) => { // arr1575
    return item ^ offset[idx % gv.cp2[52]];
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
