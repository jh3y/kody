'use strict';

var colors = require('colors'),
    winston = require('winston'),
    pkg = require('../package.json'),
    log = function log(msg) {
  // winston.info('ererger');

  var type = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];
},
    loggerConfig = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    success: 0,
    silly: 4
  },
  colors: {
    info: 'blue',
    warn: 'green',
    error: 'yellow',
    success: 'red',
    silly: 'rainbow'
  }
};

colors.setTheme({
  default: 'grey',
  prompt: 'yellow',
  info: 'cyan',
  help: 'magenta',
  warn: 'yellow',
  error: 'red',
  success: 'green',
  silly: 'rainbow'
});

exports.setupLogger = function () {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, {
    levels: loggerConfig.levels,
    formatter: function formatter(options) {
      return '[' + pkg.name.cyan + '] ' + options.message;
    }
  });
  // winston.setLevels(loggerConfig.levels);
  winston.level = 4;
  winston.addColors(loggerConfig.colors);
};

exports.log = log;