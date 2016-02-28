'use strict';

/**
  * OSX defaults - set system wide OSX defaults
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    userConfig = require(process.cwd() + '/kody.json'),
    winston = require('winston');

var options = {
  name: 'OSX defaults',
  description: 'sets system wide OSX defaults',
  exec: function exec(resolve) {
    var scriptPath = userConfig.osxDefaultScriptPath;
    if (scriptPath) {
      shell.exec('sh ./' + scriptPath);
      winston.success('OSX defaults set');
    } else winston.error('OSX defaults script not found');
    resolve();
  }
};

exports.options = options;