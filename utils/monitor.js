const logger = require('./logger');

module.exports = function monitor(tar, name, config = {}) {
  const {
    getLog, // 开启get日志
    setLog, // 开启set日志
    getKeys = [], // 触发get的debugger的键集合
    setKeys = [], // 触发set的debugger的键集合
    keys = [], // 触发debugger的键集合
    getCb, // get的回调，设置的debugger更友好
    setCb, // set的回调，设置的debugger更友好
    cb, // 回调，设置的debugger更友好
    parse = (key, val) => val,
  } = config;
  return new Proxy(tar, {
    get: function(target, property, receiver) {
      getLog && logger.trace(`${name} Getting ${property}`);
      if (getKeys.includes(property) || keys.includes(property)) debugger;
      (getCb || cb)?.(property);
      return Reflect.get(target, property, receiver);
    },
    set: function(target, property, value, receiver) {
      setLog && logger.trace(`${name} Setting ${property} to ${value}`);
      if (getKeys.includes(property) || keys.includes(property)) debugger;
      (setCb || cb)?.(property, value);
      return Reflect.set(target, property, parse(property, value), receiver);
    }
  });
}
