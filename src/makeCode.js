const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const logger = require('@utils/logger');
const fs = require('fs');

function writeFile(filepath, text) {
  fs.writeFileSync(filepath, text);
  console.info(`文件写入成功：${filepath}`)
}

module.exports = function (ts) {
  logger.info(`传入的$_ts.nsd: ${ts.nsd}`);
  logger.info(`传入的$_ts.cd: ${ts.cd}`);
  const coder = new Coder(ts);
  const { code, $_ts } = coder.run();
  writeFile(paths.outputResolve('dynamic-code.js'), code);
  writeFile(paths.outputResolve('output_ts.json'), JSON.stringify($_ts));
  writeFile(paths.outputResolve('input_ts.json'), JSON.stringify(ts));
}

