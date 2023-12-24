// 字符交换方式解码字符串
module.exports = function (str) {
  const arr = str.split('');
  for (let idx = str.length - 4; idx >= 0; idx -= 4) {
    [arr[idx], arr[idx + 1], arr[idx + 3], arr[idx + 2]] =
      [arr[idx + 1], arr[idx + 3], arr[idx + 2], arr[idx]];
  }
  return arr.join('');
}

