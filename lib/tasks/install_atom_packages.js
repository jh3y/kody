
/*
kody - http://jh3y.github.io/kody

Apm install - installs all your atom IDE apm packages

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var colors, install, pkg, shell, utils;

colors = require("colors");

shell = require("shelljs");

pkg = require("../../package.json");

utils = require("../utils");

exports.install = install = function(KODY_CONFIG) {
  var index, pckg, _ref;
  if (shell.which("apm").trim() !== "" && Object.keys(KODY_CONFIG.apm_packages).length > 0) {
    utils.log("Installing apm packages", "prompt");
    _ref = KODY_CONFIG.apm_packages;
    for (index in _ref) {
      pckg = _ref[index];
      shell.exec("apm install " + pckg);
    }
    return utils.log("Npm modules installed globally", "success");
  }
};
