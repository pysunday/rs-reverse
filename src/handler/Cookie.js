const _random = require('lodash/random');
const dataOper = require('./dataOper');
const parser = require('./parser/');
const gv = require('./globalVarible');

const {
  factorial,
  fibonacci,
  numToNumarr2,
  numToNumarr4,
  numToNumarr8,
  uuid,
  string2ascii,
  execRandomByNumber,
  hexnum,
  ascii2string,
  getFixedNumber,
  numarrAddTime,
  decode,
  decrypt,
  encryptMode1,
  encryptMode2,
  numarrJoin,
  numarr2string,
  numarrEncrypt,
  xor,
} = parser;

module.exports = class {
  constructor(ts) {
    parser.init(ts)
    this.config = {
      'window.navigator.maxTouchPoints': 0,
      'window.eval.toString().length': 33,
      'window.navigator.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      'window.navigator.platform': 'MacIntel',
      'window.name': '$_YWTU=LjFNq_oZCsth6KJ9xHOin6RRhL4fQt7Vsn8YCz9dRjl&$_YVTX=Wa&vdFm=_$hh',
    }
    this.runTime = Math.floor(new Date().getTime() / 1000); // 运行时间
    this.startTime = this.runTime - 1; // 模拟浏览器启动时间
    this.r2mkaTime = +ascii2string(gv.keys[21]); // r2mka文本解析出来的时间
  }

  run() {
    const { getTaskNumber: gtn } = this;
    const cookieBaseArr = numarrJoin(
      gv.cp2[58],
      this.getSubOne(),
      gv.cp2[0],
      this.getSubTwo(),
      gv.cp2[23],
      this.getSubThree(),
      gtn('0>one>63-287', 4),
      [gtn('0>one>63>one>4-290', 1)],
      gv.cp2[55],
      this.getSubFour(),
      gv.cp2[56],
      this.getSubFive(),
      gv.cp2[6],
      [gv.cp2[52], 0], // 网络类型检测通过
      gv.cp2[39],
      [gtn('0>one>55>one>3-189', 6)],
    )
    return '0' + numarr2string(
      encryptMode1([
        ...numToNumarr4(this.r2mkaTime),
        ...numarrJoin(
          numarrJoin(
            gv.r2mka("0>one>32-126").taskarr[73],
            numarrJoin(
              numToNumarr4([this.r2mkaTime, this.startTime]),
              string2ascii(gv.cp0[399])
            ),
            gv.keys[gv.cp2[56]]
          ),
          encryptMode1(
            xor(
              numarrEncrypt(cookieBaseArr),
              gv.keys[gv.cp2[56]],
              gv.cp2[2]
            ),
            numarrAddTime(gv.keys[gv.cp2[24]], this.runTime)[0],
            0
          )
        )],
        numarrAddTime(gv.keys[gv.cp2[2]], this.runTime)[0]
      )
    );
  }

  getSubOne() {
    const { getTaskNumber: gtn } = this;
    const pfarr = string2ascii(this.config['window.navigator.platform']);
    return [
      gtn('0>one>62>one>30-272', 550),
      this.config['window.navigator.maxTouchPoints'],
      this.config['window.eval.toString().length'],
      gtn('0>one>62>one>28-270', 1) | (gtn('0>one>62>one>28-270', 92) << gv.cp2[23]),
      ...numToNumarr4(uuid(this.config['window.navigator.userAgent'])),
      pfarr.length,
      ...pfarr,
      ...numToNumarr4(_random(500, 1000)),
      ...execRandomByNumber(),
      gtn('0>one>62>one>12-246', 28),
      gtn('0>one>62-235', 36),
      ...numToNumarr4(Number(hexnum(gv.cp0_96(6, 76))))
    ]
  }

  getSubTwo() {
    const flag = +ascii2string(gv.keys[24]);
    return [
      flag > 0 && flag < gv.cp2[52] ? 1 : 0,
      gv.cp2[39],
      ...numToNumarr4(this.r2mkaTime + this.runTime - this.startTime), // ramka串返回的时间 + 当前时间 - 启动时间
      ...numToNumarr4(+ascii2string(gv.keys[gv.cp2[15]])),
      ...numToNumarr8(Math.floor(Math.random() * gv.cp2[207]) * gv.cp2[16] + (((this.runTime * 1000) & gv.cp2[17]) >>> 0)),
      flag,
    ]
  }

  getSubThree() {
    const { getTaskNumber: gtn } = this;
    return [
      ...numToNumarr4(Number(hexnum(gv.cp0_96(6, 76)))),
      ...numToNumarr4(gtn('0-0', 92)),
      ...numToNumarr2(getFixedNumber()),
      ...numToNumarr2(46228), // 根据方法的toString()计算
    ];
  }

  getSubFour() {
    const keyarr = numarrAddTime(gv.keys[gv.cp2[2]])[0];
    const name = this.config['window.name'].split('&').reduce((ans, it) => {
      const [key, val] = it.split('=');
      return { ...ans, [key]: val };
    }, {});
    return [
      1, 0, 0, 0, 0, 0,
      ...encryptMode2(decrypt(name.$_YWTU), keyarr),
      ...numToNumarr2(+decode(decrypt(name.$_YVTX))),
    ];
  }

  getSubFive() {
    return [
      factorial(gv.cp2[29]) - factorial(gv.cp2[58]) * gv.cp2[56],
      fibonacci(gv.cp2[57]) + gv.cp2[43],
      factorial(gv.cp2[55]) / gv.cp2[19],
      gv.cp2[57],
    ]
  }

  getTaskNumber(name, idx) {
    return gv.r2mka(name).taskarr[idx];
  }
}
