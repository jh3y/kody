/**
  * kody - a .files manager
  *
  * @author jh3y 2016
  * @license MIT
*/


const program = require('commander'),
  colors      = require('colors'),
  winston     = require('winston'),
  pkg         = require('../package.json'),
  utils       = require('./utils'),
  kody        = require('./kody');

program
  .version(pkg.version);

utils.setupLogger();

program.parse(process.argv);

try {
  kody.init();
} catch(err) {
  utils.log(err.toString(), 'error');
}
