/**
  * Task - description
  * @license MIT
  * @author author
*/
const winston = require('winston');
const options = {
  name       : 'Set up A',
  description: 'sets up A for use on system',
  exec       : function(resolve) {
    winston.warn('setting up a .... buzz grrr ... bing');
    setTimeout(resolve, 5000);
  }
};

exports.options = options;
