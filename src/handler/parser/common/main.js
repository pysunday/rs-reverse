// 将字符串解码成字符数组
module.exports = function(str) {
  if (!str) return [];
  const splitStr = String.fromCharCode(96);
  const ans = []
  const firstCode = str.charCodeAt(0) - 97;
  for (let idx = 1; idx < str.length; ++idx) {
    let curr = str.charCodeAt(idx);
    if (curr >= 40 && curr < 92) {
      curr += firstCode;
      if (curr >= 92) curr -= 52;
    } else if (curr >= 97 && curr < 127) {
      curr += firstCode;
      if(curr >= 127) curr -= 30;
    }
    ans[idx - 1] = curr;
  }
  return String.fromCharCode(...ans).split(splitStr);
}
