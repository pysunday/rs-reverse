const gv = require('@src/handler/globalVarible');

// 预期任务作用，实际还没有用到，需要多版本对比
const expectTask = {
  '0>one>71>one>4>one>3-344': '计算阶乘'
}

module.exports = {
  '0>one>21-23': (num) => {
    return Math.abs(num) % 8;
  },
}
