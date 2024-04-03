// 直接通过动态代码执行来运行任务
// 该方法并未完全还原，谨慎使用
const gv = require('@src/handler/globalVarible');
const monitor = require('@utils/monitor');
const logger = require('@utils/logger');
const custask = require('../task');
const error = require('@utils/error');

module.exports = function(task, args, allowTask) {
  if (typeof task === 'string') task = gv.r2mka(task);
  if (!task) throw new Error('任务未找到');
  logger.debug(`${task.key}执行开始!`);
  try {
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
  } catch (err) {
    logger.error(String(err));
    throw err;
  } finally {
    logger.debug(`${task.key}执行结束!`);
  }
}

function taskFactory(task, args) {
  return (...params) => {
    if (custask[task.key]) return custask[task.key](...params);
    return module.exports(task, params);
  }
}

function getParentSubTask(task, loopRes) {
  const subTask = [];
  if (!task) debugger;
  while (task.isReset === 0 && task.key !== '0-0') {
    subTask.push(['window', 'args', ...task.child_one.slice(2).map(it => taskFactory(it))]);
    task = task.parent;
  }
  return [loopRes, ...subTask.reverse()];
}


function dynamicExec(taskItem, start = 0, args = [], loop_res = {}, global_res = {}) {
  const codemap = gv.config.codemap;
  const { key, taskarr: task } = taskItem;
  args = monitor(args, `${key}_args`, { getLog: true, setLog: true });
  loop_res = monitor(loop_res, `${key}_loop_res`, { getLog: true, setLog: true });
  global_res = monitor(global_res, `${key}_global_res`, { getLog: true, setLog: true });
  logger.debug(`动态代码运行，任务列表：${key}, 起点：${start}，长度：${task.length}`);
  const data = [];
  const ret = [];
  ret[0] = args;
  ret[2] = [ 'window', args ];
  ret[3] = getParentSubTask(taskItem.parent, loop_res);
  const taskItemProxy = new Proxy({}, {
    get(target, property, receiver) {
      const idx = codemap.taskAttr.indexOf(property);
      if (idx === -1) debugger;
      const name = ['lens', 'isReset', 'taskarr', 'child_one', 'child_two'][idx];
      if (!name) debugger;
      return taskItem[name];
    }
  })
  const vars = [
    `${codemap.params[0]} = taskItemProxy`,
    `${codemap.params[1]} = start`,
    `${codemap.params[2]} = task.length`,
    `${codemap.params[3]} = ret`,
    // 任务工厂函数
    `${codemap.taskFactory} = taskFactory`,
    `${codemap.keyname} = gv.ts.cp[1]`,
    // 任务列表
    `${codemap.taskarr} = task`,
    // 数据数组
    `${codemap.dataKey} = data`,
    // 数据数组游标
    `${codemap.dataIdx} = 0`,
    `${codemap.ret0} = ret[0]`,
    `${codemap.ret1} = ret[1]`,
    `${codemap.ret2} = ret[2]`,
    `${codemap.ret3} = ret[3]`,
    // 全局资源
    `${codemap.globalRes} = global_res`,
    // 本地资源
    `${codemap.loopRes} = loop_res`,
    `${codemap.forcur} = start`, 
    `${codemap.formax} = task.length`,
    ...codemap.varible,
  ].join(', ');
  eval(`var ${vars};${codemap.commonFunc}`)
  for (let t_cursor = start, idx = 0; t_cursor < task.length; t_cursor++) {
    idx ++;
    if (typeof codemap[task[t_cursor]] !== 'string') {
      logger.error(`codemap中下标${task[t_cursor]}不存在值!`)
    } else {
      logger.debug(`(${key}, ${idx})执行代码：${codemap[task[t_cursor]]}`);
      eval(`${codemap.forcur}=t_cursor`);
      codemap[task[t_cursor]].split(';').map(it => it.trim()).forEach(c => {
        try {
          eval(c);
        } catch(err) {
          logger.error(`代码: ${c} 执行失败，当前任务：${key}`)
          debugger;
          throw err;
        }
      })
      eval(`t_cursor=${codemap.forcur}`);
    }
  }
  return ret[5];
}

