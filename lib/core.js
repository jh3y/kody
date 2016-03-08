'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs'),
    winston = require('winston'),
    shell = require('shelljs');

var rc = JSON.parse(fs.readFileSync(process.cwd() + '/.kodyrc', 'utf-8'));

var defaults = {
  name: 'Generic task',
  exec: function exec() {
    return winston.info('running');
  }
};

var KodyTask = function () {
  function KodyTask() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? defaults : arguments[0];

    _classCallCheck(this, KodyTask);

    this.name = opts.name;
    this.exec = opts.exec;
  }

  _createClass(KodyTask, [{
    key: 'run',
    value: function run() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        winston.info('Running ' + _this.name);
        if (_this.exec && typeof _this.exec === 'function') _this.exec(resolve, reject, shell, winston, rc);
      });
    }
  }]);

  return KodyTask;
}();

exports.KodyTask = KodyTask;