
/*
kody - http://jh3y.github.io/kody

OSX Defaults writer.

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var colors, pkg, setDefault, shell, utils;

colors = require("colors");

shell = require("shelljs");

pkg = require("../../package.json");

utils = require("../utils");

exports.setDefault = setDefault = function() {
  var found, uname;
  uname = shell.exec('uname -s', {
    silent: true
  });
  if (uname.output.indexOf('Darwin') !== -1) {
    found = shell.exec("find osx/set_default.*", {
      silent: true
    }).output;
    if (found.indexOf("osx/set_default.*") === -1) {
      utils.log("Setting Apple OSX Defaults", "prompt");
      found = found.trim();
      shell.exec("sh ./" + found);
      return utils.log("Apple OSX defaults set", "success");
    } else {
      return utils.log("No shell script file found for setting OSX Defaults", "error");
    }
  }
};
