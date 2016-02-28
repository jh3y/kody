/**
  * npm installs - installs desired global modules
  * @license MIT
  * @author jh3y
*/
const shell  = require('shelljs'),
  userConfig = require(`${process.cwd()}/kody.json`),
  winston    = require('winston');

const PROPS   = {
    ERROR_MSG: 'npm is not installed',
    WARN: 'NOTE: incorrect npm permissions may cause an error.',
    FIX_URL: 'https://docs.npmjs.com/getting-started/fixing-npm-permissions'
  },
  options = {
    name: 'npm installs',
    description: 'installs desired global modules',
    exec: function(resolve) {
      const npmWhich = shell.exec('which npm', {silent: true});
      if (npmWhich.output.trim() !== '') {
        const modules = userConfig.globalNpmModules;
        winston.warn(`${PROPS.WARN} See: ${PROPS.FIX_URL}`);
        for (const module of modules) {
          winston.info(`attempting to install ${module}`);
          shell.exec(`npm install -g ${module}`);
        }
      } else
        winston.error(PROPS.ERROR_MSG);
      resolve();
    }
  };

exports.options = options;
