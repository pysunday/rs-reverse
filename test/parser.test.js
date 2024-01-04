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
  test('test execRandomByNumber', () => {
    const randoms = [0.37630721305483794,0.2049460014355331,0.03410129090487546,0.2559079515317211,0.8377333429169194,0.619292978894294,0.4764635791178553,0.11004709981352878,0.8170060761966771,0.8912536097378767,0.3429872257409361,0.5367431913317162,0.1448222378776065,0.13721258163260086,0.4481790608416749,0.04311100885930985,0.6479884219882253,0.9273382739877349,0.3772136159635484,0.7717630008212142,0.42930838879719513,0.9985907486817889,0.5120853266504071,0.6329456412698085,0.38321486257144755,0.5695697450388872,0.3465729558019228,0.8778743938498155,0.024480669878132133,0.9070571729910759,0.8364410662648827,0.9669481262609505,0.07964482428249209,0.5297012796809408,0.21707900074248832,0.9188445039067206,0.8891992862516525,0.5850359934249489,0.527957313371116,0.37782459814806235,0.9753371617969784,0.9583194759953719,0.20562520266687168,0.6543535471216768,0.9183569514304248,0.6891275630046727,0.15242546632122167,0.4310357539068497,0.3027770541955994,0.13451123317248914,0.6203119685550011,0.6827551212241167,0.3073104017788997,0.9338556600045314,0.3722074026925808,0.43574057511654285,0.5384535459384472,0.3337761997946602,0.19885586866091054,0.3508775524265033,0.5119992383579299,0.36780327787218337,0.42221833899684724,0.11657126994371492,0.9298990516926506,0.0321849565507113,0.32944413386321036,0.14344209098548966,0.46021855121620003,0.8499248665702428,0.3368607733729687,0.2841884826356751,0.2750956232497943,0.06926311510145133,0.6381030029388948,0.05110415814304714,0.08773716922264008,0.021305098235796294,0.4359464033542948,0.6969103629361093,0.7713124866246208,0.5982446587781842,0.19015508004688697,0.5934645228072788,0.99154595778769,0.6112663700541248,0.4665216313510534,0.6221792047459951,0.8294207139375269,0.9589407138679342,0.11675372570297649,0.007631410573399888,0.40959542468137955,0.41510808627149975,0.5123086579716352,0.7497877285646639,0.10999323473542444,0.9814640696203702];
    expect(execRandomByNumber(undefined, randoms)).toEqual([49, 9]);
  })
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
