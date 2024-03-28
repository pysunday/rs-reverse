// 这个文件方法将数据复杂化，该方法在cp2不变时返回固定值
const gv = require('@src/handler/globalVarible');

function nummod(num) {
  return Math.abs(num) % 8;
}

function one(arr) {
  if (arr[nummod(3, 8)]) {
    if (6) {
      arr[nummod(5, 8)] = 3;
    }
  }
  arr[nummod(4 - 2, 8)] = 1;
  arr[0] = 6;
  arr[4] = 3 + 1;
}

function two(arr) {
  if (3 + 1) {
    arr[4] = 2;
  }
  arr[4] = arr[nummod(3, 8)];
  if (arr[nummod(7, 8)]) {
    if (2) {
      arr[0] = 6;
    }
  }
  arr[4] = arr[nummod(3, 8)];
  if (7 + 5) {
    arr[0] = 6;
  }
  arr[0] = arr[nummod(7, 8)];
}

function three(arr) {
  arr[nummod(3, 8)] = arr[nummod(6, 8)];
  arr[4] = 2;
  arr[0] = 6;
}

function four(arr) {
  if (2) {
    arr[0] = 6;
  }
  arr[0] = 6;
  arr[4] = arr[nummod(3, 8)];
  if (7 + 5) {
    arr[0] = 6;
  }
  arr[0] = 7 + 5;
  arr[0] = 6;
}

function five(arr) {
  if (arr[nummod(3, 8)]) {
    if (6) {
      arr[nummod(5, 8)] = 3;
    }
  }
  arr[4] = 2;
  arr[0] = 7 + 5;
  arr[0] = 6;
  arr[4] = arr[nummod(3, 8)];
  if (7 + 5) {
    arr[0] = 6;
  }
}

function six(arr) {
  if (arr[nummod(7, 8)]) {
    if (2) {
      arr[nummod(1, 8)] = 7;
    }
  }
  arr[nummod(0 - 6, 8)] = arr[nummod(2, 8)];
  arr[0] = 7 + 5;
  arr[0] = 6;
  arr[4] = 3 + 1;
  arr[4] = 3 + 1;
}

module.exports = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7];
  [one, two, three, four, five, six].forEach(func => func(arr));
  const sum = arr.reduce((ans, it, idx) => {
    ans[idx % 2] += it;
    return ans;
  }, [0, 0]);
  return sum[0] & 255 | (sum[1] & 255) << 8;
}
