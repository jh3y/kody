/**
  * kody - .files manager for node
*/

const polyfill = require('babel-polyfill'),
  colors       = require('colors'),
  shell        = require('shelljs'),
  inquirer     = require('inquirer'),
  pkg          = require('../package.json'),
  utils        = require('./utils'),
  fs           = require('fs'),
  task_runner  = require('./task_runner'),
  core         = require('./core'),
  PROPS        = {
    /**
      * Define a task order.
      * This is useful for when you wish one task to run before
      * another.
      *
      * For example; there is no use installing apm modules before
      * Atom IDE is installed as the apm CLI won't be available.
    */
    TASK_ORDER : [
      'gitconfig.js',
      '*'
    ],
    TASKS_QUERY: {
      type: 'checkbox',
      name: 'tasks',
      message: 'Choose the set up tasks you wish to run',
      choices: []
    }
  },
  welcome      = function() {
    utils.log('==================================', 'info');
    utils.log('kody - .files & config runner', 'info');
    utils.log('==================================', 'info');
  },
  processTasks = function(tasks) {
    tasks = tasks.tasks[Symbol.iterator]();
    let processTask = function(task) {
      let newTask = new core.KodyTask(task.value);
      newTask.run()
        .then(() => {
          utils.log(`Task ${newTask.name} has finished`, 'info');
          let nextTask = tasks.next();
          if (nextTask.value) {
            processTask(nextTask);
          } else {
            utils.log('ALL TASKS FINISHED', 'silly');
          }
        })
        .then(() => {
          throw new Error('Something went wrong');
        });
    };
    processTask(tasks.next());
  },
  sortFiles   = function(a, b) {
    if(PROPS.TASK_ORDER.indexOf(b) !== -1 && PROPS.TASK_ORDER.indexOf(a) !== -1 && PROPS.TASK_ORDER.indexOf(a) < PROPS.TASK_ORDER.indexOf(b)) {
      return -1;
    }
    if(PROPS.TASK_ORDER.indexOf(a) !== -1 || PROPS.TASK_ORDER.indexOf(b) !== -1) {
      return 1;
    }
  },
  init        = function() {
    welcome();
    let files = fs.readdirSync(__dirname + '/tasks');
    files = files.sort(sortFiles);
    for (let file of files) {
      let taskOpts = require(`./tasks/${file}`).options;
      let newChoice = {
        name: `${taskOpts.name} - ${taskOpts.description}`,
        value: taskOpts
      };
      PROPS.TASKS_QUERY.choices.push(newChoice);
    }
    inquirer.prompt(PROPS.TASKS_QUERY, processTasks);
  };

exports.init = init;
