/**
  * npm installs - installs desired global modules
  * @license MIT
  * @author jh3y
*/
const PROPS   = {
    ERROR_MSG: 'npm is not installed',
    WARN: 'NOTE: incorrect npm permissions may cause an error.',
    FIX_URL: 'https://docs.npmjs.com/getting-started/fixing-npm-permissions'
  },
  options = {
    name: 'npm installs',
    description: 'installs desired global modules',
    exec: function(resolve, reject, shell, log, config) {
      const npmWhich = shell.exec('which npm', {silent: true});
      if (npmWhich.output.trim() !== '') {
        const modules = config.globalNpmModules;
        log.warn(`${PROPS.WARN} See: ${PROPS.FIX_URL}`);
        for (const module of modules) {
          log.info(`attempting to install ${module}`);
          shell.exec(`npm install -g ${module}`);
        }
      } else
        log.error(PROPS.ERROR_MSG);
      resolve();
    }
  };

exports.options = options;
