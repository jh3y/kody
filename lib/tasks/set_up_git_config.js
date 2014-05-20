
/*
kody - http://jh3y.github.io/kody

Git config set up.

Licensed under the MIT license

Jhey Tompkins (c) 2014.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var colors, pkg, prompt, setUp, shell, task_runner, utils;

colors = require("colors");

shell = require("shelljs");

pkg = require("../../package.json");

utils = require("../utils");

prompt = require("prompt");

prompt.message = "[ " + pkg.name.cyan + " ]";

prompt.delimiter = " ";

prompt.start();

task_runner = require("../task_runner");

exports.setUp = setUp = function() {
  var git_credential, uname;
  uname = shell.exec('uname -s', {
    silent: true
  });
  if (uname.output.indexOf('Darwin') !== -1) {
    git_credential = 'osxkeychain';
  }
  return prompt.get([
    {
      name: "name",
      description: "enter your github author name:"
    }, {
      name: "email",
      description: "enter your github email:"
    }
  ], function(err, result) {
    shell.exec("sed -e 's/AUTHORNAME/" + result.name + "/g' -e 's/AUTHOREMAIL/" + result.email + "/g' -e 's/GIT_CREDENTIAL_HELPER/" + git_credential + "/g' git/gitconfig.starter", {
      silent: true
    }).output.to('git/gitconfig.symlink');
    utils.log("git config set up and ready", "success");
    return task_runner.run();
  });
};
