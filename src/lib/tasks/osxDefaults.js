/**
  * OSX defaults - set system wide OSX defaults
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const options = {
  name: 'OSX defaults',
  description: 'sets system wide OSX defaults',
  exec: function(resolve) {
    const scriptPath = userConfig.osxDefaultScriptPath;
    if (scriptPath) {
      shell.exec(`sh ./${scriptPath}`);
      winston.success('OSX defaults set');
    } else
      winston.error('OSX defaults script not found');
    resolve();
  }
};

exports.options = options;
