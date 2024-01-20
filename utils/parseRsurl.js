const adapt = require('@src/adapt');
const isValidUrl = require('@utils/isValidUrl');
const request = require('request-promise');
const cheerio = require('cheerio');
const tough = require('tough-cookie');
const urlresolve = require('url').resolve;

module.exports = async (url, name, options = {}) => {
  if (!isValidUrl(url)) throw new Error('输入链接不正确');
  const cookieJar = new tough.CookieJar();
  options.jar = cookieJar;
  const res = await request(url, options);
  const $ = cheerio.load(res);
  const scripts = [...$('script')]
  const tsscript = scripts.map(ele => $(ele).text()).filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
  if (!tsscript.length) throw new Error('链接返回结果未找到cd或nsd');
  const $_ts = Function('window', tsscript[0] + 'return $_ts')({});
  const checkSrc = (src) => src?.split('.').pop() === 'js' ? src : undefined;
  const remotes = scripts.map(it => checkSrc(it.attribs.src)).filter(Boolean);
  if (!remotes.length) throw new Error('未找到js外链，无法提取配置文本请检查!');
  for(let src of remotes) {
    const jscode = await request(urlresolve(url, src), options);
    if (jscode.includes('r2mKa')) {
      return {
        $_ts,
        immucfg: adapt(jscode, name),
        options,
        request,
      };
    }
  }
  throw new Error('js外链中没有瑞数的代码文件');
}

