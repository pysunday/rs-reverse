const fs = require('fs');
const logger = require('@utils/logger');
const findFullString = require('@utils/findFullString');
const gv = require('@src/handler/globalVarible');

const adapts = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file.isDirectory())
  .map(folder => folder.name)
  .reduce((ans, it) => {
    ans[it] = require(`./${it}/`);
    return ans;
  }, {});

module.exports = function({ jscode, url }, name) {
  if (!name && !url.includes('cnipa')) throw new Error(`请确保url与适配器匹配, 当前已适配：${Object.keys(adapts).join('、')}`);
  if (name && !adapts[name]) throw new Error(`传入的适配器名称不存在, 当前已适配：${Object.keys(adapts).join('、')}`);
  const config = adapts[name || 'cnipa'];
  return Object.entries(config).reduce((ans, [key, val]) => {
    if (key === 'version') {
      if (typeof val !== 'number') throw new Error(`${name}适配配置错误，version必须为数字`);
      gv._setAttr('version', val);
      return ans;
    }
    const idx = jscode.indexOf(val);
    if (idx === -1) throw new Error(`${key}值数据未找到，请查看文档：src/adapt/readme.md`);
    if (jscode.indexOf(val, idx + val.length) > -1) throw new Error(`${key}对应的值${val}在代码中非唯一，请检查！`);
    const fullString = findFullString(jscode, val);
    return { ...ans, [key]: fullString };
  }, {});
}

