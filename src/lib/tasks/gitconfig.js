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
const shell  = require('shelljs'),
  utils      = require('../utils'),
  userConfig = require(process.cwd() + '/kody.json');

const options = {
  name: 'GitConfig',
  description: 'sets up global git configuration for symlinking',
  /**
    * Needs to check out what the config should be and send it over.
  */
  exec: function(resolve, reject) {
    let gitCredential,
      gitName,
      gitEmail;
    const uname = shell.exec('uname -s', {silent: true});
    if (uname.output.indexOf('Darwin') !== -1) {
      gitCredential = 'osxkeychain';
    }
    gitName  = userConfig.git_credentials.name;
    gitEmail = userConfig.git_credentials.email;

    let configString = `sed -e 's/AUTHORNAME/${gitName}/g' -e 's/AUTHOREMAIL/${gitEmail}/g' -e 's/GIT_CREDENTIAL_HELPER/${gitCredential}/g' git/gitconfig.starter`;

    shell.exec(configString, {silent: true})
      .stdout.to('git/gitconfig.link');

    utils.log(`GitConfig set up, ${gitName}, ${gitEmail}`, 'info');
    setTimeout(resolve, 3000);
  }
};

exports.options = options;
