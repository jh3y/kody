/**
  * Task - description
  * @license MIT
  * @author author
*/
const utils = require('../utils'),
  options   = {
    name: 'Set up A',
    description: 'sets up A for use on system',
    exec: function(resolve, reject) {
      utils.log('setting up a .... buzz grrr ... bing');
      setTimeout(resolve, 5000);
    }
  };

exports.options = options;
