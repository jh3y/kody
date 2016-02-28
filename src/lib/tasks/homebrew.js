/**
  * homebrew - install and set up homebrew
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const PROPS = {
    URL: 'https://raw.githubusercontent.com/Homebrew/install/master/install'
  },
  options = {
    name: 'homebrew',
    description: 'install and set up homebrew',
    exec: function(resolve) {
      const brewInstalled = shell.which('brew') !== null,
        packages = userConfig.brewInstalls;
      if (!brewInstalled) {
        winston.info('installing Homebrew');
        shell.exec(`ruby -e "$(curl -fsSL ${PROPS.URL})"`);
        winston.success('Homebrew installed');
      } else
        winston.warn('Homebrew already installed');
      shell.exec('brew doctor');
      winston.warn(`NOTE: any info from brew doctor may
        account for any issues with package installs`);
      if (packages.length > 0) {
        shell.exec(`brew install ${packages.join(' ')}`);
        winston.success('brew packages installed');
      }
      resolve();
    }
  };

exports.options = options;
