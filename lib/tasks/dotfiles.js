'use strict';

/**
  * DotFiles - set up symlinks for dotfiles suffixed with .link
  * @license MIT
  * @author jh3y
*/

var shell = require('shelljs'),
    winston = require('winston'),
    PROPS = {
  HOME_CMD: 'echo $HOME',
  EMPTY_MSG: 'no .files for linking.',
  FILE_REGEXP: /\.link$/,
  FILE_SUFFIX: '.link'
},
    options = {
  name: 'DotFiles',
  description: 'sets up symlinks for global dotfiles',
  exec: function exec(resolve, reject) {
    // grab the home directory for the user.
    var $HOME = shell.exec(PROPS.HOME_CMD, {
      silent: true
    }).output.trim(),

    // grab instances, these are files/dirs suffixed with ".link"
    dotFiles = shell.find('.').filter(function (file) {
      return file.match(PROPS.FILE_REGEXP);
    });

    if (dotFiles.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dotFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dotFile = _step.value;

          var source = process.cwd() + '/' + dotFile;
          var basename = dotFile;
          if (basename.indexOf('/') !== -1) {
            basename = basename.substr(basename.lastIndexOf('/') + 1);
          }
          basename = basename.replace(PROPS.FILE_SUFFIX, '');
          var destination = $HOME + '/.' + basename;
          winston.success('linked ' + basename + ' to ' + destination);
          // shell.ln('-sf', source, destination);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
        winston.info(PROPS.EMPTY_MSG);
      }
    resolve();
  }
};

exports.options = options;