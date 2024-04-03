const CoderHigh = require('./handler/CoderHigh');
const paths = require('@utils/paths');
const fs = require('fs');
const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const gv = require('@src/handler/globalVarible');
const getCode = require('@utils/getCode');

function parseR2mka(text) {
  const start = text.indexOf('"') + 1;
  const end = text.lastIndexOf('"') - 2;
  return unescape(text.substr(start, end));
}

module.exports = function (ts, immucfg, mate) {
  gv._setAttr('_ts', ts);
  const startTime = new Date().getTime();
  const coder = new Coder(ts, immucfg);
  const { code, $_ts } = coder.run();
  const r2mkaText = parseR2mka(coder.r2mkaText);
  const cookieVal = new Cookie($_ts, r2mkaText).run();
  const cookieKey = gv.utils.ascii2string(gv.keys[7]).split(';')[5] + 'P';
  debugger;
  getCode(mate.url, `${cookieKey}=${cookieVal}`);
}

