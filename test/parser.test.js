const paths = require('@utils/paths');
const fs = require('fs');
const { main, swap, hexnum, combine4, decrypt, encrypt, extrace, init, decode } = require('../src/handler/parser/');
const tsFullPath = paths.exampleResolve('codes', '1-$_ts-full.json');
init(JSON.parse(fs.readFileSync(tsFullPath, 'utf8')));
const gv = require('@src/handler/globalVarible');

describe('test parser common', () => {
  test('test main', () => {
    expect(main('inakaxadalqKlwl{')[0]).toBe('visibilityState');
  });
  test('test swap', () => {
    expect(swap('rpsa')).toBe('pars');
  });
  test('test hexnum', () => {
    expect(hexnum('65466c6f6174')).toBe('eFloat');
  });
  test('test combine4', () => {
    expect(combine4(gv.keys[17])).toEqual([1052594159, -1469862260, 26804995, 67241476]);
  });
  test('test decrypt', () => {
    expect(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX')).toEqual([130, 15, 32, 137, 204, 131, 108, 219, 215, 244, 196, 229, 78, 132, 202, 129, 240, 119, 30, 133, 70, 125, 132, 46]);
  });
  test('test encrypt', () => {
    expect(encrypt(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17])).toEqual([7, 0, 0, 6, 47, 115, 103, 116, 109, 105, 0, 0, 0, 0]);
  });
  test('test extrace', () => {
    const arr = encrypt(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17]);
    expect(extrace(arr)).toEqual([[], [], [47, 115, 103, 116, 109, 105], [], [], [], []]);
  });
  test('test extrace', () => {
    const arr = extrace(encrypt(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17]));
    expect(decode(arr[2])).toBe('/sgtmi');
  });
});
