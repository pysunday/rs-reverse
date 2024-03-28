// 直接通过动态代码执行来运行任务
// 该方法并未完全还原，谨慎使用
const gv = require('@src/handler/globalVarible');
const dynamicExec = require('./dynamicExec');
const custask = require('../task');
const error = require('@utils/error');
const logger = require('@utils/logger');

module.exports = function(taskid, args, allowTask) {
  // taskid为任务id，allowTask为允许执行的任务
  const task = gv.r2mka(taskid);
  if (!task) {
    error(`任务未找到`, { taskid });
  }
  const global_res = new Proxy({}, {
    get(target, property, receiver) {
      // 由于每个版本下标都会变，在解析cd值生成8位偏移数的时候只用到了cp2数组，因此这里只返回cp2，需要注意！
      logger.debug(`global_res 获取下标： ${property}`);
      return gv.cp2;
    }
  })
  const loop_res = new Proxy([], {
    get(target, key, receiver) {
      const child = gv.r2mka().child_one;
      if (Number(key) < child.length) {
        const current = child[key];
        if (!key) return current;
        return (...params) => {
          if (custask[current.key]) {
            // 自定义任务
            return custask[current.key](...params);
          }
          if (allowTask && !allowTask[key]) {
            error('当前任务未在允许列表！', { key: current.key });
          }
          return dynamicExec(current, 0, params, loop_res, global_res);
        }
      }
      if (gv.config.offsetConst[key]) return gv.config.offsetConst[key];
      error('loop_res取值未找到', { key });
    }
  })
  return dynamicExec(task, 0, args, loop_res, global_res);
}

