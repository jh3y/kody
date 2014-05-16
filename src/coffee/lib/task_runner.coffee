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
brew_cask = require "./tasks/set_up_brew_cask"
dot_files = require "./tasks/install_dot_files"
git_config = require "./tasks/git_config"
osx = require "./tasks/osx"
brew = require "./tasks/brew_install"
npm = require "./tasks/npm_install"
fish = require "./tasks/fish"

KODY_CONFIG = `undefined`

taskMap = 
	write_osx_defaults: osx.set_default
	install_dot_files: dot_files.install
	set_up_brew_cask: brew_cask.set_up
	brew_install: brew.install
	install_npm_modules: npm.install
	set_fish_shell_as_default: fish.set_default

grab_config = ()->
	path = process.cwd() + '/kody.json'
	KODY_CONFIG = require(path)

exports.init = init = ()->
	grab_config()
	if KODY_CONFIG isnt `undefined`
		if KODY_CONFIG.set_up_git
			utils.log "Setting up Git credentials", "prompt"
			git_config.set_up()
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