/**
  * apm installs - installs Atom IDE packages
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const options = {
  name: 'apm',
  description: 'installs apm packages for Atom IDE',
  exec: function(resolve) {
    const apmWhich = shell.exec('which apm', {silent: true});
    if (apmWhich.output.trim() !== '')
      if (userConfig.apmPackages.length > 0) {
        winston.warn(`NOTE: package installation may fail if a
          package is already installed. If problems persist remove the
          atom packages install directory and do a fresh install`);
        const packages = userConfig.apmPackages.join(' ');
        shell.exec(`apm install ${packages}`);
        winston.success('apm packages installed');
      } else
        winston.info('no packages to install');
    else
      winston.error('Atom IDE not installed');
    resolve();
  }
};

exports.options = options;
