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
const PROPS = {
    STARTER: 'git/gitconfig.starter',
    OUTPUT : 'git/gitconfig.link'
  },
  options = {
    name       : 'GitConfig',
    description: 'sets up global git configuration for symlinking',
    exec       : function(resolve, reject, shell, log, config) {
      const gitCredential = 'osxkeychain',
        gitEmail = config.gitCredentials.email,
        gitName = config.gitCredentials.name,
        nameCmd = `-e 's/AUTHORNAME/${gitName}/g'`,
        emailCmd = `-e 's/AUTHOREMAIL/${gitEmail}/g'`,
        credentialCmd = `-e 's/GIT_CREDENTIAL_HELPER/${gitCredential}/g'`,
        cG = `sed ${nameCmd} ${emailCmd} ${credentialCmd} ${PROPS.STARTER}`;

      shell.exec(cG, {silent: true})
        .stdout.to(PROPS.OUTPUT);
      log.info(`git config set for "${gitName}" with email "${gitEmail}"`);
      resolve();
    }
  };

exports.options = options;
