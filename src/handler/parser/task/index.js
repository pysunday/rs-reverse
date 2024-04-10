const gv = require('@src/handler/globalVarible');

/*
 * 1. 0>one>71>one>4>two>2-348与0>one>71>one>4>two>12-358返回值来源一致
 */

module.exports = {
  '0>one>21-23': (num) => {
    return Math.abs(num) % 8;
  },
  '0>one>71>one>4>two>2-348': () => {
    // 该任务首先检测document.createElement('a')是否能成功，成功则返回gv.cp2中的固定值
    return 102;
  },
  '0>one>71>one>4>two>12-358': () => {
    // 该任务首先检测document.createElement('form')是否能成功，成功则返回gv.cp2中的固定值
    return 102;
  },
  '0>one>71>one>4>two>4-350': () => {
    // 该任务首先检测window.navigator.userAgent是否为string格式，是的话进行计算后返回
    // **需要注意是否返回同一值**
    return 224;
  },
  '0>one>71>one>4>two>14-360': () => {
    // 该任务首先检测window.navigator.userAgent是否为string格式，是的话进行计算后返回
    // **需要注意是否返回同一值**
    return 225;
  }
}
