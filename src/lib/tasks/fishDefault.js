/**
  * set fish shell - set fish shell as default shell
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const options = {
  name: 'set fish shell',
  description: 'set fish shell as default shell',
  exec: function(resolve) {
    const scriptPath = userConfig.fishDefaultScriptPath;
    if (scriptPath) {
      shell.exec(`sh ./${scriptPath}`);
      winston.success('fish shell set as default');
    } else
      winston.error('fish shell script not found');
    resolve();
  }
};

exports.options = options;
