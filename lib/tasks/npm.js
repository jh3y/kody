'use strict';

/**
  * npm installs - installs desired global modules
  * @license MIT
  * @author jh3y
*/
var shell = require('shelljs'),
    userConfig = require(process.cwd() + '/kody.json'),
    winston = require('winston');

var PROPS = {
  ERROR_MSG: 'npm is not installed',
  WARN: 'NOTE: incorrect npm permissions may cause an error.',
  FIX_URL: 'https://docs.npmjs.com/getting-started/fixing-npm-permissions'
},
    options = {
  name: 'npm installs',
  description: 'installs desired global modules',
  exec: function exec(resolve) {
    var npmWhich = shell.exec('which npm', { silent: true });
    if (npmWhich.output.trim() !== '') {
      var modules = userConfig.globalNpmModules;
      winston.warn(PROPS.WARN + ' See: ' + PROPS.FIX_URL);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var module = _step.value;

          winston.info('attempting to install ' + module);
          shell.exec('npm install -g ' + module);
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
    } else winston.error(PROPS.ERROR_MSG);
    resolve();
  }
};

exports.options = options;