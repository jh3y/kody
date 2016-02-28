'use strict';

var assert = require('assert'),
    kody = require('../lib/kody');

suite('kody', function () {
  suite('run', function () {
    test('should throw error if no config file present', function () {
      assert.throws(function () {
        kody.init();
      }, Error);
    });
  });
});