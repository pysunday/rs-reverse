const getScd = require('./getScd');

module.exports = function (arr, scd) {
  const knarr = [ ...arr ];
  let len = knarr.length, idx;
  const _scd = typeof scd === 'function' ? scd : getScd(scd);
  while (len-- > 1) {
    idx = _scd() % len;
    const temp = knarr[len];
    knarr[len] = knarr[idx];
    knarr[idx] = temp;
  }
  return knarr;
}
