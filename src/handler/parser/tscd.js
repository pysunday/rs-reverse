// 生成密钥
const gv = require('../globalVarible');
const decrypt = require('./common/decrypt');
const logger = require('@utils/logger');
const numToNumarr4 = require('./common/numToNumarr4');
const dynamicExec = require('./common/dynamicExec');

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
  let idx = 0;
  const task = [57, 132, 132, 132, 132, 132, 132].reverse();
  do {
    // 逻辑概率来源为：idx初始值为4，此处为idx += gv.cp2[2], 如果之后task有变可尝试固定为该逻辑
    idx += gv.cp2[gv.r2mka("0>one>5-5").taskarr[task.pop()]];
    const mod = idx % (len - idx > gv.cp2[2] ? gv.cp2[2] : len - idx);
    arr[mod + idx] ^= valMap[mod];
  } while (idx < len && task.length);
  return arr;
}

function getTaskarr(arr, idx, ans = []) {
  if (idx >= arr.length) return;
  const start = idx + 1;
  const end = start + arr[idx];
  ans.push(arr.slice(start, end));
  getTaskarr(arr, end + 2, ans);
  return ans;
}


function getOffset(arr) {
  const [task0, task1, task2, task3] = getTaskarr(arr, arr[3]);
  console.log([task0, task1, task3]);
  const l81 = gv.r2mka("0-0").taskarr[42] + gv.cp2[56];
  const l83 = (gv.cp0_96(1, gv.r2mka("0-0").taskarr[57]).charCodeAt() + l81) * l81;
  const offset = dynamicExec('0>one>22-24', 0, undefined, {
    20: function(...params) {
      return dynamicExec(task0, 0, params, {
        8: function (...params) {
          return dynamicExec(task1, 0, params);
        }
      })
    },
    8: function(...params) {
      return dynamicExec(task1, 0, params);
    },
    10: function(...params) {
      return dynamicExec(task3, 0, params);
    },
    81: l81,
    83: l83,
  }, {
    59: gv.cp2,
  })
  return offset;
}

exports.init = function() {
  const cdArr = decrypt(gv.ts.cd);
  const start = gv.r2mka('0>one>23-25').taskarr[9] + 2;
  const end = (cdArr[0] << gv.cp2[52] | cdArr[1]) + start;
  const one = parse(cdArr.slice(start, end)); // arr127
  const offset = getOffset(one);
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
