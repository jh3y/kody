'use strict';

/**
  * Remove OSX apps - removes unwanted default OSX apps
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    userConfig = require(process.cwd() + '/kody.json'),
    winston = require('winston');

var options = {
  name: 'Remove OSX apps',
  description: 'removes unwanted default OSX apps',
  exec: function exec(resolve) {
    var space = new RegExp(' ', 'g');
    var apps = userConfig.osxAppsToRemove;
    if (apps && apps.length > 0) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = apps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var app = _step.value;

          var sanitizedApp = app.replace(space, '\\ ');
          shell.exec('sudo rm -rf /Applications/' + sanitizedApp);
          winston.info(sanitizedApp + ' removed from system');
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

      winston.success('default OSX applications removed');
    } else winston.info('no apps to remove');
    resolve();
  }
};

exports.options = options;