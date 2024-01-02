// 转译还原
module.exports = function(text) {
  try {
    try {
      return JSON.parse('"' + text + '"')
    } catch (e) {
      return eval('("' + text + '")')
    }
  } catch (e) {
    return text
  }
}
