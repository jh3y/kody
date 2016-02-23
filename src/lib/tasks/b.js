const winston = require('winston');
const options = {
  name       : 'Set up B',
  description: 'sets up b for system wide use',
  exec       : function(resolve) {
    winston.warn('setting up b .... beezz brrr ... bazing');
    setTimeout(resolve, 3000);
  }
};

exports.options = options;
