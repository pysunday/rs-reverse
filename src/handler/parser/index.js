const gv = require('../globalVarible');
const common = require('./common');

function init(ts) {
  gv.setAttr('utils', common);
  gv.setAttr('ts', ts);
  require('./r2mka').init();
  require('./tscp').init();
  require('./tscd').init();
  require('./bignum').init();
}

module.exports = {
  ...common,
  init,
}

