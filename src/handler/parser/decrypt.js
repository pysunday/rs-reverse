const gv = require('../globalVarible');

const getTimeFlag = (time) => {
  return [
    time >>> gv.cp2[4] & gv.cp2[34],
    time >>> gv.cp2[2] & gv.cp2[34],
    time >>> gv.cp2[52] & gv.cp2[34],
    time & gv.cp2[34]
  ];
}

const restoreTimeFlag = (timeFlag) => {
  return timeFlag[0] << gv.cp2[4] | timeFlag[1] << gv.cp2[2] | timeFlag[2] << gv.cp2[52] | timeFlag[3];
}

exports.parse = function(numarr) {
  const now = Math.ceil(new Date().getTime() / 1000);
  const timeflag = [
    now >>> gv.cp2[4] & gv.cp2[34],
    now >>> gv.cp2[2] & gv.cp2[34],
    now >>> gv.cp2[52] & gv.cp2[34],
    now & gv.cp2[34]
  ];
  const random = Math.ceil(Math.random() * gv.cp2[30]);
  const ans = [...numarr, ...timeflag].map(it => it ^ 33)
  ans.push(random);
  return ans

}

exports.init = function() {
};
