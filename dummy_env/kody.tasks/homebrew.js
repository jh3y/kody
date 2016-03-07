/**
  * homebrew - install and set up homebrew
  * @license MIT
  * @author jh3y
*/
const PROPS = {
    URL: 'https://raw.githubusercontent.com/Homebrew/install/master/install'
  },
  options = {
    name: 'homebrew',
    description: 'install and set up homebrew',
    exec: function(resolve, reject, shell, log, config) {
      const brewInstalled = shell.which('brew') !== null,
        packages = config.brewInstalls;
      if (!brewInstalled) {
        log.info('installing Homebrew');
        shell.exec(`ruby -e "$(curl -fsSL ${PROPS.URL})"`);
        log.success('Homebrew installed');
      } else
        log.warn('Homebrew already installed');
      shell.exec('brew doctor');
      log.warn(`NOTE: any info from brew doctor may
        account for any issues with package installs`);
      if (packages.length > 0) {
        shell.exec(`brew install ${packages.join(' ')}`);
        log.success('brew packages installed');
      }
      resolve();
    }
  };

exports.options = options;
