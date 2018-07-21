/**
 * kody - dotfiles manager in node!
 * @author jh3y - 2018
 * @license MIT
 */

import shell from 'shelljs'
import ora from 'ora'
import log, { detail } from './log'
const { info } = console
class Task {
  constructor(opts) {
    this.name = opts.name
    this.exec = opts.exec
    this.config = opts.config
  }
  run() {
    const { config, exec, name } = this
    return new Promise((resolve, reject) => {
      info(detail(`Running ${name}`))
      if (exec && typeof exec === 'function')
        exec(resolve, reject, shell, config, log, ora)
    })
  }
}

module.exports = Task
