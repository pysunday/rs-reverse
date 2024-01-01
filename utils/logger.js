const paths = require('./paths');
const pkg = require(paths.package);

const logger = require('log4js').getLogger(pkg.name);
logger.level = process.env.loglevel || pkg.logLevel;

module.exports = logger;
