const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const logger = require('@utils/logger');
const fs = require('fs');

module.exports = function (ts) {
  const startTime = new Date().getTime();
  const coder = new Coder(ts);
  const { code, $_ts } = coder.run();
  const files = [
    {
      name: 'input_ts',
      desc: '输入ts：',
      text: JSON.stringify(ts),
    },
    {
      name: 'output_ts',
      desc: '输出ts：',
      text: JSON.stringify($_ts),
    },
    {
      name: 'dynamic_code',
      desc: '动态代码：',
      text: code,
    },
  ].map(it => ({ ...it, filepath: paths.outputResolve(it.name) + '.js' }))
  if (!fs.existsSync(paths.outputPath)) fs.mkdirSync(paths.outputPath);
  files.forEach(({ filepath, text }) => fs.writeFileSync(filepath, text))
  logger.info([
    `生成动态代码成功！用时：${new Date().getTime() - startTime}ms\n`,
    `${files[0].desc}${files[1].filepath}`,
    `${files[1].desc}${files[1].filepath}`,
    `${files[2].desc}${files[2].filepath}\n`,
  ].join('\n  '));
}

