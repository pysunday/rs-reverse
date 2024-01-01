require('module-alias/register');
Math.random = () => 0.1253744220839037;
const gv = require('../utils/initGv');
Object.assign(global, gv.utils);
process.argv.slice(2).forEach(text => console.log(JSON.stringify(eval(text))));
