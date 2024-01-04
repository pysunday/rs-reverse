const gv = require('@src/handler/globalVarible');
const monitor = require('@utils/monitor');
const logger = require('@utils/logger');

module.exports = function(...params) {
  logger.trace('执行开始!');
  try {
    return dynamicExec(...params);
  } catch (err) {
    logger.error(String(err));
    process.exit();
  } finally {
    logger.trace('执行结束!');
  }
}

function dynamicExec(task, start = 0, args = [], loop_res = [], global_res = []) {
  args = monitor(args, 'args', { getLog: true, setLog: true });
  loop_res = monitor(loop_res, 'loop_res', { getLog: true, setLog: true, getCb: (key) => {if(['81', '83'].includes(key))debugger}});
  global_res = monitor(global_res, 'global_res', { getLog: true, setLog: true });
  if (typeof task === 'string') task = gv.r2mka(task).taskarr;
  logger.trace(`动态代码运行，任务列表：${task}, 起点：${start}，长度：${task.length}`);
  const data = [];
  const ret = [];
  ret[0] = args;
  ret[2] = [
    'window、',
    args,
  ];
  let target, tarkey, d_cursor = 0, temp1, temp2, temp3, temp4, t_cursor;
  let runtimes = 0;
  const len = task.length;
  const notCheckTask = [11, 15, 27, 32, 48, 51, 59, 84, 104, 109];
  for (t_cursor = start; t_cursor < len; t_cursor++) {
    // console.log(`${notCheckTask.includes(task[t_cursor]) ? '[no]' : '[ok]'}【${++runtimes}, ${t_cursor}】运行 case（${task[t_cursor]}）`);
    switch (task[t_cursor]) {
      case 0:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] * temp1;
        data[d_cursor++] = temp1;
        break;
      case 1:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] & temp1;
        data[d_cursor++] = temp1;
        break;
      case 2:
        data[d_cursor++] = ret[0][task[++t_cursor]];
        break;
      case 3:
        data[d_cursor++] = true;
        break;
      case 4:
        tarkey = task[++t_cursor];
        temp1 = data[--d_cursor];
        !temp1 ? (t_cursor += tarkey, ++d_cursor) : 0;
        break;
      case 5:
        temp1 = data[--d_cursor];
        setTarget();
        temp1 = target[tarkey] |= temp1;
        break;
      case 6:
        data[d_cursor++] = ret[2][task[++t_cursor]];
        break;
      case 7:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] !== temp1;
        data[d_cursor++] = temp1;
        break;
      case 8:
        d_cursor -= 2;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        data[d_cursor++] = target(data[temp1], data[temp1 + 1]);
        break;
      case 9:
        d_cursor--;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        data[d_cursor++] = target(data[temp1]);
        break;
      case 10:
        temp2 = task[++t_cursor];
        t_cursor += temp2;
        break;
      case 11:
        // temp3 = task[++t_cursor];
        // data[d_cursor++] = ret[3][temp3][task[++t_cursor]];
        notCheckTask.push(task[t_cursor]);
        break;
      case 12:
        return data[--d_cursor];
      case 13:
        d_cursor -= 3;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        temp1 = target(data[temp1], data[temp1 + 1], data[temp1 + 2]);
        break;
      case 14:
        temp2 = task[++t_cursor];
        t_cursor -= temp2;
        break;
      case 15:
        // temp3 = task[++t_cursor];
        // data[d_cursor++] = ret[1][temp3][task[++t_cursor]];
        notCheckTask.push(task[t_cursor]);
        break;
      case 16:
        d_cursor--;
        temp1 = d_cursor;
        setTarget();
        temp1 = target[tarkey](data[temp1]);
        break;
      case 17:
        d_cursor--;
        temp1 = d_cursor;
        setTarget();
        data[d_cursor++] = target[tarkey](data[temp1]);
        break;
      case 18:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] in temp1;
        data[d_cursor++] = temp1;
        break;
      case 19:
        temp1 = data[--d_cursor];
        target = data[d_cursor - 1];
        target[keycodes[task[++t_cursor]]] = temp1;
        break;
      case 20:
        data[d_cursor++] = [];
        break;
      case 21:
        task[t_cursor] = 26;
        tarkey = task[++t_cursor];
        temp1 = keycodes[tarkey];
        task[t_cursor] = temp1;
        data[d_cursor++] = temp1;
        break;
      case 22:
        temp1 = data[--d_cursor];
        setTarget();
        temp1 = target[tarkey] += temp1;
        break;
      case 23:
        data[d_cursor++] = loop_res[task[++t_cursor]];
        break;
      case 24:
        tarkey = data[--d_cursor];
        target = data[--d_cursor];
        break;
      case 25:
        temp1 = data[--d_cursor];
        setTarget();
        target[tarkey] = temp1;
        break;
      case 26:
        data[d_cursor++] = task[++t_cursor];
        break;
      case 27:
        // temp3 = task[++t_cursor];
        // tarkey = task[++t_cursor];
        // target = ret[3][temp3];
        break;
      case 28:
        setTarget();
        data[d_cursor++] = target[tarkey]();
        break;
      case 29:
        d_cursor -= 2;
        temp1 = d_cursor;
        setTarget();
        data[d_cursor++] = target[tarkey](data[temp1], data[temp1 + 1]);
        break;
      case 30:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] > temp1;
        data[d_cursor++] = temp1;
        break;
      case 31:
        setTarget();
        target = target[tarkey];
        data[d_cursor++] = target();
        break;
      case 32:
        // _$cG(_$$I, task[++t_cursor], task[++t_cursor], temp2 = task[++t_cursor], task[++t_cursor], t_cursor + 1, ret[2], ret);
        // ret[4] ? t_cursor = len : t_cursor += temp2;
        notCheckTask.push(task[t_cursor]);
        break;
      case 33:
        tarkey = task[++t_cursor];
        target = ret[0];
        break;
      case 34:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] != temp1;
        data[d_cursor++] = temp1;
        break;
      case 35:
        setTarget();
        target = target[tarkey];
        temp1 = target();
        break;
      case 36:
        d_cursor--;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        temp1 = target(data[temp1]);
        break;
      case 37:
        task[t_cursor] = 92;
        tarkey = keywords[task[++t_cursor]];
        task[t_cursor] = tarkey;
        target = data[--d_cursor];
        break;
      case 38:
        temp1 = data[--d_cursor];
        temp2 = task[++t_cursor];
        temp1 ? 0 : t_cursor += temp2;
        break;
      case 39:
        tarkey = task[++t_cursor];
        temp1 = data[--d_cursor];
        temp1 ? (t_cursor += tarkey, ++d_cursor) : 0;
        break;
      case 40:
        data[d_cursor++] = {};
        break;
      case 41:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] == temp1;
        data[d_cursor++] = temp1;
        break;
      case 42:
        temp1 = data[--d_cursor];
        target = data[--d_cursor];
        data[d_cursor++] = target[temp1];
        break;
      case 43:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] < temp1;
        data[d_cursor++] = temp1;
        break;
      case 44:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] === temp1;
        data[d_cursor++] = temp1;
        break;
      case 45:
        data[d_cursor++] = global_res[task[++t_cursor]];
        break;
      case 46:
        task[t_cursor] = 87;
        tarkey = keywords[task[++t_cursor]];
        task[t_cursor] = tarkey;
        temp1 = data[--d_cursor];
        data[d_cursor++] = temp1[tarkey];
        break;
      case 47:
        d_cursor -= 2;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        temp1 = target(data[temp1], data[temp1 + 1]);
        break;
      case 48:
        // tarkey = task[++t_cursor];
        // data[d_cursor++] = _$_w(_$$I._$hW[tarkey], ret);
        notCheckTask.push(task[t_cursor]);
        break;
      case 49:
        d_cursor -= 2;
        temp1 = d_cursor;
        setTarget();
        temp1 = target[tarkey](data[temp1], data[temp1 + 1]);
        break;
      case 50:
        temp1 = typeof data[--d_cursor];
        data[d_cursor++] = temp1;
        break;
      case 51:
        // temp2 = task[++t_cursor];
        // temp4 = data.slice(d_cursor - temp2, d_cursor);
        // d_cursor -= temp2;
        // setTarget();
        // data[d_cursor++] = _$fH(target[tarkey], temp4);
        notCheckTask.push(task[t_cursor]);
        break;
      case 52:
        temp1 = data[--d_cursor];
        target = data[d_cursor - 1];
        target[keywords[task[++t_cursor]]] = temp1;
        break;
      case 53:
        temp1 = data[--d_cursor];
        data[d_cursor++] = !temp1;
        break;
      case 54:
        tarkey = task[++t_cursor];
        target = loop_res;
        break;
      case 55:
        temp1 = target[tarkey]++;
        break;
      case 56:
        ret[4] = 2;
        t_cursor = len;
        break;
      case 57:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] - temp1;
        data[d_cursor++] = temp1;
        break;
      case 58:
        data[d_cursor++] = false;
        break;
      case 59:
        // task[t_cursor] = 26;
        // tarkey = task[++t_cursor];
        // temp1 = _$kG[tarkey];
        // task[t_cursor] = temp1;
        // data[d_cursor++] = temp1;
        notCheckTask.push(task[t_cursor]);
        break;
      case 60:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] + temp1;
        data[d_cursor++] = temp1;
        break;
      case 61:
        temp1 = data[--d_cursor];
        target = data[d_cursor - 1];
        target.push(temp1);
        break;
      case 62:
        tarkey = task[++t_cursor];
        target = global_res;
        break;
      case 63:
        tarkey = task[++t_cursor];
        target = ret[2];
        break;
      case 64:
        break;
      case 65:
        task[t_cursor] = 87;
        tarkey = keycodes[task[++t_cursor]];
        task[t_cursor] = tarkey;
        temp1 = data[--d_cursor];
        data[d_cursor++] = temp1[tarkey];
        break;
      case 66:
        data[d_cursor++] = null;
        break;
      case 67:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] << temp1;
        data[d_cursor++] = temp1;
        break;
      case 68:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] + temp1;
        break;
      case 69:
        d_cursor -= 5;
        temp1 = d_cursor;
        setTarget();
        data[d_cursor++] = target[tarkey](data[temp1], data[temp1 + 1], data[temp1 + 2], data[temp1 + 3], data[temp1 + 4]);
        break;
      case 70:
        data[d_cursor++] = target[tarkey]++;
        break;
      case 71:
        temp2 = task[++t_cursor];
        d_cursor -= temp2;
        temp4 = data.slice(d_cursor, d_cursor + temp2);
        setTarget();
        temp1 = target[tarkey].apply(target, temp4);
        break;
      case 72:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] % temp1;
        data[d_cursor++] = temp1;
        break;
      case 73:
        data[d_cursor++] = ++target[tarkey];
        break;
      case 74:
        d_cursor -= 4;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        temp1 = target(data[temp1], data[temp1 + 1], data[temp1 + 2], data[temp1 + 3]);
        break;
      case 75:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] >= temp1;
        data[d_cursor++] = temp1;
        break;
      case 76:
        temp1 = task[++t_cursor];
        break;
      case 77:
        temp1 = target[tarkey]--;
        break;
      case 78:
        tarkey = task[++t_cursor];
        temp1 = temp1[tarkey];
        break;
      case 79:
        d_cursor -= 3;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        data[d_cursor++] = target(data[temp1], data[temp1 + 1], data[temp1 + 2]);
        break;
      case 80:
        tarkey = task[++t_cursor];
        data[d_cursor++] = temp1[tarkey];
        break;
      case 81:
        d_cursor -= 4;
        temp1 = d_cursor;
        setTarget();
        data[d_cursor++] = target[tarkey](data[temp1], data[temp1 + 1], data[temp1 + 2], data[temp1 + 3]);
        break;
      case 82:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] <= temp1;
        data[d_cursor++] = temp1;
        break;
      case 83:
        tarkey = task[++t_cursor];
        temp1 = data[--d_cursor];
        !temp1 ? t_cursor += tarkey : 0;
        break;
      case 84:
        // temp1 = data[--d_cursor];
        // tarkey = task[++t_cursor];
        // target = _$ke[tarkey];
        // temp2 = target[temp1];
        // temp2 == _$an ? temp2 = task[++t_cursor] : ++t_cursor;
        // t_cursor += temp2;
        notCheckTask.push(task[t_cursor]);
        break;
      case 85:
        setTarget();
        temp1 = target[tarkey]();
        break;
      case 86:
        temp1 = delete target[tarkey];
        break;
      case 87:
        tarkey = task[++t_cursor];
        temp1 = data[--d_cursor];
        data[d_cursor++] = temp1[tarkey];
        break;
      case 88:
        temp1 = data[--d_cursor];
        data[d_cursor++] = ~temp1;
        break;
      case 89:
        temp1 = -data[--d_cursor];
        data[d_cursor++] = temp1;
        break;
      case 90:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] >>> temp1;
        data[d_cursor++] = temp1;
        break;
      case 91:
        temp1 = data[--d_cursor];
        setTarget();
        temp1 = target[tarkey] ^= temp1;
        break;
      case 92:
        tarkey = task[++t_cursor];
        target = data[--d_cursor];
        break;
      case 93:
        d_cursor -= 3;
        temp1 = d_cursor;
        setTarget();
        temp1 = target[tarkey](data[temp1], data[temp1 + 1], data[temp1 + 2]);
        break;
      case 94:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] / temp1;
        data[d_cursor++] = temp1;
        break;
      case 95:
        d_cursor -= 3;
        temp1 = d_cursor;
        setTarget();
        data[d_cursor++] = target[tarkey](data[temp1], data[temp1 + 1], data[temp1 + 2]);
        break;
      case 96:
        d_cursor -= 4;
        temp1 = d_cursor;
        setTarget();
        temp1 = target[tarkey](data[temp1], data[temp1 + 1], data[temp1 + 2], data[temp1 + 3]);
        break;
      case 97:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] instanceof temp1;
        data[d_cursor++] = temp1;
        break;
      case 98:
        temp1 = data[--d_cursor];
        setTarget();
        temp1 = target[tarkey] &= temp1;
        break;
      case 99:
        task[t_cursor] = 92;
        tarkey = keycodes[task[++t_cursor]];
        task[t_cursor] = tarkey;
        target = data[--d_cursor];
        break;
      case 100:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] | temp1
        data[d_cursor++] = temp1;
        break;
      case 101:
        temp2 = task[++t_cursor], temp1 = data[--d_cursor], t_cursor++;
        t_cursor += temp2 - 1;
        break;
      case 102:
        temp1 = ++target[tarkey];
        break;
      case 103:
        temp1 = data[--d_cursor];
        setTarget();
        target[tarkey] = temp1;
        data[d_cursor++] = temp1;
        break;
      case 104:
        // temp3 = task[++t_cursor];
        // tarkey = task[++t_cursor];
        // target = ret[1][temp3];
        notCheckTask.push(task[t_cursor]);
        break;
      case 105:
        tarkey = task[++t_cursor];
        temp1 = data[--d_cursor];
        temp1 = temp1[tarkey];
        break;
      case 106:
        d_cursor -= 4;
        temp1 = d_cursor;
        setTarget();
        target = target[tarkey];
        data[d_cursor++] = target(data[temp1], data[temp1 + 1], data[temp1 + 2], data[temp1 + 3]);
        break;
      case 107:
        data[d_cursor++] = --target[tarkey];
        break;
      case 108:
        --d_cursor;
        target = data;
        tarkey = d_cursor;
        break;
      case 109:
        // temp2 = task[++t_cursor];
        // temp4 = data.slice(d_cursor - temp2, d_cursor);
        // d_cursor -= temp2;
        // setTarget();
        // temp1 = _$fH(target[tarkey], temp4);
        notCheckTask.push(task[t_cursor]);
        break;
      case 110:
        temp1 = data[--d_cursor];
        setTarget();
        temp1 = target[tarkey] -= temp1;
        break;
      case 111:
        temp1 = data[--d_cursor];
        temp1 = data[--d_cursor] ^ temp1;
        data[d_cursor++] = temp1;
        break;
    }
  }

  function setTarget() {
    let next = task[++t_cursor];
    if (next <= 24) {
      tarkey = data[--d_cursor];
      target = data[--d_cursor];
    } else if (next > 24 && next <= 27) {
      logger.trace(`[no] 设置关键对象与下标：${next}`)
      // temp3 = task[++t_cursor];
      // tarkey = task[++t_cursor];
      // target = ret[3][temp3];
      debugger;
    } else if (next > 27 && next <= 33) {
      tarkey = task[++t_cursor];
      target = ret[0];
    } else if (next > 33 && next <= 37) {
      task[t_cursor] = 92;
      tarkey = keywords[task[++t_cursor]];
      task[t_cursor] = tarkey;
      target = data[--d_cursor];
    } else if (next > 37 && next <= 54) {
      tarkey = task[++t_cursor];
      target = loop_res;
    } else if (next > 54 && next <= 62) {
      tarkey = task[++t_cursor];
      target = global_res;
    } else if (next > 62 && next <= 63) {
      tarkey = task[++t_cursor];
      target = ret[2];
    } else if (next > 63 && next <= 92) {
      tarkey = task[++t_cursor];
      target = data[--d_cursor];
    } else if (next > 92 && next <= 99) {
      task[t_cursor] = 92;
      tarkey = keycodes[task[++t_cursor]];
      task[t_cursor] = tarkey;
      target = data[--d_cursor];
    } else if (next > 99 && next <= 104) {
      logger.trace(`[no] 设置关键对象与下标：${next}`)
      // temp3 = task[++t_cursor];
      // tarkey = task[++t_cursor];
      // target = ret[1][temp3];
      debugger;
    } else {
      --d_cursor;
      target = data;
      tarkey = d_cursor;
    }
  }
}

