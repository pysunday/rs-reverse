// 16进制数组拼接的数字转字符
module.exports = function(str) {
    const arr = [];
    for (let i = 0; i < str.length; i += 2) {
        arr.push(parseInt(str.substr(i, 2), 16));
    }
    return String.fromCharCode(...arr);
}
