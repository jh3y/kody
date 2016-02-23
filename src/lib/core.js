const utils = require('./utils'),
  defaults  = {
    name: 'Generic task',
    exec: e => utils.log('running', 'info')
  };

class KodyTask {
  constructor(opts = defaults) {
    this.name = opts.name;
    this.exec = opts.exec;
  }
  run() {
    return new Promise((resolve, reject) => {
      utils.log(`Running ${this.name}`, 'info');
      if (this.exec && typeof this.exec === 'function') {
        this.exec(resolve, reject);
      }
    });
  }
}

exports.KodyTask = KodyTask;
