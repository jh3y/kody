'use strict';

/**
  * Task - description
  * @license MIT
  * @author author
*/

var options = {
  name: 'TASK-0001',
  description: 'sets up something',
  exec: function exec(resolve) {
    // NOTE: to reject, include reject parameter
    resolve();
  }
};

exports.options = options;