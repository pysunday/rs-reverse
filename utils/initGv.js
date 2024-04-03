const paths = require('@utils/paths');
const fs = require('fs');
const { init } = require('@src/handler/parser/');
const logger = require('./logger');
const gv = require('@src/handler/globalVarible');
const Coder = require('@src/handler/Coder');

module.exports = function(filepath) {
  if (typeof filepath !== 'string') {
    if (typeof filepath === 'number') gv._setAttr('version', filepath);
    filepath = paths.exampleResolve('codes', `${gv.version}-$_ts.json`)
  }
  if (!fs.existsSync(filepath)) throw new Error(`输入文件不存在: ${filepath}`);
  logger.debug(`初始化GlobalVarible变量，$_ts配置文件：${filepath}`);
  const coder = new Coder(JSON.parse(fs.readFileSync(filepath, 'utf8')));
  const { code, $_ts } = coder.run();
  init($_ts);
  return gv;
};
