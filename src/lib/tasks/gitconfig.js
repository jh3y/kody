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
  userConfig = require(process.cwd() + '/kody.json'),
  winston    = require('winston');

const PROPS = {
    STARTER: 'git/gitconfig.starter',
    OUTPUT : 'git/gitconfig.link'
  },
  options = {
    name       : 'GitConfig',
    description: 'sets up global git configuration for symlinking',
    exec       : function(resolve) {
      const gitCredential = 'osxkeychain',
        gitEmail = userConfig.git_credentials.email,
        gitName = userConfig.git_credentials.name,
        nameCmd = `-e 's/AUTHORNAME/${gitName}/g'`,
        emailCmd = `-e 's/AUTHOREMAIL/${gitEmail}/g'`,
        credentialCmd = `-e 's/GIT_CREDENTIAL_HELPER/${gitCredential}/g'`,
        cG = `sed ${nameCmd} ${emailCmd} ${credentialCmd} ${PROPS.STARTER}`;

      shell.exec(cG, {silent: true})
        .stdout.to(PROPS.OUTPUT);

      winston.warn(`GitConfig set up, ${gitName}, ${gitEmail}`);
      setTimeout(resolve, 3000);
    }
  };

exports.options = options;
