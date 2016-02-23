const colors = require('colors'),
  pkg        = require('../package.json'),
  log        = function(msg, type = 'default') {
    console.log('[', pkg.name.cyan, ']', msg[type]);
  };

colors.setTheme({
  default: 'grey',
  prompt : 'yellow',
  info   : 'cyan',
  help   : 'magenta',
  warn   : 'yellow',
  error  : 'red',
  success: 'green',
  silly  : 'rainbow',
});

exports.log = log;
