const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const fs = require('fs');
const logger = require('@utils/logger');

module.exports = function (ts, immucfg) {
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const files = [
    {
      name: 'makecode_output_ts',
      desc: '输出ts：',
      text: JSON.stringify($_ts),
      extend: 'json',
    },
    {
      name: 'makecode_output_code',
      desc: '输出动态代码：',
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
      extend: 'js',
    },
    immucfg ? {
      name: 'makecode_input_ts',
      desc: 'url方式提取的ts：',
      text: JSON.stringify(ts),
      extend: 'json',
    } : null,
    immucfg ? {
      name: 'makecode_input_immucfg',
      desc: 'url方式提取的静态文本：',
      text: JSON.stringify(immucfg),
      extend: 'json',
    } : null,
  ].filter(Boolean).map(it => ({ ...it, filepath: `${paths.outputResolve(it.name)}.${it.extend}` }))
  if (!fs.existsSync(paths.outputPath)) fs.mkdirSync(paths.outputPath);
  files.forEach(({ filepath, text }) => fs.writeFileSync(filepath, text))
  logger.info([
    `生成动态代码成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, `${it.desc}${it.filepath}${idx === files.length - 1 ? '\n' : ''}`]), []),
  ].join('\n  '));
}

