#!/usr/bin/env node
const path = require('path');
const paths = require('./utils/paths');
require('module-alias')(path.dirname(paths.package));
const yargs = require('yargs');
const fs = require('fs');
const makeCode = require('@src/makeCode');
const makeCodeHigh = require('@src/makeCodeHigh');
const makeCookie = require('@src/makeCookie');
const basearrParse = require('@src/basearrParse');
const utils = require('@utils/');
const { logger, getCode } = utils;
const pkg = require(paths.package);
const log4js = require('log4js');
const adapt = require('@src/adapt');
const gv = require('@src/handler/globalVarible');

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
      if (['1', '2'].includes(input)) {
        gv._setAttr('version', Number(input));
        input = paths.exampleResolve('codes', `${input}-\$_ts.json`);
      }
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
    coerce: getCode,
  },
  a: {
    alias: 'adapt',
    describe: '已经做了适配的网站名称，不传则为cnipa',
    type: 'string',
  }
}

const commandHandler = (command, argv) => {
  debugLog(argv.level);
  const ts = argv.url?.$_ts || argv.file || require(paths.exampleResolve('codes', `${gv.version}-\$_ts.json`));
  logger.trace(`传入的$_ts.nsd: ${ts.nsd}`);
  logger.trace(`传入的$_ts.cd: ${ts.cd}`);
  gv._setAttr('argv', argv);
  try {
    if (argv.url) {
      command(ts, adapt(argv.url, argv.adapt), argv.url);
    } else {
      command(ts);
    }
  } catch (err) {
    logger.error(err.stack);
  }
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
    command: 'makecode-high',
    describe: '解码两次请求返回的网站代码(功能涵盖makecode子命令)',
    builder: {
      ...commandBuilder,
      f: undefined,
      u: {
        ...commandBuilder.u,
        demandOption: true,
      }
    },
    handler: commandHandler.bind(null, makeCodeHigh),
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
      f: {
        alias: 'file',
        describe: '拥有完整$_ts的json文件',
        type: 'string',
        coerce: (input) => {
          if (['1', '2'].includes(input)) {
            gv._setAttr('version', Number(input));
            return paths.exampleResolve('codes', `${input}-\$_ts.json`);
          }
          return input;
        }
      },
    },
    handler: (argv) => {
      debugLog(argv.level);
      Math.random = () => 0.1253744220839037;
      const gv = require('@utils/initGv')(argv.file);
      Object.assign(global, gv.utils);
      Object.assign(global, require('@src/handler/viewer/'));
      const output = JSON.stringify(eval(argv.code));
      console.log([`\n  输入：${argv.code}`, `输出：${output}\n`].join('\n  '));
    }
  })
  .command({
    command: 'basearr',
    describe: '接收压缩前数字数组的序列化文本并格式化解析',
    builder: {
      l: {
        alias: 'level',
        describe: '日志打印等级，参考log4js，默认为info',
        type: 'string',
      },
      b: {
        alias: 'basearr',
        describe: '压缩前数字数组的序列化文本',
        type: 'array',
        demandOption: true,
      }
    },
    handler: (argv) => {
      debugLog(argv.level);
      basearrParse(argv.basearr);
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

