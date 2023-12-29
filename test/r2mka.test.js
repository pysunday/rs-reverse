const paths = require('@utils/paths');
const fs = require('fs');
const {
  init,
  ascii2string,
} = require('../src/handler/parser/');
const tsFullPath = paths.exampleResolve('codes', '1-$_ts-full.json');
init(JSON.parse(fs.readFileSync(tsFullPath, 'utf8')));
const gv = require('@src/handler/globalVarible');

const valueMap = {
  '1698026159': ascii2string(gv.keys[gv.cp2[101]]),
  '2098631147': ascii2string(gv.keys[gv.cp2[15]]),
  '4': ascii2string(gv.keys[gv.cp2[4]]),
  '47': ascii2string(gv.keys[gv.cp2[35]]),
  '52': ascii2string(gv.keys[gv.cp2[81]]),
}

test('test r2mka', () => {
  Object.entries(valueMap).forEach(([tb, ex]) => {
    expect(tb).toBe(ex);
  })
});
