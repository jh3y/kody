/**
  * DotFiles - set up symlinks for dotfiles suffixed with .link
  * @license MIT
  * @author jh3y
*/

const shell = require('shelljs'),
  winston   = require('winston');

const PROPS     = {
    HOME_CMD   : 'echo $HOME',
    EMPTY_MSG  : 'no .files for linking.',
    FILE_REGEXP: /\.link$/,
    FILE_SUFFIX: '.link'
  },
  options = {
    name: 'DotFiles',
    description: 'sets up symlinks for global dotfiles',
    exec: function(resolve) {
      // grab the home directory for the user.
      const $HOME  = shell.exec(PROPS.HOME_CMD, {
          silent: true
        }).output.trim(),
        // grab instances, these are files/dirs suffixed with ".link"
        dotFiles = shell.find('.')
          .filter(function(file) {
            return file.match(PROPS.FILE_REGEXP);
          });

      if (dotFiles.length > 0)
        for (const dotFile of dotFiles) {
          const source = `${process.cwd()}/${dotFile}`;
          let basename = dotFile;
          if (basename.indexOf('/') !== -1)
            basename = basename.substr(basename.lastIndexOf('/') + 1);
          basename = basename.replace(PROPS.FILE_SUFFIX, '');
          const destination = `${$HOME}/.${basename}`;
          winston.info(`${source}`);
          winston.success(`linked ${basename} to ${destination}`);
          // shell.ln('-sf', source, destination);
        }
      else
        winston.info(PROPS.EMPTY_MSG);
      resolve();
    }
  };

exports.options = options;
