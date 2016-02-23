const utils = require('../utils'),
  options   = {
    name: 'Set up B',
    description: 'sets up b for system wide use',
    exec: function(resolve, reject) {
      utils.log('setting up b .... beezz brrr ... bazing');
      setTimeout(resolve, 3000);
    }
  };

exports.options = options;
