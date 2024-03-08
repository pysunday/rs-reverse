#!/usr/bin/env node
const path = require('path');
const paths = require('./utils/paths');
require('module-alias')(path.dirname(paths.package));
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
const urlresolve = require('url').resolve;
const adapt = require('@src/adapt');
const _get = require('lodash/get');

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

const getCode = async (url) => {
  if (!isValidUrl(url)) throw new Error('输入链接不正确');
  const res = await request(url)
  const $ = cheerio.load(res);
  const scripts = [...$('script[r=m]')]
  const tsscript = scripts.map(ele => $(ele).text()).filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
  if (!tsscript.length) throw new Error('链接返回结果未找到cd或nsd');
  const $_ts = Function('window', tsscript[0] + 'return $_ts')({});
  $_ts.metaContent = _get($('meta[r=m]'), '0.attribs.content');
  const checkSrc = (src) => src?.split('.').pop() === 'js' ? src : undefined;
  const remotes = scripts.map(it => checkSrc(it.attribs.src)).filter(Boolean);
  if (!remotes.length) throw new Error('未找到js外链，无法提取配置文本请检查!');
  for(let src of remotes) {
    const jscode = await request(urlresolve(url, src));
    if (jscode.includes('r2mKa')) return { $_ts, jscode, html: res };
  }
  throw new Error('js外链中没有瑞数的代码文件');
}

const commandBuilder = {
  f: {
    alias: 'file',
    describe: '含有nsd, cd值的json文件',
    type: 'string',
    coerce: (input) => {
      if (['1', '2'].includes(input)) input = paths.exampleResolve('codes', `${input}-\$_ts.json`);
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
  const ts = argv.url?.$_ts || argv.file || require(paths.exampleResolve('codes', '1-\$_ts.json'));
  logger.trace(`传入的$_ts.nsd: ${ts.nsd}`);
  logger.trace(`传入的$_ts.cd: ${ts.cd}`);
  if (argv.url) {
    command(ts, adapt(argv.url.jscode, argv.adapt), argv.url);
  } else {
    command(ts);
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
          if (['1', '2'].includes(input)) return paths.exampleResolve('codes', `${input}-\$_ts-full.json`);
          return input;
        }
      },
    },
    handler: (argv) => {
      debugLog(argv.level);
      Math.random = () => 0.1253744220839037;
      const gv = require('@utils/initGv')(argv.file);
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

