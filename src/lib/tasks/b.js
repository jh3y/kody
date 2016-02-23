const winston = require('winston'),
  options     = {
    name: 'Set up B',
    description: 'sets up b for system wide use',
    exec: function(resolve, reject) {
      winston.warn('setting up b .... beezz brrr ... bazing');
      setTimeout(resolve, 3000);
    }
  };

exports.options = options;
