// 数字数组拼接
module.exports = function(...numarrs) {
  return numarrs.reduce((ans, it) => {
    if (ans.length === 0) return Array.isArray(it) ? it : [it];
    if (!Array.isArray(it)) return [...ans, it]
    return [...ans, it.length, ...it];
  }, []);
}
