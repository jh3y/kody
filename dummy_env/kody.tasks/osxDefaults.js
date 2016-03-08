/**
  * OSX defaults - set system wide OSX defaults
  * @license MIT
  * @author jh3y
*/
const options = {
  name: 'OSX defaults',
  description: 'sets system wide OSX defaults',
  exec: function(resolve, reject, shell, log, config) {
    const scriptPath = config.osxDefaultScriptPath;
    if (scriptPath) {
      shell.exec(`sh ./${scriptPath}`);
      log.success('OSX defaults set');
    } else
      log.error('OSX defaults script not found');
    resolve();
  }
};

exports.options = options;
