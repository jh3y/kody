const winston = require('winston'),
  defaults    = {
    name: 'Generic task',
    exec: e => winston.info('running')
  };

class KodyTask {
  constructor(opts = defaults) {
    this.name = opts.name;
    this.exec = opts.exec;
  }
  run() {
    return new Promise((resolve, reject) => {
      winston.info(`Running ${this.name}`);
      if (this.exec && typeof this.exec === 'function') {
        this.exec(resolve, reject);
      }
    });
  }
}

exports.KodyTask = KodyTask;
