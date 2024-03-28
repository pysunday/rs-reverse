const paths = require('../utils/paths');
const fs = require('fs');
const path = require('path');

const gvcp2 = [10,31,16,47,24,36,9,240,268435456,18,86,90,134217727,63,12,19,4294967296,4294967295,8192,4,58,1000,200,7,17,65535,65536,42,100,5,256,15,64,40,255,33,224,128,48,13,131072,-1,44,37,52,43,192,604800,32,45,46,92,8,20,51,6,2,11,3,27,134217728,127,57,1024,16843008,8200,2654435769,67108864,28,79,30,8202,4194304,14,65,39,60,123,100000,55,97,34,512,1048576,180,0.01,-100,-0.01,203,8194,4096,126,201,283,56,93,122,120,32768,248,26,21,300,35,86400000,2097151,170,80,98,96,5000,257,102,59,0.5,268435455,23,2000,82,2048,40960,16383,89,0,8203,68,33554432,262144,50000,69,2047,8239,3337565984,164,81,2531011,0.26,1800,8196,0.35,83,8287,110,99,1732584193,72,29,360,252,12288,271733878,101,2097152,-0.26,16777215,2400959708,84,0.9,16843009,6158,56320,75,0.4,0.813264543,30000,111,112,3988292384,8193,7560,8201,254,88,20000,15679,1518500249,0.1,65537,91,165,4023233417,0.6,54,8197,0.8,8195,160,55296,643615,-180,-0.2,-0.9,8199,1001,2562383102,-4,-90,-7,8198,-2,3000,1500,1859775393,3395469782,5089,3285377520,0.2,1048575,133,173,137,153,130,197,199,162,163,191,207,146,154,145,152,190]

function traverseFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      traverseFolder(filePath); // 如果是文件夹，则递归
    } else if (file.endsWith('.js')) {
      replaceTextInFile(filePath); // 如果是.js文件，则替换文本
    }
  });
}

function replaceTextInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`读取文件失败: ${filePath}`);
      return;
    }
    if (!data.includes('gv.cp2')) return;
    debugger;

    let replacedData = data;

    gvcp2.forEach((val, idx) => {
      replacedData = replacedData.replace(new RegExp(`gv\\.cp2\\[${idx}\\]`, 'g'), val);
    })

    fs.writeFile(filePath, replacedData, 'utf8', err => {
      if (err) {
        console.error(`写入文件失败: ${filePath}`);
        return;
      }
      console.log(`文件更新成功: ${filePath}`);
    });
  });
}

traverseFolder(paths.srcPath);
