process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const { request, cookieJar } = require('./request');
const cheerio = require('cheerio');
const isValidUrl = require('./isValidUrl');
const _get = require('lodash/get');
const urlresolve = require('url').resolve;

function addRequestHead(uri) {
  return {
    proxy: 'http://127.0.0.1:8888',
    gzip: true,
    uri,
    resolveWithFullResponse: true,
    simple: false,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'Connection': 'keep-alive',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'zh-CN,zh;q=0.9',
    }
  }
}

module.exports = async function getCode(url, cookieStr) {
  if (cookieStr) {
    cookieJar.setCookie(request.cookie(cookieStr), url);
    console.log(`当前cookie：${cookieJar.getCookieString(url)}`);
  }
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

// Host: wcjs.sbj.cnipa.gov.cn
// Connection: keep-alive
// Upgrade-Insecure-Requests: 1
// sec-ch-ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "macOS"
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
// Accept-Encoding: gzip, deflate, br, zstd
// Accept-Language: zh-CN,zh;q=0.9
// Sec-Fetch-Dest: document
// Sec-Fetch-Mode: navigate
//
// Sec-Fetch-Site: none
// Sec-Fetch-User: ?1
//
//
// Sec-Fetch-Site: same-origin
// Referer: https://wcjs.sbj.cnipa.gov.cn/sgtmi
