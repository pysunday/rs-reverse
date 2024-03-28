// require('module-alias/register');
const Coder = require('@src/handler/Coder');
const paths = require('@utils/paths');
const fs = require('fs');
const _isEqual = require('lodash/isEqual');
const gv = require('@src/handler/globalVarible');

test('版本2动态代码生成比对', () => {
  gv._setAttr('version', 2);
  const codePath = paths.exampleResolve('codes', '2-code.js');
  const tsPath = paths.exampleResolve('codes', '2-$_ts.json');
  const tsFullPath = paths.exampleResolve('codes', '2-$_ts-full.json');

  const ts = JSON.parse(fs.readFileSync(tsPath, 'utf8'));
  const tarCode = fs.readFileSync(codePath, 'utf8');
  const tsFull = JSON.parse(fs.readFileSync(tsFullPath, 'utf8'));
  const coder = new Coder(ts);
  const { code, $_ts } = coder.run();
  $_ts.cp[4] = tsFull.cp[4] = 0; // 运行时间调整一致
  tsFull.lcd = tsFull.nsd = undefined; // JSON.stringify时丢失的字段补齐
  delete tsFull.cp[5]; // JSON.stringify时将数组空元素用null填充还原
  expect(code.trim()).toBe(tarCode.trim());
  expect(_isEqual($_ts, tsFull)).toBe(true);
});
