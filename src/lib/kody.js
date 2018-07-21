/**
 * kody - dotfiles manager in node!
 * @author jh3y - 2018
 * @license MIT
 */

import { statSync, readFileSync, readdirSync } from 'fs'
import inquirer from 'inquirer'
import { find } from 'shelljs'
import { basename, extname, resolve } from 'path'
import ora from 'ora'
import log, { detail, fail, success, successBg, warning } from './log'
import pkg from '../package.json'
import Task from './core'
/* eslint-disable-next-line no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime'
const { error, info, warn } = console
const cwd = process.cwd()
class Kody {
  config = undefined
  /**
   * sort tasks based on desired running order
   *
   * @param { Array } tasks - list of task paths
   * @param { Array } order - defined running order represented as an Array
   */
  sortTasks = (tasks, order) => {
    const result = tasks.sort((a, b) => {
      const taskA = basename(a, '.js')
      const taskB = basename(b, '.js')
      const aIndex = order.indexOf(taskA)
      const bIndex = order.indexOf(taskB)
      let result = 0
      if (
        (aIndex !== -1 && bIndex === -1) ||
        (aIndex !== -1 && bIndex !== -1 && aIndex < bIndex)
      )
        result = -1
      if (
        (aIndex === -1 && bIndex !== -1) ||
        (aIndex !== -1 && bIndex !== -1 && bIndex < aIndex)
      )
        result = 1
      return result
    })
    return result
  }
  /**
   * get tasks under specified directory
   *
   * @param { String } dir - directory to look for tasks
   * @returns { Array } - array of task file paths
   */
  getTasks = dir => {
    const tasks = readdirSync(dir)
    let paths = []
    for (const task of tasks) {
      const p = `${dir}/${task}`
      const isDir = statSync(p).isDirectory()
      // Only accept files that have the .js extension
      // Or go deeper into directories
      if (!isDir && extname(p) === '.js') {
        paths.push(p)
      } else if (isDir) {
        paths = paths.concat(this.getTasks(p))
      }
    }
    return paths
  }
  /**
   * loops through task objects and runs them
   *
   * @param {Array} tasks - Array of task objects to be processed
   */
  processTasks = async tasks => {
    const { config } = this
    const tasksToProcess = tasks[Symbol.iterator]()
    const init = async task => {
      try {
        await processTask(task)
      } catch (err) {
        error(fail(err.message))
      }
    }
    /**
     * Recursive asynchronous function for processing each task
     *
     * @param { Object } task - task object detailing exec function etc.
     */
    const processTask = async task => {
      const newTask = new Task({ ...task.value, config })
      try {
        await newTask.run()
        info(success(`Task ${newTask.name} has finished`))
        const nextTask = tasksToProcess.next()
        if (nextTask.value) {
          init(nextTask)
        } else {
          info(success('All tasks have finished 🎉'))
        }
      } catch (err) {
        throw new Error(
          `There was an issue running ${newTask.name} 👎 : ${err.message}`
        )
      }
    }
    init(tasksToProcess.next())
  }
  init = () => {
    const loader = ora(`Searching ${cwd} for .kodyrc file`).start()
    try {
      const configPath = find('.').filter(f => f.match(/\.kodyrc$/))
      const configFile = readFileSync(configPath[0], 'utf-8')
      loader.stop()
      this.config = JSON.parse(configFile)
    } catch (err) {
      loader.stop()
      warn(warning('⚠️  No .kodyrc file found - will attempt to run any tasks'))
    }
  }
  prompt = async () => {
    const { config, getTasks, processTasks, sortTasks } = this
    let taskDirectory
    let runningOrder
    if (config) {
      taskDirectory = config.task_directory
      runningOrder = config.running_order
    }
    let taskDir = `${cwd}/kody.tasks`
    if (taskDirectory) taskDir = resolve(taskDirectory)
    let userTasks = []
    try {
      userTasks = getTasks(taskDir)
    } catch (err) {
      warn(
        warning('⚠️  No user tasks defined - will attempt to run dotfiles task')
      )
    }
    let tasks = [`${__dirname}/dotfiles.js`, ...userTasks]
    if (runningOrder && runningOrder.length)
      tasks = sortTasks(tasks, runningOrder)
    const inquirerConfig = {
      type: 'checkbox',
      name: 'tasks',
      message: 'Choose the tasks you wish to run',
      choices: [],
    }
    for (const task of tasks) {
      try {
        const value = require(`${task}`)
        const { name, exec, description } = value
        if (name && exec) {
          inquirerConfig.choices.push({
            name: `${name} - ${description}`,
            value,
          })
        }
      } catch (err) {
        throw new Error(`Invalid task file - ${err}`)
      }
    }
    const selection = await inquirer.prompt(inquirerConfig)
    if (selection.tasks.length) processTasks(selection.tasks)
    else info(detail('No tasks selected, see ya! 👋'))
  }
  /**
   * loops through task objects and runs them
   *
   * @param {Array} tasks - Array of task objects to be processed
   */
  welcome = () => {
    info(
      log(
        `
                  _____      ____
                  |   |______|  |
                  |  • _____ •  |
                  |   |_____|   |
                  |             |
                  |_____________|

      ----------------------------------------
        kody v${pkg.version} - .files & config runner
      ----------------------------------------
    `,
        successBg,
        'transparent'
      )
    )
  }
}
export default Kody
