module.exports = function(scd) {
  const his = [scd];
  return function(look) {
    if (look) {
      console.log(his.length, his);
      return
    }
    scd = 15679 * (scd & 65535) + 2531011;
    his.push(scd);
    return scd
  }
}
