'use strict';

/**
  * kody - .files manager for node
*/

var polyfill = require('babel-polyfill'),
    colors = require('colors'),
    shell = require('shelljs'),
    inquirer = require('inquirer'),
    pkg = require('../package.json'),
    winston = require('winston'),
    fs = require('fs'),
    task_runner = require('./task_runner'),
    core = require('./core'),
    PROPS = {
  /**
    * Define a task order.
    * This is useful for when you wish one task to run before
    * another.
    *
    * For example; there is no use installing apm modules before
    * Atom IDE is installed as the apm CLI won't be available.
  */
  TASK_ORDER: ['gitconfig.js', '*'],
  TASKS_QUERY: {
    type: 'checkbox',
    name: 'tasks',
    message: 'Choose the set up tasks you wish to run',
    choices: []
  }
},
    welcome = function welcome() {
  winston.info('==================================');
  winston.info('kody - .files & config runner');
  winston.info('==================================');
},
    processTasks = function processTasks(tasks) {
  tasks = tasks.tasks[Symbol.iterator]();
  var processTask = function processTask(task) {
    var newTask = new core.KodyTask(task.value);
    newTask.run().then(function () {
      winston.info('Task ' + newTask.name + ' has finished');
      var nextTask = tasks.next();
      if (nextTask.value) {
        processTask(nextTask);
      } else {
        winston.silly('ALL TASKS FINISHED');
      }
    }).then(function () {
      throw new Error('Something went wrong');
    });
  };
  processTask(tasks.next());
},
    sortFiles = function sortFiles(a, b) {
  if (PROPS.TASK_ORDER.indexOf(b) !== -1 && PROPS.TASK_ORDER.indexOf(a) !== -1 && PROPS.TASK_ORDER.indexOf(a) < PROPS.TASK_ORDER.indexOf(b)) {
    return -1;
  }
  if (PROPS.TASK_ORDER.indexOf(a) !== -1 || PROPS.TASK_ORDER.indexOf(b) !== -1) {
    return 1;
  }
},
    init = function init() {
  welcome();
  var files = fs.readdirSync(__dirname + '/tasks');
  files = files.sort(sortFiles);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      var taskOpts = require('./tasks/' + file).options;
      var newChoice = {
        name: taskOpts.name + ' - ' + taskOpts.description,
        value: taskOpts
      };
      PROPS.TASKS_QUERY.choices.push(newChoice);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  inquirer.prompt(PROPS.TASKS_QUERY, processTasks);
};

exports.init = init;