const gv = require('@src/handler/globalVarible');

function (text) {
  let one, two, three, four, idx = 0, dkey = gv.decryptKeys[5];
  const flag = dkey[text.charCodeAt(idx++)];
  if (flag <= 80) return flag;
  if (flag == 81) {
    return dkey[text.charCodeAt(idx++)] + 80;
  }
  if (flag == 82) {
    one = dkey[text.charCodeAt(idx++)];
    two = dkey[text.charCodeAt(idx++)];
    return one + two * 86 + 165;
  }
  if (flag == 83) {
    one = dkey[text.charCodeAt(idx++)];
    two = dkey[text.charCodeAt(idx++)];
    three = dkey[text.charCodeAt(idx++)];
    return one + two * 86 + three * 86 * 86 + 7560;
  }
  if (flag == 84) {
    one = dkey[text.charCodeAt(idx++)];
    two = dkey[text.charCodeAt(idx++)];
    three = dkey[text.charCodeAt(idx++)];
    four = dkey[text.charCodeAt(idx++)];
    return one + two * 86 + three * 86 * 86 + four * 86 * 86 * 86 + 643615;
  }
}
