// 遇到的gv.keys使用放在这里方便归档查阅
const gv = require('@src/handler/globalVarible');

exports.dkeys = function () {
  return {
    7: gv.utils.ascii2string(gv.keys[7]).split(';'),
    22: gv.utils.ascii2string(gv.keys[22]),
    29: gv.utils.ascii2string(gv.keys[29]),
    30: gv.utils.ascii2string(gv.keys[30]),
    31: gv.utils.ascii2string(gv.keys[31]),
    33: gv.utils.ascii2string(gv.keys[33]),
    34: gv.utils.ascii2string(gv.keys[34]),
  };
}
