const gv = require('@src/handler/globalVarible');

module.exports = {
  '0>one>21-23': (num) => {
    return Math.abs(num) % gv.cp2[52];
  }
}
