/**
  * Remove OSX apps - removes unwanted default OSX apps
  * @license MIT
  * @author jh3y
*/
const shell   = require('shelljs'),
  userConfig  = require(`${process.cwd()}/kody.json`),
  winston     = require('winston');

const options = {
  name: 'Remove OSX apps',
  description: 'removes unwanted default OSX apps',
  exec: function(resolve) {
    const space = new RegExp(' ', 'g');
    const apps = userConfig.osxAppsToRemove;
    if (apps && apps.length > 0) {
      for (const app of apps) {
        const sanitizedApp = app.replace(space, '\\ ');
        shell.exec(`sudo rm -rf /Applications/${sanitizedApp}`);
        winston.info(`${sanitizedApp} removed from system`);
      }
      winston.success('default OSX applications removed');
    } else
      winston.info('no apps to remove');
    resolve();
  }
};

exports.options = options;
