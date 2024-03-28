const _random = require('lodash/random');
const dataOper = require('./dataOper');
const parser = require('./parser/');
const gv = require('./globalVarible');
const randomUseragent = require('random-useragent');

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
  runTask,
} = parser;

module.exports = class {
  constructor(ts, r2mkaText) {
    parser.init(ts, r2mkaText)
    this.config = {
      'window.navigator.maxTouchPoints': 0,
      'window.eval.toString().length': 33,
      'window.navigator.userAgent': randomUseragent.getRandom(),
      'window.navigator.platform': 'MacIntel',
      'window.name': '$_YWTU=LjFNq_oZCsth6KJ9xHOin6RRhL4fQt7Vsn8YCz9dRjl&$_YVTX=Wa&vdFm=_$hh',
      'window.navigator.battery': {
        charging: true, // 正在充电
        chargingTime: 0, // 距离充满时间
        dischargingTime: Infinity, // 预估可使用时间
        level: 1, // 电量100%
      },
      'window.navigator.connection': {
        downlink: 6.66, // 下行速度
        effectiveType: "4g", // 网络类型
        rtt: 0, // 往返延时
        saveData: false, // 节流模式
      },
      'window.innerHeight': 938,
      'window.innerWidth': 1680,
      'window.outerHeight': 1025,
      'window.outerWidth': 1680,
    }
    this.runTime = Math.floor(new Date().getTime() / 1000); // 运行时间
    this.startTime = this.runTime - 1; // 模拟浏览器启动时间
    this.r2mkaTime = +ascii2string(gv.keys[21]); // r2mka文本解析出来的时间
  }

  run() {
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
            gv.keys[2]
          ),
          encryptMode1(
            xor(
              numarrEncrypt(this[`getBasearr_v${gv.version}`]()),
              gv.keys[2],
              16
            ),
            numarrAddTime(gv.keys[17], this.runTime)[0],
            0
          )
        )],
        numarrAddTime(gv.keys[16], this.runTime)[0]
      )
    );
  }

  getBasearr_v2() {
    // 第2版计算cookie方法
    const name = this.config['window.name'].split('&').reduce((ans, it) => {
      const [key, val] = it.split('=');
      return { ...ans, [key]: val };
    }, {});
    return numarrJoin(
      3,
      numarrJoin(
        1,
        this.config['window.navigator.maxTouchPoints'],
        this.config['window.eval.toString().length'],
        128,
        ...numToNumarr4(uuid(this.config['window.navigator.userAgent'])),
        string2ascii(this.config['window.navigator.platform']),
        ...numToNumarr4(_random(500, 1000)),
        ...execRandomByNumber(),
        0,
        0,
        ...numToNumarr4(Number(hexnum('3136373737323136'))),
        ...numToNumarr4(0),
        ...numToNumarr2(this.config['window.innerHeight']),
        ...numToNumarr2(this.config['window.innerWidth']),
        ...numToNumarr2(this.config['window.outerHeight']),
        ...numToNumarr2(this.config['window.outerWidth']),
      ),
      10, // 下标43
      [
        0, // 运行时代码中传入的初始数组长度，由于传入的是空数组，因此为0
        1, // 任务编号0>one>36>one>2-131的任务列表取得
        ...numToNumarr4(this.r2mkaTime + this.runTime - this.startTime), // ramka串返回的时间 + 当前时间 - 启动时间
        ...numToNumarr4(+ascii2string(gv.keys[19])),
        ...numToNumarr8(Math.floor(Math.random() * 1048575) * 4294967296 + (((this.runTime * 1000) & 4294967295) >>> 0)),
      ],
      7, // 下标63
      [
        ...numToNumarr4(16777216), // gv.cp2取得
        ...numToNumarr4(0), // 任务编号0-0的任务列表取得
        ...numToNumarr2(getFixedNumber()), // 固定值5900
        ...numToNumarr2(46228), // 根据方法的toString()计算
      ],
      0, // 任务编号0>one>63-287的任务列表取得
      [0], // 任务编号0>one>63>one>4-290的任务列表取得
      6, // 下标80
      [ // 编号510方法执行返回
        1,
        ...numToNumarr2(0),
        ...numToNumarr2(0),
        0,
        ...encryptMode2(decrypt(name.$_YWTU || ''), numarrAddTime(gv.keys[16])[0]),
        ...numToNumarr2(+decode(decrypt(name.$_YVTX || ''))),
      ],
      2, // 下标98
      [
        factorial(5) - factorial(3) * 2 + 100, // 100是cp2里取出来的，可能随版本变动
        203, // cp2[76]，检测window.HTMLFormElement是否存在
        102, // cp2[120]，检测document.createElement('from')
        103, // 检测window.top值是否为null
      ],
      9, // 下标104
      [
        0 | 8, // 8为cp2中的值
        ['bluetooth', 'cellular', 'ethernet', 'wifi', 'wimax'].indexOf(this.config['window.navigator.connection'].type) + 1,
      ], 
      13,
      [0],
    )
  }

  getBasearr_v1() {
    // 第1版计算cookie方法
    const { getTaskNumber: gtn } = this;
    return numarrJoin(
      3,
      numarrJoin(
        gtn('0>one>62>one>30-272', 550),
        this.config['window.navigator.maxTouchPoints'],
        this.config['window.eval.toString().length'],
        gtn('0>one>62>one>28-270', 1) | (gtn('0>one>62>one>28-270', 92) << 7),
        ...numToNumarr4(uuid(this.config['window.navigator.userAgent'])),
        string2ascii(this.config['window.navigator.platform']),
        ...numToNumarr4(_random(500, 1000)),
        ...execRandomByNumber(),
        gtn('0>one>62>one>12-246', 28),
        gtn('0>one>62-235', 36),
        ...numToNumarr4(Number(hexnum(gv.cp0_96(6, 76))))
      ),
      10,
      (() => {
        const flag = +ascii2string(gv.keys[24]);
        return [
          flag > 0 && flag < 8 ? 1 : 0,
          13,
          ...numToNumarr4(this.r2mkaTime + this.runTime - this.startTime), // ramka串返回的时间 + 当前时间 - 启动时间
          ...numToNumarr4(+ascii2string(gv.keys[19])),
          ...numToNumarr8(Math.floor(Math.random() * 1048575) * 4294967296 + (((this.runTime * 1000) & 4294967295) >>> 0)),
          flag,
        ];
      })(),
      7,
      [
        ...numToNumarr4(Number(hexnum(gv.cp0_96(6, 76)))),
        ...numToNumarr4(gtn('0-0', 92)),
        ...numToNumarr2(getFixedNumber()),
        ...numToNumarr2(46228), // 根据方法的toString()计算
      ],
      0,
      [0],
      6,
      (() => {
        const name = this.config['window.name'].split('&').reduce((ans, it) => {
          const [key, val] = it.split('=');
          return { ...ans, [key]: val };
        }, {});
        return [
          1, 0, 0, 0, 0, 0,
          ...encryptMode2(decrypt(name.$_YWTU || ''), numarrAddTime(gv.keys[16])[0]),
          ...numToNumarr2(+decode(decrypt(name.$_YVTX || ''))),
        ];
      })(),
      2,
      [
        factorial(5) - factorial(3) * 2,
        fibonacci(11) + 37,
        factorial(6) / 4,
        11,
      ],
      9,
      (() => {
        const { connType } = this.config['window.navigator.connection'];
        const { charging, chargingTime, level } = this.config['window.navigator.battery']
        const connTypeIdx = ['bluetooth', 'cellular', 'ethernet', 'wifi', 'wimax'].indexOf(connType) + 1;
        let oper = 0;
        if (level) oper |= 2;
        if (charging) oper |= 1;
        if (connTypeIdx !== undefined) oper |= 8
        return [
          oper,
          level * 100,
          chargingTime >> 8,
          chargingTime & 255,
          connTypeIdx,
        ]
      })(),
      13,
      [0],
    );
  }

  getTaskNumber(name, idx) {
    return gv.r2mka(name).taskarr[idx];
  }
}
