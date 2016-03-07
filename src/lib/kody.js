/**
  * kody - .files manager for node
*/
require('babel-polyfill');

const fs   = require('fs'),
  inquirer = require('inquirer'),
  winston  = require('winston');

let rc;

/**
* Define a task order.
* This is useful for when you wish one task to run before
* another.
*
* For example; there is no use installing apm modules before
* Atom IDE is installed as the apm CLI won't be available.
*/
const PROPS = {
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
  getTasks = function(directory) {
    const tasks = fs.readdirSync(directory);
    const addresses = [];
    for (const task of tasks)
      addresses.push(`${directory}/${task}`);
    return addresses;
  },
  /**
  * initializes Kody
  *
  * @returns {undefined}
  */
  init = function() {
    welcome();
    try {
      rc = JSON.parse(fs.readFileSync(`${process.cwd()}/.kodyrc`, 'utf-8'));
    } catch (err) {
      throw Error('Missing .kodyrc file.');
    }
    let files = getTasks(`${__dirname}/tasks`);
    for (const dir of fs.readdirSync(process.cwd())) {
      const isDir = fs.statSync(dir).isDirectory();
      const areTasks = dir.indexOf('.tasks') !== -1;
      if (isDir && areTasks)
        files = files.concat(getTasks(`${process.cwd()}/${dir}`));
    }
    if (rc && rc.order && rc.order.length > 0)
      files = files.sort(sortFiles);
    for (const file of files) {
      const taskOpts = require(`${file}`).options;
      const newChoice = {
        name: `${taskOpts.name} - ${taskOpts.description}`,
        value: taskOpts
      };
      PROPS.TASKS_QUERY.choices.push(newChoice);
    }
    inquirer.prompt(PROPS.TASKS_QUERY, processTasks);
  },
  /**
    * loops through task objects and runs them
    *
    * @param {KodyTask[]} tasks - Array of KodyTask objects to be processed
    * @returns {undefined}
  */
  processTasks = function(tasks) {
    const core = require('./core');
    const processTask = function(task) {
        const newTask = new core.KodyTask(task.value);
        newTask.run()
          .then(() => {
            winston.info(`Task ${newTask.name} has finished`);
            const nextTask = tasksToProcess.next();
            if (nextTask.value)
              processTask(nextTask);
            else
              winston.silly('ALL TASKS FINISHED');
          })
          .then(() => {
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
  sortFiles   = function(a, b) {
    const aIndex = rc.order.indexOf(a),
      bIndex     = rc.order.indexOf(b);
    if (bIndex !== -1 && aIndex !== -1 && aIndex < bIndex)
      return -1;
    if (aIndex !== -1 || bIndex !== -1)
      return 1;
  },
  /**
    * welcome msg for user
    *
    * @returns {undefined}
  */
  welcome      = function() {
    winston.info('===================================');
    winston.info('   kody - .files & config runner   ');
    winston.info('===================================');
  };

exports.init = init;
