'use strict';

/**
  * kody - a .files manager
  *
  * @author jh3y 2016
  * @license MIT
*/
require('colors');
var kody = require('./kody'),
    pkg = require('../package.json'),
    program = require('commander'),
    winston = require('winston');

var PROPS = {
  LOGGER_CONFIG: {
    LEVELS: {
      info: 1,
      warn: 2,
      error: 3,
      success: 4,
      silly: 5
    },
    COLORS: {
      info: 'blue',
      warn: 'yellow',
      error: 'red',
      success: 'green',
      silly: 'rainbow'
    }
  }
};

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: 'silly',
  colorize: true,
  formatter: function formatter(options) {
    var color = PROPS.LOGGER_CONFIG.COLORS[options.level];
    return '[' + pkg.name.cyan + '] ' + options.message[color];
  }
});
winston.setLevels(PROPS.LOGGER_CONFIG.LEVELS);

program.version(pkg.version).parse(process.argv);

try {
  kody.init();
} catch (err) {
  winston.error(err.toString());
}