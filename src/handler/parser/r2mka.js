const gv = require('../globalVarible');
const gt3 = require('@src/immutext/').globalText3;
const logger = require('@utils/logger');

function gtHandler(str, curr) {
  return {
    getCurr: function() {
      return curr;
    },
    getCode: function() { 
      return str.charCodeAt(curr++);
    },
    getLine: function() {
      const end = this.getCode();
      if (end === 0) return '';
      const ans = str.substr(curr, end);
      curr += end;
      return ans;
    },
    getList: function() {
      const ans = this.getLine()
      if (!ans) return [];
      return ans.split(String.fromCharCode(255));
    },
  }
}

const parse = (() => {
  let count = 0;
  const valMap = {};
  return function(val, deep = 0, deeps = [0]) {
    const str = val.taskstr;
    val.taskstr = str;
    val.val = {};
    if (!str) {
      val.taskarr = [];
    } else {
      val.taskarr = str.split('').map(it => it.charCodeAt());
    }
    val.key = `${deeps.join('>')}-${count++}`;
    valMap[val.key] = val;
    val.child_one.map((it, idx) => {
      if (it) {
        parse(it, deep + 1, [...deeps, 'one', idx]);
      }
    });
    val.child_two.map((it, idx) => {
      if (it) {
        parse(it, deep + 1, [...deeps, 'two', idx]);
      }
    });
    return (key) => {
      if (!key) return val;
      return valMap[key];
    }
  }
})();

exports.parse = function(str = gt3) {
  const r2mka_len = 'r2mka'.length;
  const flag = str.charAt(r2mka_len) === '1';
  const gt = gtHandler(str, r2mka_len + 1);
  function deepParse() {
    const ans = {
      lens: gt.getCode(), // 当isReset为否时或者循环开始入口，设置入参数组的长度
      isReset: gt.getCode(), // 标志位，标记是否重置循环参数
      taskstr: gt.getLine(), // 循环的下标取值来源
    }
    let curr = gt.getCode();
    ans.child_one = new Array(curr + 2);
    for (let i = 0; i < curr; i++) {
      ans.child_one[i + 2] = deepParse();
    }
    curr = gt.getCode();
    ans.child_two = new Array(curr);
    for (let i = 0; i < curr; i++) {
      ans.child_two[i] = deepParse();
    }
    return ans;
  }
  gt.getList().concat(gt.getList()); // 未发现用处
  const windowIdx = gt.getCode(); // 首次循环入参配置，window变量存储下标
  const resourceIdx = gt.getCode(); // 首次循环如参配置，资源变量存储下标
  return parse(deepParse());
};

exports.init = function() {
  gv.setAttr('r2mka', exports.parse(gt3));
  logger.debug('头r2mka标识字符串完成解析!')
}
