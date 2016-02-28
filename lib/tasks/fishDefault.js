'use strict';

/**
  * set fish shell - set fish shell as default shell
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    userConfig = require(process.cwd() + '/kody.json'),
    winston = require('winston');

var options = {
  name: 'set fish shell',
  description: 'set fish shell as default shell',
  exec: function exec(resolve) {
    var scriptPath = userConfig.fishDefaultScriptPath;
    if (scriptPath) {
      shell.exec('sh ./' + scriptPath);
      winston.success('fish shell set as default');
    } else winston.error('fish shell script not found');
    resolve();
  }
};

exports.options = options;