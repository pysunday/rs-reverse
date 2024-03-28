// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const request = require('request-promise');
const cheerio = require('cheerio');
const isValidUrl = require('./isValidUrl');
const _get = require('lodash/get');
const urlresolve = require('url').resolve;

function addRequestHead(uri) {
  return {
    // proxy: 'http://127.0.0.1:7777',
    // gzip: true
    uri,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    resolveWithFullResponse: true,
    simple: false,
  }
}

module.exports = async function getCode(url) {
  if (!isValidUrl(url)) throw new Error('输入链接不正确');
  const res = await request(addRequestHead(url));
  const $ = cheerio.load(res.body);
  const scripts = [...$('script[r=m]')]
  const tsscript = scripts.map(ele => $(ele).text()).filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
  if (!tsscript.length) throw new Error(`${res.body}\n错误：链接返回结果未找到cd或nsd, 请检查!`);
  const $_ts = Function('window', tsscript[0] + 'return $_ts')({});
  $_ts.metaContent = _get($('meta[r=m]'), '0.attribs.content');
  const checkSrc = (src) => src?.split('.').pop() === 'js' ? src : undefined;
  const remotes = scripts.map(it => checkSrc(it.attribs.src)).filter(Boolean);
  if (!remotes.length) throw new Error('未找到js外链，无法提取配置文本请检查!');
  for(let src of remotes) {
    const jscode = await request(addRequestHead(urlresolve(url, src)));
    if (jscode.body.includes('r2mKa')) return { $_ts, jscode: jscode.body, html: res.body, url };
  }
  throw new Error('js外链中没有瑞数的代码文件');
}
