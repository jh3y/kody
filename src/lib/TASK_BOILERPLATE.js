/**
  * Task - description
  * @license MIT
  * @author author
*/

const options = {
  name: 'TASK-0001',
  description: 'sets up something',
  exec: function(resolve) { // NOTE: to reject, include reject parameter
    resolve();
  }
};

exports.options = options;
