#!/usr/bin/env node
require('module-alias/register');
const yargs = require('yargs');
const fs = require('fs');
const makeCode = require('@src/makeCode');
const makeCookie = require('@src/makeCookie');
const utils = require('@utils/');
const { logger, paths, isValidUrl } = utils;
const pkg = require(paths.package);
const request = require('request-promise');
const cheerio = require('cheerio');

function debugLog() {
  if (pkg.logLevel === 'debug') {
    logger.log('execPath:', __dirname);
    logger.log('filePath:', __filename);
    logger.log('processCwd:', process.cwd());
    logger.log('paths:\n', JSON.stringify(paths, null, 2));
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
    builder: {
      f: {
        alias: 'file',
        describe: '含有nsd, cd值的json文件',
        type: 'string',
        coerce: (input) => {
          if (!fs.existsSync(input)) throw new Error('输入文件不存在');
          return JSON.parse(fs.readFileSync(paths.resolve(input), 'utf8'));
        }
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
    },
    handler: (argv) => {
      debugLog();
      makeCode(argv.file || argv.url);
    },
  })
  .command({
    command: 'makecookie',
    describe: '生成动态cookie',
    handler: (argv) => {
      debugLog();
      makeCookie();
    },
  })
  .updateStrings({
    'Show version number': '显示版本号',
    'Show help': '显示帮助信息',
  })
  .example('$0 makecode -f example/codes/1-\$_ts.json')
  .example('$0 makecode -u http://url/path')
  .epilog('')
  .argv;

