###
kody - http://jh3y.github.io/kody

.Files installation task

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###
colors = require "colors"
pkg = require "../../package.json"
shell = require "shelljs"
utils = require "../utils"

exports.install = install = () ->
	HOME_DIR = shell.exec("echo $HOME", {silent: true}).output.trim()
	dotfiles = shell.exec("find  */*.link *.link", {silent: true}).output
	if dotfiles.indexOf("*/*.link *.link") is -1
		dotfiles = dotfiles.split '\n'
		dotfiles.pop()
		elementsfiltered = `undefined`
		dotfiles.filter((a) ->
			if a.split(".link").length is 2 and a.split('.link')[1].trim() is ""
				@push a
			true
		, elementsfiltered = [])
		dotfiles = elementsfiltered
		if dotfiles.length > 0
			utils.log "Linking .files to your home directory", "prompt"
			for key, value of dotfiles
				source = process.cwd() + '/' + value
				basename = shell.exec("basename " + value, {silent: true}).output.trim()
				if basename.indexOf('.link') isnt -1
					basename = "/." + basename.replace ".link", ""
					destination = HOME_DIR  + basename
					shell.ln '-sf', source, destination
					utils.log 'linked ' + source + ' to ' + destination + '!', "info"
		else
			utils.log "No .files found", "error"