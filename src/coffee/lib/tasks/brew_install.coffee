###
kody - http://jh3y.github.io/kody

Homebrew installation and installation of brew packages.

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###
colors = require "colors"
shell = require "shelljs"
pkg = require "../../package.json"
utils = require "../utils"

exports.install = install = (KODY_CONFIG)->
	if shell.exec("which brew", {silent: true}).output.trim() is ""
		utils.log "Attempting to intall Brew", "prompt"
		shell.exec('ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"')
		utils.log "Brew installed", "success"
	else
		utils.log "Brew already installed", "warn"
	utils.log "Now running 'brew doctor'", "prompt"
	shell.exec "brew doctor"
	utils.log "NOTE: Take notice of anything Brew doctor has said, it may account for any issues you have with install", "warn"
	if KODY_CONFIG.brew_installs.length > 0
		pckgToInstall =  KODY_CONFIG.brew_installs.join " "
		shell.exec "brew install " + pckgToInstall
	utils.log "Brew packages installed", "success"