'use strict';

/**
  * kody - .files manager for node
*/
require('babel-polyfill');

var fs = require('fs'),
    inquirer = require('inquirer'),
    winston = require('winston');

var rc = undefined;

/**
* Define a task order.
* This is useful for when you wish one task to run before
* another.
*
* For example; there is no use installing apm modules before
* Atom IDE is installed as the apm CLI won't be available.
*/
var PROPS = {
  TASKS_QUERY: {
    type: 'checkbox',
    name: 'tasks',
    message: 'Choose the set up tasks you wish to run',
    choices: []
  }
},

/**
  * returns tasks in a given directory
  *
  * @param {string} directory - directory to return tasks from.
  * @returns {array} - file contents of tasks.
*/
getTasks = function getTasks(directory) {
  var tasks = fs.readdirSync(directory);
  var addresses = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var task = _step.value;

      addresses.push(directory + '/' + task);
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

  return addresses;
},

/**
* initializes Kody
*
* @returns {undefined}
*/
init = function init() {
  welcome();
  try {
    rc = JSON.parse(fs.readFileSync(process.cwd() + '/.kodyrc', 'utf-8'));
  } catch (err) {
    throw Error('Missing .kodyrc file.');
  }
  var files = getTasks(__dirname + '/tasks');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = fs.readdirSync(process.cwd())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var dir = _step2.value;

      var isDir = fs.statSync(dir).isDirectory();
      var areTasks = dir.indexOf('.tasks') !== -1;
      if (isDir && areTasks) files = files.concat(getTasks(process.cwd() + '/' + dir));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  files = files.sort(sortFiles);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = files[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var file = _step3.value;

      var taskOpts = require('' + file).options;
      var newChoice = {
        name: taskOpts.name + ' - ' + taskOpts.description,
        value: taskOpts
      };
      PROPS.TASKS_QUERY.choices.push(newChoice);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
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
  var core = require('./core');
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
  var aIndex = rc.order.indexOf(a),
      bIndex = rc.order.indexOf(b);
  if (bIndex !== -1 && aIndex !== -1 && aIndex < bIndex) return -1;
  if (aIndex !== -1 || bIndex !== -1) return 1;
},

/**
  * welcome msg for user
  *
  * @returns {undefined}
*/
welcome = function welcome() {
  winston.info('===================================');
  winston.info('   kody - .files & config runner   ');
  winston.info('===================================');
};

exports.init = init;