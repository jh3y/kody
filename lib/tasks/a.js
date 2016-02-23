'use strict';

/**
  * Task - description
  * @license MIT
  * @author author
*/
var utils = require('../utils'),
    options = {
  name: 'Set up A',
  description: 'sets up A for use on system',
  exec: function exec(resolve, reject) {
    utils.log('setting up a .... buzz grrr ... bing');
    setTimeout(resolve, 5000);
  }
};

exports.options = options;