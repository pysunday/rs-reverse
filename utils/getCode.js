// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const { request, cookieJar } = require('./request');
const cheerio = require('cheerio');
const isValidUrl = require('./isValidUrl');
const _get = require('lodash/get');
const urlresolve = require('url').resolve;

function addRequestHead(uri) {
  return {
    // proxy: 'http://127.0.0.1:8888',
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

function nameHandle(name, extend) {
  return name.split('.').pop() === extend ? name : `${name}.${extend}`;
}

async function getCodeByHtml(url, cookieStr) {
  if (cookieStr) {
    cookieJar.setCookie(request.cookie(cookieStr), url);
  }
  if (!isValidUrl(url)) throw new Error('输入链接不正确');
  const res = await request(addRequestHead(url));
  const $ = cheerio.load(res.body);
  const scripts = [...$('script')]
  const tsscript = scripts.map(ele => $(ele).text()).filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
  if (!tsscript.length) throw new Error(`${res.body}\n错误：链接返回结果未找到cd或nsd, 请检查!`);
  const $_ts = Function('window', tsscript[0] + 'return $_ts')({});
  $_ts.metaContent = _get($('meta[r=m]'), '0.attribs.content');
  const checkSrc = (src) => src?.split('.').pop().split('?')[0] === 'js' ? src : undefined;
  const remotes = scripts.map(it => checkSrc(it.attribs.src)).filter(Boolean);
  if (!remotes.length) throw new Error('未找到js外链，无法提取配置文本请检查!');
  const ret = {
    $_ts,
    jscode: null,
    html: {
      code: res.body,
      url,
      name: nameHandle(url.split('?')[0].split('/').pop(), 'html'),
      desc: 'url方式提取的html代码：'
    },
    appcode: [],
    url,
  }
  await getCodeByJs(remotes.map(it => urlresolve(url, it)), ret);
  if (ret.jscode) return ret;
  throw new Error('js外链中没有瑞数的代码文件');
}

async function getCodeByJs(urls, ret = { appcode: [] }) {
  for(let url of urls) if (!isValidUrl(url)) throw new Error(`输入链接不正确：${url}`);
  for(let jsurl of urls) {
    const name = jsurl.split('?')[0].split('/').pop();
    const jscode = await request(addRequestHead(jsurl));
    const data = {
      code: jscode.body,
      url: jsurl,
      name: nameHandle(name, 'js'),
      desc: 'url方式提取的javascript代码：'
    };
    if (jscode.body.indexOf('$_ts.l__(') === 0) {
      ret.appcode.push(data);
    } else if (jscode.body.includes('r2mKa')) {
      ret.jscode = data;
    }
  }
  return ret;
}

module.exports = function getCode(url, ...params) {
  if (typeof url === 'string') {
    return getCodeByHtml(url, ...params);
  }
  if (Array.isArray(url)) {
    return getCodeByJs(url);
  }
}
