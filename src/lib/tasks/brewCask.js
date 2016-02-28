/**
  * set up brew cask - install brew cask and install casks
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const options = {
  name: 'set up brew cask',
  description: 'install brew cask and install casks',
  exec: function(resolve) {
    const brewInstalled = shell.which('brew') !== null,
      casks = userConfig.brewCasks;
    if (brewInstalled && casks.length > 0) {
      shell.exec('brew prune');
      shell.exec('brew tap caskroom/cask');
      shell.exec('brew install brew-cask');
      for (const cask of casks)
        shell.exec(`brew cask install ${cask}`);
      winston.success('casks installed');
    } else
      winston.warn(`brew-cask not installed. Either brew not installed
        or no casks defined in kody.json`);
    resolve();
  }
};

exports.options = options;
