const unescape = require('./unescape');

module.exports = function findFullString(text, sub) {
  const idx = text.indexOf(sub);
  if (idx === -1) throw new Error(`文本中未找到"${sub}"子字符串`);
  if (text.indexOf(sub, idx + sub.length) > -1) throw new Error(`文本中存在多处"${sub}"子字符串`);
  let start = idx
    , end = idx + sub.length
    , startIdx
    , endIdx;
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
