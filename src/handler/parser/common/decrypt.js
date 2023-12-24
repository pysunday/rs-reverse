const gv = require('@src/handler/globalVarible');

let datas = undefined;

module.exports = function(str) {
  if (!datas) {
    datas = gv.cp0_96(7, 41).split('').reduce((ans, key, idx) => {
      const code = key.charCodeAt()
      ans[0][code] = idx << gv.cp2[56];
      ans[1][code] = idx >> gv.cp2[19];
      ans[2][code] = (idx & gv.cp2[31]) << gv.cp2[19];
      ans[3][code] = idx >> gv.cp2[56];
      ans[4][code] = (idx & gv.cp2[58]) << gv.cp2[55];
      ans[5][code] = idx;
      return ans
    }, [{}, {}, {}, {}, {}, { ...new Array(255).fill(-1) }])
  }
  const [data1, data2, data3, data4, data5, data6] = datas;
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
