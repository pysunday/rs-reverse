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
  execNumberByTime,
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

const developConfig = {
  // 开发时用的配置，比如时间值固定、随机数固定等
  // 'window.innerWidth': 150,
  // 'window.outerWidth': 1336,
  // currentTime: 1711730658454,
  // r2mkaTime: 1711712705,
  // startTime: 1711730659,
  // runTime: 1711730659,
  // formatUid: 58854,
  // random: 0.123,
  execNumberByTime: 1778,
}

module.exports = class {
  constructor(ts, r2mkaText) {
    parser.init(ts, r2mkaText)
    const current = new Date().getTime() + 1000;
    this.config = {
      'window.navigator.maxTouchPoints': 0,
      'window.eval.toString().length': 33,
      'window.navigator.userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
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
      'window.document.hidden': false,
      formatUid: 46228, // 代码特征码
      currentTime: current, // 完整的时间戳
      runTime: Math.floor(current / 1000), // 运行时间
      startTime: Math.floor(current / 1000) - 1, // 模拟浏览器启动时间
      r2mkaTime: +ascii2string(gv.keys[21]), // r2mka文本解析出来的时间
      random: null, // 代替Math.random方法返回值
      execNumberByTime: execNumberByTime(), // 固定时间内的循环运行次数
      ...developConfig,
    }
    // console.log(this.config);
  }

  run() {
    const basearr = this[`getBasearr_v${gv.version}`]();
    const nextarr = numarrJoin(
      numarrJoin(
        2,
        numToNumarr4([this.config.r2mkaTime, this.config.startTime]),
        gv.keys[2]
      ),
      encryptMode1(
        xor(
          numarrEncrypt(basearr),
          gv.keys[2],
          16
        ),
        numarrAddTime(gv.keys[17], this.config.runTime, this.config.random)[0],
        0
      )
    )
    return '0' + numarr2string(
      encryptMode1(
        [
          ...numToNumarr4(uuid(nextarr)),
          ...nextarr
        ],
        numarrAddTime(gv.keys[16], this.config.runTime, this.config.random)[0],
        1,
        this.config.random
      )
    );
  }

  getBasearr_v2() {
    // 第2版计算cookie基础数组，cookie位数257位(当gv.keys[22]存在值)
    return numarrJoin(
      3,
      numarrJoin(
        1,
        this.config['window.navigator.maxTouchPoints'],
        this.config['window.eval.toString().length'],
        128,
        ...numToNumarr4(uuid(this.config['window.navigator.userAgent'])),
        string2ascii(this.config['window.navigator.platform']),
        ...numToNumarr4(this.config.execNumberByTime),
        ...execRandomByNumber(98, this.config.random),
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
      (() => {
        const flag = +ascii2string(gv.keys[24]);
        return [
          flag > 0 && flag < 8 ? 1 : 0,
          13,
          ...numToNumarr4(this.config.r2mkaTime + this.config.runTime - this.config.startTime), // ramka串返回的时间 + 当前时间 - 启动时间
          ...numToNumarr4(+ascii2string(gv.keys[19])),
          ...numToNumarr8(Math.floor((this.config.random || Math.random()) * 1048575) * 4294967296 + (((this.config.currentTime + 1) & 4294967295) >>> 0)),
          flag,
        ];
      })(),
      7, // 下标64
      [
        ...numToNumarr4(16777216), // gv.cp2取得
        ...numToNumarr4(0), // 任务编号0-0的任务列表取得
        ...numToNumarr2(getFixedNumber()), // 固定值5900
        ...numToNumarr2(this.config.formatUid), // 根据方法的toString()计算, 使用了$_ts.aebi[1]作为任务的方法，
      ],
      0, // 任务编号0>one>63-287的任务列表取得
      [0], // 任务编号0>one>63>one>4-290的任务列表取得
      6, // 下标81
      [ // 编号510方法执行返回
        1,
        ...numToNumarr2(0),
        ...numToNumarr2(0),
        this.config['window.document.hidden'] ? 0 : 1,
        ...encryptMode2(decrypt(ascii2string(gv.keys[22])), numarrAddTime(gv.keys[16])[0]),
        ...numToNumarr2(+decode(decrypt(ascii2string(gv.keys[22])))),
      ],
      2, // 下标99
      (() => {
        const taskmap = {}
        runTask('0>one>71>one>4-342', [taskmap]);
        return [29, 30, 31, 32].map(it => {
          return taskmap[ascii2string(gv.keys[it])]();
        })
      })(),
      9, // 下标105
      (() => { // 编号133方法
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
    )
  }

  getBasearr_v1() {
    // 第1版计算cookie基础数组，cookie位数236位
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
