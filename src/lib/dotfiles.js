/**
 * Dotfiles - set up symlinks for dotfiles suffixed with .link
 * @author jh3y - 2018
 * @license MIT
 */
import inquirer from 'inquirer'
import { warning, detail } from './log'
import { existsSync } from 'fs'
import { exec, find, ln, rm, cp } from 'shelljs'
/* eslint-disable-next-line no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime'
import { basename } from 'path'
const { info, warn } = console

const PROPS = {
  FILE_REGEXP: /\.link$/,
  FILE_SUFFIX: '.link',
}

const backupDotfile = dest => {
  if (existsSync(dest)) {
    const bak = `${dest}.bak`
    info(detail(`Backing up ${dest} to ${bak}`))
    cp('-rf', dest, bak)
    rm('-rf', dest)
  }
}

const restoreDotfile = dest => {
  const bak = `${dest}.bak`
  if (existsSync(bak)) {
    info(detail(`Putting original back ${dest}`))
    cp('-rf', bak, dest)
    info(detail(`Removing symlink backup from ${dest}.bak`))
    rm('-rf', bak)
  }
}

const symlinkDotfile = (source, dest, backup) => {
  info(detail(`Symlinking ${source} to ${dest}`))
  if (backup) backupDotfile(dest)
  const result = ln('-sf', source, dest)
  if (result.code !== 0) {
    if (backup) restoreDotfile(dest)
    throw new Error(result.stderr)
  }
}

const task = {
  name: 'Dotfiles',
  description: 'set up symlinks for global dotfiles',
  exec: async (resolve, reject, shell, config, log, ora) => {
    try {
      const load = ora(`Searching for dotfiles under ${process.cwd()}`).start()
      const files = find('.').filter(function(f) {
        return f.match(PROPS.FILE_REGEXP)
      })
      load.stop()
      if (files.length) {
        let $HOME = exec('echo $HOME', { silent: true }).trim()
        const input = await inquirer.prompt([
          {
            type: 'input',
            name: 'dir',
            message: 'Where would you like to symlink your dotfiles to?',
            default: $HOME,
          },
          {
            type: 'confirm',
            name: 'backup',
            message: 'Would you like to back up any current dotfiles?',
            default: true,
          },
        ])
        const currentDir = process.cwd()
        for (const file of files) {
          const source = `${currentDir}/${file}`
          let name = basename(file).replace(PROPS.FILE_SUFFIX, '')
          const dest = `${input.dir}/${name}`
          if (!existsSync(input.dir))
            throw new Error('Provided symlink directory does not exist')
          try {
            symlinkDotfile(source, dest, input.backup)
          } catch (err) {
            throw new Error(err)
          }
        }
      } else {
        warn(warning(`⚠️  No dotfiles found under ${process.cwd()}`))
        resolve()
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  },
}
module.exports = { ...task, symlinkDotfile }
