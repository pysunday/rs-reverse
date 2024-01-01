const paths = require('@utils/paths');
const fs = require('fs');
const { init } = require('@src/handler/parser/');
const pkg = require(paths.package);
const logger = require('./logger');

module.exports = (function() {
  const tsFullPath = paths.exampleResolve('codes', pkg.tsfile);
  logger.debug(`初始化GlobalVarible变量，$_ts配置文件：${tsFullPath}`);
  init(JSON.parse(fs.readFileSync(tsFullPath, 'utf8')));
  return require('@src/handler/globalVarible');
})();
