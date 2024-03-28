const CoderHigh = require('./handler/CoderHigh');
const paths = require('@utils/paths');
const fs = require('fs');
const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const gv = require('@src/handler/globalVarible');

function parseR2mka(text) {
  const start = text.indexOf('"') + 1;
  const end = text.lastIndexOf('"') - 2;
  return unescape(text.substr(start, end));
}

module.exports = function (ts, immucfg) {
  console.log('还原更多加密文件，如app.js等，作者开发中，可关注微信订阅号`码功`获取项目更新推送!');
  return
  gv._setAttr('_ts', ts);
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const r2mkaText = parseR2mka(coder.r2mkaText);
  const cookie = new Cookie($_ts, r2mkaText).run();
  return cookie;
}

