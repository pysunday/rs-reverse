const gv = require('@src/handler/globalVarible');
const monitor = require('@utils/monitor');
const logger = require('@utils/logger');

module.exports = function(...params) {
  logger.trace('执行开始!');
  try {
    return dynamicExec(...params);
  } catch (err) {
    logger.error(String(err));
    throw err;
  } finally {
    logger.trace('执行结束!');
  }
}

function dynamicExec(taskItem, start = 0, args = [], loop_res = {}, global_res = {}) {
  const codemap = gv.config.codemap;
  const { key, taskarr: task } = taskItem;
  args = monitor(args, `${key}_args`, { getLog: true, setLog: true });
  loop_res = monitor(loop_res, `${key}_loop_res`, { getLog: true, setLog: true });
  global_res = monitor(global_res, `${key}_global_res`, { getLog: true, setLog: true });
  logger.trace(`动态代码运行，任务列表：${key}, 起点：${start}，长度：${task.length}`);
  const data = [];
  const ret = [];
  ret[0] = args;
  ret[2] = [ 'window', args ];
  const vars = [
    `${codemap.params[0]} = taskItem`,
    `${codemap.params[1]} = start`,
    `${codemap.params[2]} = task.length`,
    `${codemap.params[3]} = ret`,
    // 任务列表
    `${codemap.taskarr} = taskItem.taskarr`,
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
      eval(`${codemap.forcur}=t_cursor`);
      codemap[task[t_cursor]].split(';').map(it => it.trim()).forEach(c => {
        try {
          eval(c);
        } catch(err) {
          logger.error(`代码: ${c} 执行失败，当前任务：${taskItem.key}`)
          debugger;
          throw err;
        }
      })
      eval(`t_cursor=${codemap.forcur}`);
    }
  }
  return ret[5];
}

