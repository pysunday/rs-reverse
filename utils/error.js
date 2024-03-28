const gv = require('@src/handler/globalVarible');
const logger = require('./logger');

const errorMap = {
  9999: '未知报错!',
  1000: '解码cd值发现未定义任务方法',
}

module.exports = function(type, data = {}) {
  Object.assign(data, gv._getAttr('_ts'));
  data.errType = type;
  logger.fatal(`(${type})程序出错啦，请将该段报错文本贴到issue中：${JSON.stringify(data)}`);
  throw new Error(errorMap[type] || type);
}
