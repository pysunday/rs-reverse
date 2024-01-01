const paths = require('@utils/paths');
const fs = require('fs');
const { init } = require('@src/handler/parser/');
const pkg = require(paths.package);

module.exports = (function() {
  const filename = pkg.tsfile;
  console.log(`初始化GlobalVarible变量，配置文件：${filename}`)
  const tsFullPath = paths.exampleResolve('codes', filename);
  init(JSON.parse(fs.readFileSync(tsFullPath, 'utf8')));
  return require('@src/handler/globalVarible');
})();
