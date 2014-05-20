###
kody - http://jh3y.github.io/kody

Task runner

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###

colors = require "colors"
pkg = require "../package.json"
shell = require "shelljs"
utils = require "./utils"
brewCask = require "./tasks/set_up_brew_cask"
dotfiles = require "./tasks/install_dot_files"
gitConfig = require "./tasks/set_up_git_config"
osx = require "./tasks/set_osx_defaults"
brew = require "./tasks/set_up_homebrew"
npm = require "./tasks/install_npm_modules"
fish = require "./tasks/set_up_fish_shell"
apm = require "./tasks/install_atom_packages"

KODY_CONFIG = `undefined`

taskMap =
  install_dot_files: dotfiles.install
  install_homebrew_and_packages: brew.install
  install_brew_cask_and_casks: brewCask.setUp
  install_npm_modules: npm.install
  install_apm_packages: apm.install
  set_fish_shell_as_default: fish.setDefault
  set_osx_defaults: osx.setDefault

grab_config = ()->
  path = process.cwd() + '/kody.json'
  KODY_CONFIG = require(path)

exports.init = init = ()->
  grab_config()
  if KODY_CONFIG isnt `undefined`
    if KODY_CONFIG.set_up_git_config
      utils.log "Setting up Git credentials", "prompt"
      gitConfig.setUp()
    else
      utils.log "Git credentials already set up", "info"
      run()

exports.run = run = ()->
  tasks = []
  for map of taskMap
    if KODY_CONFIG[map] is true
      tasks.push
        func: taskMap[map]
        args: KODY_CONFIG
  for key, value of tasks
    value.func KODY_CONFIG
  utils.log "kody has completed your set tasks!", "silly"
