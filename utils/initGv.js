const paths = require('@utils/paths');
const fs = require('fs');
const { init } = require('@src/handler/parser/');
const logger = require('./logger');

module.exports = function(filepath) {
  if (!filepath) filepath = paths.exampleResolve('codes', "1-$_ts-full.json")
  if (!fs.existsSync(filepath)) throw new Error(`输入文件不存在: ${filepath}`);
  logger.debug(`初始化GlobalVarible变量，$_ts配置文件：${filepath}`);
  init(JSON.parse(fs.readFileSync(filepath, 'utf8')));
  return require('@src/handler/globalVarible');
};
