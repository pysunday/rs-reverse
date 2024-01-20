const gv = require('../utils/initGv')();
const {
  main,
  swap4,
  swap2,
  hexnum,
  combine4,
  decrypt,
  bitwiseTwoNumarr,
  extrace,
  decode,
  uuid,
  numToNumarr4,
  numToNumarr8,
  execRandomByNumber,
  getFixedNumber,
  numarrAddTime,
  numarrEncrypt,
  encryptMode1,
  encryptMode2,
} = gv.utils;

describe('test parser common', () => {
  test('test main', () => {
    expect(main('inakaxadalqKlwl{')[0]).toBe('visibilityState');
  });
  test('test swap', () => {
    expect(swap4('rpsa')).toBe('pars');
    expect(swap2('nvagitaro')).toBe('navigator');
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
  test('test bitwiseTwoNumarr', () => {
    expect(bitwiseTwoNumarr(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17])).toEqual([7, 0, 0, 6, 47, 115, 103, 116, 109, 105, 0, 0, 0, 0]);
  });
  test('test extrace', () => {
    const arr = bitwiseTwoNumarr(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17]);
    expect(extrace(arr)).toEqual([[], [], [47, 115, 103, 116, 109, 105], [], [], [], []]);
  });
  test('test decode', () => {
    const arr = extrace(bitwiseTwoNumarr(decrypt('GGZGPQnkMJBUeWs2sLstGIr6oLYDI3AX'), gv.keys[17]));
    expect(decode(arr[2])).toBe('/sgtmi');
  });
  test('test uuid', () => {
    expect(uuid("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")).toBe(2290443310);
  });
  test('test numToNumarr4', () => {
    const ua = uuid("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
    const numarr = numToNumarr4(ua);
    expect(numarr).toEqual([136, 133, 100, 46]);
    expect(numToNumarr4.reverse(numarr)).toBe(ua);
  });
  test('test numToNumarr8', () => {
    expect(numToNumarr8(3127628117497590)).toEqual([0, 11, 28, 143, 170, 238, 214, 246]);
  });
  test('test getFixedNumber', () => {
    expect(getFixedNumber()).toBe(5900);
  });
  test('test numarrAddTime', () => {
    const [arr, time] = numarrAddTime([1, 2, 3, 4]);
    const [rarr, rtime] = numarrAddTime.reverse(arr);
    expect(time).toBe(rtime);
    expect(rarr).toEqual([1, 2, 3, 4]);
  });
  test('test modeEncrypt', () => {
    const arr = numarrAddTime(gv.keys[gv.cp2[2]])[0];
    expect(encryptMode2(decrypt('LjFNq_oZCsth6KJ9xHOin6RRhL4fQt7Vsn8YCz9dRjl'), arr)).toEqual([166, 66, 100, 55, 95, 100, 1, 0]);
  });
});
