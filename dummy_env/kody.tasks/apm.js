/**
  * apm installs - installs Atom IDE packages
  * @license MIT
  * @author jh3y
*/
const options = {
  name: 'apm',
  description: 'installs apm packages for Atom IDE',
  exec: function(resolve, reject, shell, log, config) {
    const apmWhich = shell.exec('which apm', {silent: true});
    if (apmWhich.output.trim() !== '')
      if (config.apmPackages.length > 0) {
        log.warn(`NOTE: package installation may fail if a
          package is already installed. If problems persist remove the
          atom packages install directory and do a fresh install`);
        const packages = config.apmPackages.join(' ');
        shell.exec(`apm install ${packages}`);
        log.success('apm packages installed');
      } else
        log.info('no packages to install');
    else
      log.error('Atom IDE not installed');
    resolve();
  }
};

exports.options = options;
