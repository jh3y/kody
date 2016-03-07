/**
  * set fish shell - set fish shell as default shell
  * @license MIT
  * @author jh3y
*/
const options = {
  name: 'set fish shell',
  description: 'set fish shell as default shell',
  exec: function(resolve, reject, shell, log, config) {
    const scriptPath = config.fishDefaultScriptPath;
    if (scriptPath) {
      shell.exec(`sh ./${scriptPath}`);
      log.success('fish shell set as default');
    } else
      log.error('fish shell script not found');
    resolve();
  }
};

exports.options = options;
