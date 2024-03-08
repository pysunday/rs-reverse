const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const fs = require('fs');
const logger = require('@utils/logger');

module.exports = function (ts, immucfg, mate = {}) {
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const files = [
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
    mate.jscode ? {
      name: 'makecode_input_js',
      desc: 'url方式提取的javascript代码：',
      text: JSON.stringify(mate.jscode),
      extend: 'js',
    } : null,
    mate.html ? {
      name: 'makecode_input_html',
      desc: 'url方式提取的html代码：',
      text: JSON.stringify(mate.html),
      extend: 'html',
      newLine: true,
    } : null,
    {
      name: 'makecode_output_ts',
      desc: '程序生成的ts：',
      text: JSON.stringify($_ts),
      extend: 'json',
    },
    {
      name: 'makecode_output_code',
      desc: '程序生成的动态代码：',
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
      extend: 'js',
    },
  ].filter(Boolean).map(it => ({ ...it, filepath: `${paths.outputResolve(it.name)}.${it.extend}` }))
  if (!fs.existsSync(paths.outputPath)) fs.mkdirSync(paths.outputPath);
  files.forEach(({ filepath, text }) => fs.writeFileSync(filepath, text))
  logger.info([
    `生成动态代码成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, `${it.desc}${it.filepath}${idx === files.length - 1 || it.newLine ? '\n' : ''}`]), []),
  ].join('\n  '));
}

