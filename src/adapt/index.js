const fs = require('fs');
const logger = require('@utils/logger');
const unescape = require('@utils/unescape');

const adapts = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file.isDirectory())
  .map(folder => folder.name)
  .reduce((ans, it) => {
    ans[it] = require(`./${it}/`);
    return ans;
  }, {});

function findFullString(text, start, end) {
  let startIdx, endIdx;
  do {
    if (startIdx <= 0 || endIdx >= text.length - 1) return;
    startIdx === undefined && start--;
    endIdx === undefined && end++;
    if (startIdx === undefined && text[start] === '"' && text[start - 1] !== '\\') {
      startIdx = start;
    }
    if (endIdx === undefined && text[end] === '"' && text[end - 1] !== '\\') {
      endIdx = end;
    }
  } while (startIdx === undefined || endIdx === undefined);
  return unescape(text.slice(startIdx + 1, endIdx));
}

module.exports = function(code, name) {
  const config = adapts[name] ? adapts[name] : adapts.common;
  return Object.entries(config).reduce((ans, [key, val]) => {
    const idx = code.indexOf(val);
    if (idx === -1) throw new Error(`${key}值数据未找到，请查看文档：src/adapt/readme.md`);
    if (code.indexOf(val, idx + val.length) > -1) throw new Error(`${key}对应的值${val}在代码中非唯一，请检查！`);
    const fullString = findFullString(code, idx, idx + val.length);
    return { ...ans, [key]: fullString };
  }, {});
}

