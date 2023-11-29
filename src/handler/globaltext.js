module.exports = function(cursor, globalText) {
  function charCodeByGlobalText(idx) {
    return globalText.charCodeAt(idx);
  }
  function getCurr(step = 0) {
    cursor += step;
    return cursor;
  }
  function getCode(step = 0) {
    cursor += step;
    return charCodeByGlobalText(cursor++);
  }
  function setCurr(newCursor) {
    cursor = newCursor;
  }
  function setText(newGlobalText) {
    globalText = newGlobalText;
  }
  function getList(step = 0) {
    cursor += step;
    const len = charCodeByGlobalText(cursor);
    return {
      data: new Array(len).fill(-1).map((_, idx) => charCodeByGlobalText(cursor + idx + 1)),
      cursor, // 当前游标
      next: setCurr(cursor + len + 1), // 下一段数据游标
    }
  }
  function getLine(nextCursor) {
    const data = globalText.substr(cursor, nextCursor);
    cursor += nextCursor;
    return data;
  }
  function init(newCursor, newText) {
    newCursor !== undefined && setCurr(newCursor);
    newText !== undefined && setText(newText);
  }
  return {
    getCode,
    getList,
    getLine,
    getCurr,
    setCurr,
    setText,
    init,
  }
}
