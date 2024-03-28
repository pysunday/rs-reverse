const gv = require('../utils/initGv')(1);
const { main, swap4, swap2, hexnum, stringReverse, init } = gv.utils;

const valueMap = {
  'visibilityState': main(gv.cp0_96(6, 69)).join(),
  'parseFloat': swap4(gv.cp0_96(5, 18)) + hexnum(gv.cp0_96(8, 30)),
  '11.678': hexnum(gv.cp0_96(7, 17)),
  '1.234': swap4(gv.cp0_96(8, 36)),
  'captureStackTrace': main(gv.cp0_96(7, 63))[0],
  '16777216': hexnum(gv.cp0_96(6, 76)),
  'navigator': swap2(gv.cp0_96(10, 63)),
  'getBattery': gv.cp0_96(4, 6) + gv.cp0_96(4, 55) + stringReverse(gv.cp0_96(6, 55)),
}

test('test cp0_96', () => {
  Object.entries(valueMap).forEach(([tb, ex]) => {
    expect(tb).toBe(ex);
  })
});
