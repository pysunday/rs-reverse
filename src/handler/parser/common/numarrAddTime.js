// 数字数组拼接日期后用随机数加密
const gv = require('@src/handler/globalVarible');
const numToNumarr4 = require('./numToNumarr4');

module.exports = function(numarr, time, random) {
  // time为时间戳除以1000后向上取整，如果不传则取当前时间戳
  const ele = Math.ceil((random || Math.random()) * 256);
  const now = time || Math.floor(new Date().getTime() / 1000);
  const arr = [...numarr, ...numToNumarr4(now)].map(it => it ^ ele);
  arr.push(ele);
  return [arr, now];
}

module.exports.reverse = function(numarr) {
  const numarr_new = numarr.slice(0);
  const ele = numarr_new.pop();
  const arr = numarr_new.map(it => it ^ ele);
  const data = arr.slice(0, arr.length - 4);
  const time = numToNumarr4.reverse(arr.slice(arr.length - 4));
  return [data, time];
}
