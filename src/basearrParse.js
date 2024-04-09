const logger = require('@utils/logger');
const error = require('@utils/error');

const parseBlock = (item, id) => {
  if (typeof id !== 'number') return { ...item, show: id };
  const val = item.val;
  let oper = 0;
  const next = (val) => {
    switch(val.type) {
      case 'div':
        oper += 1;
        break;
      case 'val':
      case 'arr':
        oper = val.idx + val.len;
        break;
    }
    return val;
  }
  switch(id) {
    case 0:
      item.child = [
        next(div(val, oper)),
        next(value(val, oper, 1, 'window.navigator.maxTouchPoints')),
        next(value(val, oper, 1, 'window.eval.toString().length')),
        next(div(val, oper)),
        next(value(val, oper, 4, 'window.navigator.userAgent')),
        value(val, oper, 1, 'length'),
        next(block(val, oper, 'window.navigator.platform')),
        next(value(val, oper, 4, 'execNumberByTime')),
        next(value(val, oper, 2, 'execRandomByNumber')),
        next(div(val, oper)),
        next(div(val, oper)),
        next(value(val, oper, 4, '3136373737323136')),
        next(value(val, oper, 4, '0')),
        next(value(val, oper, 2, 'window.innerHeight')),
        next(value(val, oper, 2, 'window.innerWidth')),
        next(value(val, oper, 2, 'window.outerHeight')),
        next(value(val, oper, 2, 'window.outerWidth')),
      ];
      break;
    case 1:
      item.child = [
        next(value(val, oper, 1, '0 < +ascii2string(gv.keys[24]) < 8')),
        next(div(val, oper)),
        next(value(val, oper, 4, 'r2mkaTime + runTime - startTime')),
        next(value(val, oper, 4, '+ascii2string(gv.keys[19])')),
        next(value(val, oper, 8, 'Math.floor(Math.random() * 1048575) * 4294967296 + (((currentTime + 1) & 4294967295) >>> 0)')),
        next(value(val, oper, 1, '+ascii2string(gv.keys[24])')),
      ];
      break;
    case 2:
      item.child = [
        next(value(val, oper, 4, '16777216')),
        next(value(val, oper, 4, '0')),
        next(value(val, oper, 2, '5900')),
        next(value(val, oper, 2, 'codeToStringUid')),
      ];
      break;
    case 4:
      item.child = [ // 编号510方法执行返回
        next(value(val, oper, 1, '1')),
        next(value(val, oper, 2, '0')),
        next(value(val, oper, 2, '0')),
        next(value(val, oper, 1, 'window.document.hidden')),
        next(value(val, oper, 8, 'encryptMode2(decrypt(ascii2string(gv.keys[22])), numarrAddTime(gv.keys[16])[0])')),
        next(value(val, oper, 2, '+decode(decrypt(ascii2string(gv.keys[22])))')),
      ];
      break;
    case 5:
      item.child = [
        next(value(val, oper, 1, 'taskmap[ascii2string(gv.keys[29])]();')),
        next(value(val, oper, 1, 'taskmap[ascii2string(gv.keys[30])]();')),
        next(value(val, oper, 1, 'taskmap[ascii2string(gv.keys[31])]();')),
        next(value(val, oper, 1, 'taskmap[ascii2string(gv.keys[32])]();')),
      ]
      break;
    case 6:
      item.child = [
        next(value(val, oper, 1, 'battery and connection operator')),
        next(value(val, oper, 1, 'window.navigator.battery.level * 100')),
        next(value(val, oper, 1, 'window.navigator.battery.chargingTime >> 8')),
        next(value(val, oper, 1, 'window.navigator.battery.chargingTime & 255')),
        next(value(val, oper, 1, 'window.navigator.connection')),
      ];
      break;
  }
  return item;
}

function value(arr, oper, len, show) {
  return {
    show,
    val: arr.slice(oper, oper + len),
    idx: oper,
    type: 'val',
    len,
  }
}

function block(arr, oper, id) {
  const num = arr[oper++]
  return parseBlock({ val: arr.slice(oper, num + oper), len: num, idx: oper, type: 'arr' }, id);
}

function div(arr, oper, show = '-------') {
  return { show, val: arr[oper], idx: oper, type: 'div' };
}

function print(divarr, deep = 0, parentIdx = 0) {
  divarr.forEach((it) => {
    const idx = deep ? `（${it.idx}，${it.idx + parentIdx}）` : `（${it.idx}）`;
    console.log([new Array(deep * 4).fill(' ').join(''), idx, `[${it.val || '0'}]`, it.show].filter(Boolean).join(' '));
    if (it.child) print(it.child, deep + 1, it.idx);
  })
}

function parse(basearr) {
  let oper = 0;
  console.log('\n');
  const next = (val) => {
    if (!val) debugger;
    switch(val.type) {
      case 'div':
        oper += 1;
        break;
      case 'val':
      case 'arr':
        oper = val.idx + val.len;
        break;
    }
    return val;
  }
  print(new Array(8).fill('').reduce((ans, it, idx) => {
    return [
      ...ans,
      next(div(basearr, oper)),
      value(basearr, oper, 1, 'length'),
      next(block(basearr, oper, idx)),
    ];
  }, []));
}

module.exports = function (basearrs) {
  try {
    basearrs = basearrs.map(it => {
      basearr = JSON.parse(it);
      if (!Array.isArray(basearr)) {
        throw new Error('');
      }
      return basearr;
    })
  } catch (err) {
    error('请传入序列化后的数字数组!');
  }
  basearrs.forEach(parse);
  if (basearrs.length > 1) {
    console.log('\n');
    for (let i = 0, j = new Set(); i < Math.max(...basearrs.map(it => it.length)); i++) {
      j.clear();
      basearrs.forEach(it => j.add(it[i]));
      if (j.size !== 1) console.log(`不同点下标${i}：${basearrs.map(it => it[i]).join(' ')}`);
    }
  }
}
