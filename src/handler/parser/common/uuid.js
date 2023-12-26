// 处理字符串或者数字数字返回唯一标识
const gv = require('@src/handler/globalVarible');

function str2code(str) {
  str = unescape(encodeURIComponent(str));
  return str.split('').map(it => it.charCodeAt())
}

module.exports = function (numarr) {
  if (typeof numarr === 'string') numarr = str2code(numarr);
  let val = 0 ^ gv.cp2[41];
  for (let i = 0; i < numarr.length; ) {
    val = val >>> gv.cp2[52] ^ gv.bignum[(val ^ numarr[i++]) & gv.cp2[34]];
  }
  return (val ^ gv.cp2[41]) >>> 0;
}
