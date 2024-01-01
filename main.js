#!/usr/bin/env node
const paths = require('./utils/paths');
require('module-alias')(paths.package);
const yargs = require('yargs');
const fs = require('fs');
const makeCode = require('@src/makeCode');
const makeCookie = require('@src/makeCookie');
const utils = require('@utils/');
const { logger, isValidUrl } = utils;
const pkg = require(paths.package);
const request = require('request-promise');
const cheerio = require('cheerio');
const log4js = require('log4js');

function debugLog(level) {
  if (level) {
    if (!log4js.levels.levels.map(it => it.levelStr).includes(level.toUpperCase())) {
      throw new Error('日志等级输入错误，请检查!');
    }
    logger.level = level;
  }
  logger.trace('execPath:', __dirname);
  logger.trace('filePath:', __filename);
  logger.trace('processCwd:', process.cwd());
  logger.trace('paths:\n', JSON.stringify(paths, null, 2));
}

const commandBuilder = {
  f: {
    alias: 'file',
    describe: '含有nsd, cd值的json文件',
    type: 'string',
    coerce: (input) => {
      if (['1', '2'].includes(input)) input = paths.exampleResolve(`codes/${input}-\$_ts.json`);
      if (!fs.existsSync(input)) throw new Error(`输入文件不存在: ${input}`);
      return JSON.parse(fs.readFileSync(paths.resolve(input), 'utf8'));
    }
  },
  l: {
    alias: 'level',
    describe: '日志打印等级，参考log4js，默认为info',
    type: 'string',
  },
  u: {
    alias: 'url',
    describe: '瑞数返回204状态码的请求地址',
    type: 'string',
    coerce: async (input) => {
      if (!isValidUrl(input)) throw new Error('输入链接不正确');
      try {
        const res = await request(input)
        const $ = cheerio.load(res);
        const scripts = [...$('script')].map(ele => $(ele).text())
        .filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
        if (!scripts.length) throw new Error('链接返回结果未找到cd或nsd');
        return Function('window', scripts[0] + 'return $_ts')({});
      } catch(err) {
        throw new Error('输入链接无效');
      }
    }
  }
}

const commandHandler = (command, argv) => {
  debugLog(argv.level);
  const ts = argv.file || argv.url || require(paths.exampleResolve('codes/1-\$_ts.json'));
  logger.trace(`传入的$_ts.nsd: ${ts.nsd}`);
  logger.trace(`传入的$_ts.cd: ${ts.cd}`);
  command(ts);
}

module.exports = yargs
  .help('h')
  .alias('v', 'version')
  .version(pkg.version)
  .usage('使用: node $0 <commond> [options]')
  .command({
    command: 'makecode',
    describe: '生成动态代码',
    builder: commandBuilder,
    handler: commandHandler.bind(null, makeCode),
  })
  .command({
    command: 'makecookie',
    describe: '生成动态cookie',
    builder: commandBuilder,
    handler: commandHandler.bind(null, makeCookie),
  })
  .command({
    command: 'exec',
    describe: '直接运行代码，用于开发及演示时使用，Math.random方法固定返回值为0.1253744220839037',
    builder: {
      l: {
        alias: 'level',
        describe: '日志打印等级，参考log4js，默认为info',
        type: 'string',
      },
      c: {
        alias: 'code',
        describe: '要运行的代码，如：gv.cp2，即打印cp2的值',
        type: 'string',
        demandOption: true,
      },
    },
    handler: commandHandler.bind(null, makeCookie),
    handler: (argv) => {
      debugLog(argv.level);
      Math.random = () => 0.1253744220839037;
      const gv = require('@utils/initGv');
      Object.assign(global, gv.utils);
      const output = JSON.stringify(eval(argv.code));
      console.log([`\n  输入：${argv.code}`, `输出：${output}\n`].join('\n  '));
    }
  })
  .updateStrings({
    'Show version number': '显示版本号',
    'Show help': '显示帮助信息',
  })
  .example('$0 makecode -f example/codes/1-\$_ts.json')
  .example('$0 makecode -u http://url/path')
  .example('$0 makecookie -f example/codes/1-\$_ts.json')
  .example('$0 makecookie -u http://url/path')
  .epilog('')
  .argv;

