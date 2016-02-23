'use strict';

/**
  * GitConfig - Sets up global Git configuration pre symlink
  *
  * user git/gitconfig.starter as a starting point to create a system
  * wide gitconfig.
  *
  * NOTE: This task could be made obsolete if you commit the author name
  *       and email as a gitconfig.link file.
  *
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    winston = require('winston'),
    userConfig = require(process.cwd() + '/kody.json'),
    options = {
  name: 'GitConfig',
  description: 'sets up global git configuration for symlinking',
  /**
    * Needs to check out what the config should be and send it over.
  */
  exec: function exec(resolve, reject) {
    var gitCredential = undefined,
        gitName = undefined,
        gitEmail = undefined;
    var uname = shell.exec('uname -s', { silent: true });
    if (uname.output.indexOf('Darwin') !== -1) {
      gitCredential = 'osxkeychain';
    }
    gitName = userConfig.git_credentials.name;
    gitEmail = userConfig.git_credentials.email;

    var configString = 'sed -e \'s/AUTHORNAME/' + gitName + '/g\' -e \'s/AUTHOREMAIL/' + gitEmail + '/g\' -e \'s/GIT_CREDENTIAL_HELPER/' + gitCredential + '/g\' git/gitconfig.starter';

    shell.exec(configString, { silent: true }).stdout.to('git/gitconfig.link');

    winston.warn('GitConfig set up, ' + gitName + ', ' + gitEmail);
    setTimeout(resolve, 3000);
  }
};

exports.options = options;