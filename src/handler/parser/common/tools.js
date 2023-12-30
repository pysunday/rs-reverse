const gv = require('@src/handler/globalVarible');

exports.factorial = function (n) {
  // 阶乘
  let ans = 1;
  for (let i = 1; i <= n; i++) {
    ans *= i;
  }
  return ans;
}

exports.fibonacci = function (n) {
  // 斐波那契
  if (n <= 1) return n;
  return exports.fibonacci(n - 1) + exports.fibonacci(n - 2);
}
