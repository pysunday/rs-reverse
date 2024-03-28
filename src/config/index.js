const logger = require('@utils/logger');

const current_version = 2;

/*
keynameNum: 由瑞数动态打包时生成的固定值，控制变量名的生成数量
offsetConst(错误的话会导致解析r2mka值解析出错): 动态代码中生成8位解密用的偏移值数组使用，主要是里面的键值是任务数组中的值了，由于瑞数的任务树是打包时动态生成，且值为任务树中最顶层任务生成，不好获取，因此写死，键值可以在gv.r2mka('0-0').task中找到
codemap(工具动态生成): 瑞数主体循环方法生成的配置文件，用于动态代码使用
immucfg(-u命令动态生成): 版本固定值
*/

module.exports = (version = current_version) => {
  logger.trace(`当前配置版本: ${version}`);
  const config = {};
  switch (version) {
    case 1:
      Object.assign(config, {
        keynameNum: 806,
        offsetConst: {
          81: 3,
          82: 51,
          83: 153,
        },
      });
      break;
    case 2:
      Object.assign(config, {
        keynameNum: 829,
        offsetConst: {
          91: 3,
          92: 51,
          93: 153,
        },
      });
      break;
    default:
      throw new Error(`当前配置版本不存在, 版本编号：${version}`);
  }
  return {
    ...config,
    codemap: require(`./codemap_v${version}.json`),
    immucfg: require(`./immucfg_v${version}.json`),
    version: current_version,
  };
}
