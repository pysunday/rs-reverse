module.exports = function() {
  let data;
  function init(defData = {}) {
    data = { ...defData };
  }
  init();
  return {
    setData(key, val, isNotCover = false) {
      if (key.indexOf('G_') === 0) isNotCover = true;
      if (isNotCover && key in data) throw Error(`数据键${key}重复定义`);
      data[key] = val
    },
    getData(key) {
      if (!(key in data)) throw Error(`数据键${key}未定义`);
      return data[key]
    },
    getAllData() {
      return data;
    },
    init,
  }
}
