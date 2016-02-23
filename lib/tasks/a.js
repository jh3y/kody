'use strict';

/**
  * Task - description
  * @license MIT
  * @author author
*/
var winston = require('winston');
var options = {
  name: 'Set up A',
  description: 'sets up A for use on system',
  exec: function exec(resolve) {
    winston.warn('setting up a .... buzz grrr ... bing');
    setTimeout(resolve, 5000);
  }
};

exports.options = options;