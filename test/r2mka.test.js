const gv = require('../utils/initGv');
const { ascii2string } = gv.utils;

const valueMap = {
  '1698026159': ascii2string(gv.keys[gv.cp2[101]]),
  '2098631147': ascii2string(gv.keys[gv.cp2[15]]),
  '4': ascii2string(gv.keys[gv.cp2[4]]),
  '47': ascii2string(gv.keys[gv.cp2[35]]),
  '52': ascii2string(gv.keys[gv.cp2[81]]),
  '_$dV': ascii2string(gv.keys[gv.cp2[146]]),
  '_$_i': ascii2string(gv.keys[gv.cp2[70]]),
  '_$hv': ascii2string(gv.keys[gv.cp2[1]]),
  '_$go': ascii2string(gv.keys[gv.cp2[48]]),
}

test('test r2mka', () => {
  Object.entries(valueMap).forEach(([tb, ex]) => {
    expect(tb).toBe(ex);
  })
});
