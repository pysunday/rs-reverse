const dataOper = require('./dataOper');
const _chunk = require('lodash/chunk');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(``, {
  runScripts: "outside-only",
  url: "http://wcjs.sbj.cnipa.gov.cn/sgtmi",
});

const { String, Array, Error, Math, Date, Object, unescape, encodeURIComponent, Function, parseInt } = window;

module.exports = class {
  constructor(ts) {
    this.startTime = new Date().getTime();
    window.$_ts = ts
    this.opdata = dataOper()
  }

  parseCpCommon(data) {
    if (!data) return [];
    const { opdata: { getData } } = this;
    const ans = []
    const firstCode = data.charCodeAt(0) - 97;
    for (let idx = 1; idx < data.length; ++idx) {
      let curr = data.charCodeAt(idx);
      if (curr >= 40 && curr < 92) {
        curr += firstCode;
        if (curr >= 92) curr -= 52;
      } else if (curr >= 97 && curr < 127) {
        curr += firstCode;
        if(curr >= 127) curr -= 30;
      }
      ans[idx - 1] = curr;
    }
    return String.fromCharCode(...ans).split(getData('G_$d2'));
  }

  globalCode() {
    const { opdata: { setData, getData } } = this;
    setData('G_$dZ', String.fromCharCode);
    setData('G_$at', Array);
    setData('G_$d2', String.fromCharCode(96));
    const cp0 = _chunk(this.parseCpCommon(window.$_ts.cp[0]), 96);
    setData('G_$cc', cp0[0]);
    setData('G_$ia', cp0[1]);
    setData('G_$ga', cp0[2]);
    setData('G_$_7', cp0[3]);
    setData('G_$_3', cp0[4]);
    setData('G_$jY', cp0[5]);
    setData('G_$ad', cp0[6]);
    setData('G_$bJ', cp0[7]);
    setData('G_$eh', cp0[8]);
    setData('G_$bv', cp0[9]);
    setData('G_$bO', cp0[10]);
    setData('G_$_x', cp0[11]);
    setData('G_$dL', cp0[12]);
    setData('G_$bn', cp0[13]);
    setData('G_$_a', cp0[14]);
    setData('G_$kf', cp0[15]);
    setData('G_$fa', cp0[16]);
    setData('G_$h2', cp0[17]);
    setData('G_$je', cp0[18]);
    setData('G_$he', cp0[19]);
    setData('G_$$6', cp0[20]);
    setData('G_$hQ', this.parseCpCommon(window.$_ts.cp[2]).map(Number));
    setData('G_$cJ', this.parseCpCommon(window.$_ts.cp[6]));
    setData('G_$aP', []);
    setData('G_$fX', []);
    getData('G_$fX')[49] = getData('G_$aP');
    getData('G_$fX')[15] = null;
    setData('G_$cZ', String);
    setData('G_$gc', window);
    setData('G_$ja', null);
    setData('G_$dq', Error);
    setData('G_$cm', Math);
    setData('G_$hY', parseInt);
    setData('G_$ao', Date);
    setData('G_$fi', Object);
    setData('G_$aB', unescape);
    setData('G_$hq', encodeURIComponent);
    setData('G_$_z', Function);
    setData('G_$ah', window.document);
    setData('G_$ii', window.top.location);
    setData('G_$_v', Math.random);
    setData('G_$gh', Math.abs);
    setData('G_$kg', Math.ceil);
    getData('G_$fX')[51] = Math.round;
    getData('G_$fX')[27] = Math.floor;
    getData('G_$fX')[44] = Math.log;
    getData('G_$fX')[53] = Math.pow;
    setData('G_$bB', Math.sqrt);
    setData('G_$fA', window.setTimeout);
    setData('G_$iu', window.setInterval);
    setData('G_$hL', window.eval);
    setData('G_$dN', window.escape);
    setData('G_$jr', window.Number);
    setData('G_$gL', window.decodeURIComponent);
    setData('G_$dk', window.isFinite);
    setData('G_$c7', window.location);
    setData('G_$jU', window.RegExp);
    getData('G_$fX')[19] = window.$_ts;
    setData('G_$hD', String.prototype);
    getData('G_$fX')[40] = String.prototype.charAt;
    setData('G_$jD', String.prototype.charCodeAt);
    getData('G_$fX')[30] = String.prototype.concat;
    getData('G_$fX')[14] = String.prototype.indexOf;
    getData('G_$fX')[33] = String.prototype.lastIndexOf;
    setData('G_$gW', String.prototype.match);
    setData('G_$en', String.prototype.replace);
    setData('G_$$L', String.prototype.search);
    getData('G_$fX')[36] = String.prototype.slice;
    getData('G_$fX')[11] = String.prototype.split;
    setData('G_$j0', String.prototype.substr);
    setData('G_$c1', String.prototype.substring);
    getData('G_$fX')[42] = String.prototype.toLowerCase;
    getData('G_$fX')[43] = String.prototype.toUpperCase;
    setData('G_$f9', Array.prototype.push);
    setData('G_$in', Object.prototype.toString);
    getData('G_$fX')[38] = Function.prototype.toString;
    getData('G_$fX')[2] = Array.prototype.join;
    getData('G_$fX')[16] = window.document.createElement;
    getData('G_$fX')[21] = window.document.appendChild;
    getData('G_$fX')[50] = window.document.removeChild;
    setData('G_$eF', []);
    getData('G_$fX')[46] = window.clearInterval;
    setData('G_$bd', '/');
    setData('G_$eD', ':');
    setData('G_$dl', '#');
    setData('G_$bL', '//');
    setData('G_$cb', 'href');
    setData('G_$ap', 'protocol');
    setData('G_$_f', 'hostname');
    setData('G_$jm', 'port');
    setData('G_$jQ', 'pathname');
    setData('G_$dH', window.CollectGarbage);
    getData('G_$fX')[32] = window.DOMParser
    setData('G_$_E', window.ActiveXObject);
    setData('G_$aJ', window.JSON);
    setData('G_$$H', String.prototype.trim);
    getData('G_$fX')[45] = window.JSON && window.JSON.parse;
    getData('G_$fX')[52] = '';
    getData('G_$fX')[48] = window.$_ts.jf;
    window.$_ts.jf = undefined;
    getData('G_$fX')[12] = [getData('G_$hQ')[9], getData('G_$hQ')[48], getData('G_$hQ')[37], 1];
    getData('G_$fX')[3] = 1;
    getData('G_$fX')[18] = getData('G_$hQ')[41];
    getData('G_$fX')[8] = getData('G_$hQ')[0];
    setData('G_$$o', parseInt);
  }

  run() {
    this.globalCode();
  }
}
