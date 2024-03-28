const _merge = require('lodash/merge');
const _chunk = require('lodash/chunk');
const _get = require('lodash/get');
const _set = require('lodash/set');
const config = require('@src/config/');

const cache = {};

class GlobalVarible {
  get config() {
    // 不同版本的可变配置
    if (!cache.config) {
      cache.config = config(cache.version);
    }
    return cache.config
  }
  get version() {
    // 代码版本
    return cache.version || this.config.version;
  }
  get metaContent() {
    return cache.metaContent;
  }
  get bignum() {
    return cache.bignum;
  }
  get cfgnum() {
    return cache.cfgnum;
  }
  get decryptKeys() {
    return cache.decryptKeys;
  }
  get basestr() {
    return 'qrcklmDoExthWJiHAp1sVYKU3RFMQw8IGfPO92bvLNj.7zXBaSnu0TC6gy_4Ze5d{}|~ !#$%()*+,-;=?@[]^';
  }
  get utils() {
    return cache.utils;
  }
  get cp0() {
    return cache.cp0;
  }
  get cp0_96() {
    return (idx, cur) => {
      const isIdxNum = typeof idx === 'number';
      const isCurNum = typeof cur === 'number';
      if (isIdxNum && isCurNum) return _get(cache, `cp0_96.${idx}.${cur}`);
      if (isIdxNum) return _get(cache, `cp0_96.${idx}`);
      return cache.cp0_96
    }
  }
  get cp2() {
    return cache.cp2;
  }
  get cp6() {
    return cache.cp6;
  }
  get ts() {
    // 返回$_ts
    return cache.ts;
  }
  get r2mka() {
    // 返回获取任务对象的方法，为空时返回任务树
    return cache.r2mka;
  }
  get keys() {
    // 返回密钥集合
    return cache.keys;
  }
  _getAttr(attr) {
    return cache[attr];
  }
  _setAttr(attr, value) {
    _set(cache, attr, value);
    if (attr === 'cp0') {
      cache.cp0_96 = _chunk(value, 96);
    }
  }
}

module.exports = new GlobalVarible();
