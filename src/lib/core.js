const fs = require('fs'),
  winston = require('winston'),
  shell = require('shelljs');

const rc = JSON.parse(fs.readFileSync(`${process.cwd()}/.kodyrc`, 'utf-8'));

const defaults    = {
  name: 'Generic task',
  exec: () => winston.info('running')
};

class KodyTask {
  constructor(opts = defaults) {
    this.name = opts.name;
    this.exec = opts.exec;
  }
  run() {
    return new Promise((resolve, reject) => {
      winston.info(`Running ${this.name}`);
      if (this.exec && typeof this.exec === 'function')
        this.exec(resolve, reject, shell, winston, rc);
    });
  }
}

exports.KodyTask = KodyTask;
