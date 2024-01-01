const path = require('path');
const fs = require('fs');

const appDirectory = (() => {
  // 返回项目根目录
  const plist = path.resolve(__dirname).split('/');
  while (!fs.existsSync(path.resolve(plist.join('/'), 'package.json'))) {
    plist.pop();
    if (plist.length === 0) return false;
  }
  return plist.join('/');
})();
const resolveApp = (...relativePath) => path.resolve(appDirectory, ...relativePath);

module.exports = {
  basePath: resolveApp(''),
  modulePath: resolveApp('node_modules'),
  binPath: resolveApp('node_modules/.bin/'),
  package: resolveApp('package.json'),
  resolve: resolveApp,
  srcPath: resolveApp('src'),
  outputPath: path.resolve('output'),
  outputResolve: (...p) => path.resolve('output', ...p),
  examplePath: resolveApp('example'),
  exampleResolve: (...p) => resolveApp('example', ...p),
};
