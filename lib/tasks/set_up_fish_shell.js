
/*
kody - http://jh3y.github.io/kody

Sets Fish as default shell.

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
  var found;
  found = shell.exec("find fish/set_default.*", {
    silent: true
  }).output;
  if (found.indexOf("fish/set_default.*") === -1) {
    utils.log("Setting Fish as default shell", "prompt");
    found = found.trim();
    shell.exec("sh ./" + found);
    return utils.log("Fish set as default shell", "success");
  } else {
    return utils.log("No shell script file found for setting fish as default", "error");
  }
};
