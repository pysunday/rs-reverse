const dataOper = require('./dataOper');
const _chunk = require('lodash/chunk');
const parser = require('./parser/');
const gv = require('./globalVarible');

module.exports = class {
  constructor(ts) {
    parser.init(ts)
  }

  parseHandle() {
  }

  run() {
    this.parseHandle();
  }
}
