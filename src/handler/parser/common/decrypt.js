const gv = require('@src/handler/globalVarible');

module.exports = function(str) {
  const [data1, data2, data3, data4, data5, data6] = gv.decryptKeys;
  const ans = []
  for(let i = 0; i < str.length; i += 4) {
    let [one, two, three, four] = [0, 1, 2, 3].map(it => {
      if (i + it >= str.length) return undefined
      return str[i + it].charCodeAt()
    })
    two !== undefined && ans.push(data1[one] | data2[two])
    three !== undefined && ans.push(data3[two] | data4[three])
    four !== undefined && ans.push(data5[three] | data6[four])
  }
  return ans
}
