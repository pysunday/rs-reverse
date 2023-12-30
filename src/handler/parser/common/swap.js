// 字符每4位交换解码字符串
exports.swap4 = function (str) {
  const arr = str.split('');
  for (let idx = str.length - 4; idx >= 0; idx -= 4) {
    [arr[idx], arr[idx + 1], arr[idx + 3], arr[idx + 2]] =
      [arr[idx + 1], arr[idx + 3], arr[idx + 2], arr[idx]];
  }
  return arr.join('');
}

// 字符每2位交换解码字符串
exports.swap2 = function (str) {
  const arr = str.split('');
  for (let idx = str.length - 2; idx >= 0; idx -= 2) {
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
  }
  return arr.join('');
}

