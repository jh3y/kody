'use strict';

/**
  * set up brew cask - install brew cask and install casks
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    userConfig = require(process.cwd() + '/kody.json'),
    winston = require('winston');

var options = {
  name: 'set up brew cask',
  description: 'install brew cask and install casks',
  exec: function exec(resolve) {
    var brewInstalled = shell.which('brew') !== null,
        casks = userConfig.brewCasks;
    if (brewInstalled && casks.length > 0) {
      shell.exec('brew prune');
      shell.exec('brew tap caskroom/cask');
      shell.exec('brew install brew-cask');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = casks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cask = _step.value;

          shell.exec('brew cask install ' + cask);
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

      winston.success('casks installed');
    } else winston.warn('brew-cask not installed. Either brew not installed\n        or no casks defined in kody.json');
    resolve();
  }
};

exports.options = options;