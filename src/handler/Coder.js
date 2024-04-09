const getScd = require('./getScd');
const globaltext = require('./globaltext');
const dataOper = require('./dataOper');
const arraySwap = require('./arraySwap');
const initTs = require('./initTs');
const findFullString = require('@/utils/findFullString');
const gv = require('@src/handler/globalVarible');

module.exports = class {
  constructor(ts, immucfg) {
    this.startTime = new Date().getTime();
    this.$_ts = initTs(ts, immucfg || gv.config.immucfg);
    this.scd = getScd(this.$_ts.nsd);
    this.keynames = this.$_ts.cp[1];
    this.keycodes = []
    this.optext = globaltext();
    this.opmate = this.mateOper();
    this.opdata = dataOper();
    this.r2mkaText = null;
    this.immucfg = immucfg || gv.config.immucfg;
    this.functionsPushStart = { 1: 938, 2: 0, 3: 0, 4: 0 }; // 生成方法排序数据的开始下标, 938为键值为348所命中的代码中获得
    this.functionsNameSort = []; // 存放vm代码中定义的方法，用于计算代码特征码使用
    this.mainFunctionIdx = null; // 主函数（编号为1）在代码中的开始与结束下标
  }

  run() {
    const codeArr = this.parseGlobalText1();
    codeArr.push(this.parseGlobalText2());
    codeArr.push("})(", '$_ts', ".scj,", '$_ts', ".aebi);");
    const codeStr = codeArr.join('');
    if (!this.immucfg.globalText3) {
      const subStr = `r2mKa${codeStr.includes('r2mKa0') ? '0' : '1'}`;
      this.immucfg.globalText3 = findFullString(codeStr, subStr);
      gv._setAttr('config.immucfg', this.immucfg);
    }
    this.parseTs(codeStr);
    this.endTime = new Date().getTime();
    return {
      code: codeStr,
      $_ts: this.$_ts,
    }
  }

  parseTs(codeStr) {
    this.$_ts.cp[4] = new Date().getTime() - this.startTime;
    let flag = 0;
    for (let i = 0; i < codeStr.length; i += 100) {
      flag += codeStr.charCodeAt(i)
    }
    this.$_ts.cp[3] = flag;
    this.$_ts.lcd = undefined;
    this.$_ts.nsd = undefined;
  }

  parseGlobalText2() {
    const { opmate, opdata, optext, keynames, getCurr } = this;
    optext.init(0, this.immucfg.globalText2);
    opdata.init();
    opmate.init();
    opmate.setMate('G_$ht', true);
    const keycodes = optext.getLine(optext.getCode()).split(String.fromCharCode(257));
    return this.special(optext.getList().data, keycodes, this.keynames).join('');
  }

  special(list, keycodes, keynames) {
    const ans = [];
    for (let i = 0; i < list.length - 1; i += 2) {
      ans.push(keycodes[list[i]], keynames[list[i + 1]])
    }
    ans.push(keycodes[list[list.length - 1]])
    return ans;
  }

  parseGlobalText1(codeArr = []) {
    const { opmate, opdata, optext, keynames, getCurr } = this;
    optext.init(0, this.immucfg.globalText1);
    opdata.init({ arr8: [4, 16, 64, 256, 1024, 4096, 16384, 65536] });
    opmate.init();
    opmate.setMate('G_$e4', true);
    opmate.setMate('G_$$c', true);
    opmate.setMate('G_$dK', true);
    opmate.setMate('G_$kv', true);
    opmate.setMate('G_$cR', true);
    opmate.setMate();
    this.keycodes.push(...optext.getLine(optext.getCode() * 55295 + optext.getCode()).split(String.fromCharCode(257)));
    opmate.setMate();
    this.r2mkaText = optext.getLine(optext.getCode() * 55295 + optext.getCode())
    this.keycodes.push(this.r2mkaText);
    opmate.setMate('G_$gG', true);
    for (let i = 0; i < opmate.getMateOri('G_$gG'); i++) {
      this.gren(i, codeArr);
    }
    codeArr.push('}}}}}}}}}}'.substr(opmate.getMateOri('G_$gG') - 1));
    this.mainFunctionIdx.push(codeArr.join('').length);
    return codeArr;
  }

  gren(current, codeArr) {
    const { opmate, opdata, optext, mate, scd, $_ts, keycodes, keynames } = this;
    opmate.setMate('_$ku');
    opmate.setMate('_$$6');
    opmate.setMate('_$b$');
    opmate.setMate('_$$q');
    opmate.setMate('_$jw');
    opmate.setMate('_$$g');
    opmate.setMate('_$cu');
    opmate.setMate('_$aw');
    const codeFirst = '\n\n\n\n\n';
    codeArr.push(codeFirst.substring(0, scd() % 5));
    opdata.setData('_$_K', optext.getList().data)
    opdata.setData('_$$H', optext.getList().data)
    const arr2two = optext.getList().data.reduce((ans, item, idx) => {
      if (idx % 2 === 0) {
        ans.prev = item;
      } else {
        ans.arr.push([ans.prev, item]);
      }
      return ans;
    }, { arr: [] , prev: undefined}).arr
    opdata.setData('_$$w', arraySwap(arr2two, scd));
    opmate.setMate('_$bf');
    opdata.setData('_$g$', optext.getList().data);
    $_ts.aebi[current] = opdata.getData('_$g$')
    opmate.setMate('_$e4');
    function func2(num) {
      const data = []
      for (let i = 0; i < num; i++) {
        const item = optext.getList()
        data.push(item.data)
      }
      return data
    }
    opdata.setData( '_$cS', arraySwap(
      func2(opmate.getMateOri('_$e4')),
      scd
    ));
    opmate.setMate('_$$c');
    opdata.setData('_$$k', func2(opmate.getMateOri('_$$c')));
    if (current) {
      if (this.mainFunctionIdx === null) this.mainFunctionIdx = [codeArr.join('').length];
      codeArr.push("function ", opmate.getMate('_$jw'), "(", opmate.getMate('_$$6'));
      opdata.getData('_$_K').forEach(it => codeArr.push(",", keynames[it]));
      codeArr.push("){");
    } else {
      codeArr.push("(function(", opmate.getMate('G_$dK'), ",", opmate.getMate('G_$kv'), "){var ", opmate.getMate('_$$6'), "=0;");
    }
    const functionsNameMap = opdata.getData('_$$w').reduce((ans, [key1, key2], idx) => {
      const arr = ["function ", keynames[key1], "(){var ", opmate.getMate('_$$q'), "=[", key2, "];Array.prototype.push.apply(", opmate.getMate('_$$q'), ",arguments);return ", opmate.getMate('_$$g'), ".apply(this,", opmate.getMate('_$$q'), ");}"]
      codeArr.push(...arr);
      return {
        ...ans,
        [keynames[key1]]: arr.join(''),
      }
    }, {});
    opdata.getData('_$cS').forEach(item => {
      for (let i = 0; i < item.length - 1; i += 2) {
        codeArr.push(keycodes[item[i]], keynames[item[i + 1]])
      }
      codeArr.push(keycodes[item[item.length - 1]])
    })
    
    if (opdata.getData('_$$H').length) {
      opdata.getData('_$$H').forEach((it, idx) => codeArr.push(idx ? "," : 'var ', keynames[it]));
      codeArr.push(';');
    }
    codeArr.push("var ", opmate.getMate('_$b$'), ",", opmate.getMate('_$cu'), ",", opmate.getMate('_$ku'), "=");
    codeArr.push(opmate.getMate('_$$6'), ",", opmate.getMate('_$aw'), "=", opmate.getMate('G_$kv'), "[", current, "];");
    codeArr.push("while(1){", opmate.getMate('_$cu'), "=", opmate.getMate('_$aw'), "[", opmate.getMate('_$ku'), "++];");
    codeArr.push("if(", opmate.getMate('_$cu'), "<", opmate.getMateOri('_$bf'), "){");
    if ([1, 2, 3, 4].includes(current)) {
      this.functionsSort(current, functionsNameMap);
    }
    const codelist = this.grenIfelse(0, opmate.getMateOri('_$bf'), []);
    codeArr.push(...codelist);
    codeArr.push("}else ", ';', '}');
  }

  functionsSort(current, functionsNameMap) {
    const start = this.functionsPushStart[current];
    const { opdata, opmate } = this
    this.$_ts.aebi[current].slice(start, start + opdata.getData('_$$w').length).forEach(idx => {
      const numarr = opdata.getData('_$$k')[idx];
      if (!numarr || numarr.length !== 5) throw new Error('');
      const name = this.keynames[numarr[3]];
      this.functionsNameSort.push({
        name,
        current,
        code: functionsNameMap[name],
      });
    })
  }

  grenIfelse(start, end, codeArr) {
    const { opdata, opmate } = this
    const arr8 = opdata.getData('arr8')
    let text;
    let diff = end - start;
    if (diff == 0) {
      return codeArr;
    } else if (diff == 1) {
      this.grenIfElseAssign(start, codeArr);
    } else if (diff <= 4) {
      text = "if(";
      end--;
      for (; start < end; start++) {
        codeArr.push(text, opmate.getMate('_$cu'), "===", start, "){");
        this.grenIfElseAssign(start, codeArr);
        text = "}else if(";
      }
      codeArr.push("}else{");
      this.grenIfElseAssign(start, codeArr);
      codeArr.push("}");
    } else {
      const step = arr8[arr8.findIndex(it => diff <= it) - 1] || 0;
      text = "if(";
      for (; start + step < end; start += step) {
        codeArr.push(text, opmate.getMate('_$cu'), "<", start + step, "){");
        this.grenIfelse(start, start + step, codeArr);
        text = "}else if(";
      }
      codeArr.push("}else{");
      this.grenIfelse(start, end, codeArr);
      codeArr.push("}");
    }
    return codeArr;
  }
  grenIfElseAssign(start, codeArr) {
    const { opdata, keynames, keycodes } = this;
    const arr = opdata.getData('_$$k')[start];
    const len = arr.length - (arr.length % 2);
    for (let i = 0; i < len; i += 2) {
      codeArr.push(keycodes[arr[i]], keynames[arr[i + 1]]);
    }
    arr.length != len ? codeArr.push(keycodes[arr[len]]) : 0;
  }

  mateOper() {
    const { keynames, optext } = this;
    let mate, mateOri;
    function init() {
      mate = {};
      mateOri = {};
    }
    init();
    return {
      setMate(key='UNSET', isNotCover = false) {
        if (isNotCover && key !== 'UNSET' && key in mateOri) throw Error(`关键词键${key}重复定义`);
        mateOri[key] = optext.getCode();
        mate[key] = keynames[mateOri[key]];
        // console.log(mateOri[key], optext.getCurr() - 1, key, '===>', mate[key]);
      },
      getMate(key) {
        if (!(key in mate)) throw Error(`关键词键${key}未定义`);
        return mate[key];
      },
      getMateOri(key) {
        if (!(key in mateOri)) throw Error(`关键词键${key}未定义`);
        return mateOri[key];
      },
      getAllMate() {
        return Object.keys(mateOri).map(key => [key, mateOri[key], mate[key]])
      },
      init,
    }
  }
}

