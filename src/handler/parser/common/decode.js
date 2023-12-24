const gv = require('@src/handler/globalVarible');

function trans(numarr) {
  const ans = [];
  const mark = '?'.charCodeAt();
  for (var idx = 0; idx < numarr.length; idx++) {
    const num = numarr[idx];
    let val;
    if (num < gv.cp2[37]) {
      val = num;
    } else if (num < gv.cp2[46]) {
      val = mark;
    } else if (num < gv.cp2[36]) {
      val = (num & gv.cp2[13]) << gv.cp2[55] | numarr[idx + 1] & gv.cp2[13];
      idx++;
    } else if (num < gv.cp2[7]) {
      val = (num & gv.cp2[31]) << gv.cp2[14] | (numarr[idx + 1] & gv.cp2[13]) << gv.cp2[55] | numarr[idx + gv.cp2[56]] & gv.cp2[13];
      idx += gv.cp2[56];
    } else if (num < gv.cp2[99]) {
      val = (num & gv.cp2[23]) << gv.cp2[9] | (numarr[idx + 1] & gv.cp2[13]) << gv.cp2[14] | (numarr[idx + gv.cp2[56]] & gv.cp2[13]) << gv.cp2[55] | numarr[idx + gv.cp2[58]] & gv.cp2[13];
      idx += gv.cp2[58];
    } else if (num < gv.cp2[148]) {
      val = mark;
      idx += gv.cp2[19];
    } else if (num < gv.cp2[171]) {
      val = mark;
      idx += gv.cp2[29];
    } else {
      val = mark;
    }
    if (val > gv.cp2[25]) {
      val -= gv.cp2[26];
      ans.push((val >> gv.cp2[0]) + gv.cp2[187], val % gv.cp2[63] + gv.cp2[160]);
    } else {
      ans.push(val);
    }
  }
  return ans;
}

function join(numarr, start = 0, end = numarr.length) {
  const ans = new Array(Math.ceil(numarr.length / gv.cp2[120]));
  let idx = 0;
  while (start < end - gv.cp2[120]) {
    ans[idx++] = String.fromCharCode(...numarr.slice(start, start += gv.cp2[120]));
  }
  if (start < end) {
    ans[idx++] = String.fromCharCode(...numarr.slice(start, end));
  }
  return ans.join('');
}

module.exports = function(numarr) {
  return join(trans(numarr));
}
