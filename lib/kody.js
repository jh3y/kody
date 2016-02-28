'use strict';

/**
  * kody - .files manager for node
*/
require('babel-polyfill');
var core = require('./core'),
    fs = require('fs'),
    inquirer = require('inquirer'),
    winston = require('winston');

/**
* Define a task order.
* This is useful for when you wish one task to run before
* another.
*
* For example; there is no use installing apm modules before
* Atom IDE is installed as the apm CLI won't be available.
*/
var PROPS = {
  TASK_ORDER: ['gitconfig.js', 'homebrew.js', 'brewCask.js', '*'],
  TASKS_QUERY: {
    type: 'checkbox',
    name: 'tasks',
    message: 'Choose the set up tasks you wish to run',
    choices: []
  }
},

/**
  * initializes Kody
  *
  * @returns {undefined}
*/
init = function init() {
  welcome();
  var files = fs.readdirSync(__dirname + '/tasks');
  files = files.sort(sortFiles);
  winston.info(files);
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
},

/**
  * loops through task objects and runs them
  *
  * @param {KodyTask[]} tasks - Array of KodyTask objects to be processed
  * @returns {undefined}
*/
processTasks = function processTasks(tasks) {
  var processTask = function processTask(task) {
    var newTask = new core.KodyTask(task.value);
    newTask.run().then(function () {
      winston.info('Task ' + newTask.name + ' has finished');
      var nextTask = tasksToProcess.next();
      if (nextTask.value) processTask(nextTask);else winston.silly('ALL TASKS FINISHED');
    }).then(function () {
      throw new Error('Something went wrong');
    });
  },
      tasksToProcess = tasks.tasks[Symbol.iterator]();
  processTask(tasksToProcess.next());
},

/**
  * used to sort ordering of task files based on desire.
  *
  * @param {string} a - string representing task filename
  * @param {string} b - string representing task filename
  * @returns {bool}   - used by Array.sort
*/
sortFiles = function sortFiles(a, b) {
  var aIndex = PROPS.TASK_ORDER.indexOf(a),
      bIndex = PROPS.TASK_ORDER.indexOf(b);
  if (bIndex !== -1 && aIndex !== -1 && aIndex < bIndex) return -1;
  if (aIndex !== -1 || bIndex !== -1) return 1;
},

/**
  * welcome msg for user
  *
  * @returns {undefined}
*/
welcome = function welcome() {
  winston.info('==================================');
  winston.info('kody - .files & config runner');
  winston.info('==================================');
};

exports.init = init;