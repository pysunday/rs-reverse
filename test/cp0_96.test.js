const paths = require('@utils/paths');
const fs = require('fs');
const { main, swap, hexnum, init } = require('../src/handler/parser/');
const tsFullPath = paths.exampleResolve('codes', '1-$_ts-full.json');
init(JSON.parse(fs.readFileSync(tsFullPath, 'utf8')));
const gv = require('@src/handler/globalVarible');
/*
    setData('G_$cc', cp0[0]);
    setData('G_$ia', cp0[1]);
    setData('G_$ga', cp0[2]);
    setData('G_$_7', cp0[3]);
    setData('G_$_3', cp0[4]);
    setData('G_$jY', cp0[5]);
    setData('G_$ad', cp0[6]);
    setData('G_$bJ', cp0[7]);
    setData('G_$eh', cp0[8]);
    setData('G_$bv', cp0[9]);
    setData('G_$bO', cp0[10]);
    setData('G_$_x', cp0[11]);
    setData('G_$dL', cp0[12]);
    setData('G_$bn', cp0[13]);
*/

const valueMap = {
  'visibilityState': main(gv.cp0_96(6, 69)).join(),
  'parseFloat': swap(gv.cp0_96(5, 18)) + hexnum(gv.cp0_96(8, 30)),
  '11.678': hexnum(gv.cp0_96(7, 17)),
  '1.234': swap(gv.cp0_96(8, 36)),
  'captureStackTrace': main(gv.cp0_96(7, 63))[0],
}

test('test cp0_96', () => {
  Object.entries(valueMap).forEach(([tb, ex]) => {
    expect(tb).toBe(ex);
  })
});
