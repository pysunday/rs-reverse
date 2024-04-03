const gv = require('@src/handler/globalVarible');
const _sum = require('lodash/sum');

exports.execNumberByTime = function (times = 3) {
  // 指定时间内的代码循环次数，相比于浏览器瑞数环境删减代码较多, 因此浏览器环境与nodejs环境执行存在较大偏差，该方法不建议使用，预估返回值为600-1000
  if (typeof times !== 'number') return;
  const start = new Date();
  let i = 0;
  while(new Date() - start < times) i++;
  return i;
}

exports.execRandomByNumber = function (nums = 98, random) {
  // 指定次数的随机数取平均值后四舍五入
  if (typeof nums !== 'number') return;
  const arr = []
  for (let i = 0; i < nums; i++) arr.push(random || Math.random());
  const avg = _sum(arr) / nums;
  return [
    avg * 100,
    _sum(arr.map(it => Math.pow(it - avg, 2))) / nums * 100,
  ].map(it => Math.round(it));
}
