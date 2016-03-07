[![Build Status](https://travis-ci.org/jh3y/kody.svg)](http://travis-ci.org/jh3y/kody)

![alt tag](https://raw.github.com/jh3y/pics/master/kody/kody.png)
kody
===

_A `.files` and environment configuration manager for OSX created with node_

_inspired by Zach Holmans popular [dotfiles](https://github.com/holman/dotfiles), stripped down and written in node.js_

`kody` is a command line tool that helps you maintain your .files/configurations/installations etc.

* One command to take care of all the thingz!
* No restrictions on where you run from or store you symlink files.
* Easy to extend and tweak.
* Interactive CLI that prompts which tasks you want to run.
* Just needs `node` and your configuration files.


`kody` is essentially a task runner. It comes with one task that will symlink your .files to your `$HOME` directory. Anything else is defined by your own configuration.

## Installation
You'll need to install `node/npm` first as this is a dependency of `kody`.

1. Install `kody`
```shell
npm install -g kody
```
2. Set up your `kody_env`(can be named anything, mine is [here](https://github.com/jh3y/kody_env)!) directory and necessary files (Refer to [usage](#Usage))
3. Run `kody` from within your directory (if you're unsure about anything, backup your original symlinking files to be safe.)
```shell
kody
```
4. Enjoy not having to manually do everything to set up your machine :smile:!


## Usage
In order to use `kody` you'll need to set up a `kody` configuration directory containing a `.kodyrc` file.

Start out with the `dummy_env` directory as a starting point and extend from there if you get stuck. It's what I created my own `kody_env` from and does work.

### Symlinking
`kody` comes with a default task for symlinking files to your `$HOME` directory. The only requirement is that you suffix any files/directories with `.link` in order for those files/directories to be symlinked.

For example; a `kody` configuration directory containing a directory named `atom.link` would be symlinked to `.atom`.
```js
WHEREVER/atom.link -> $HOME/.atom
```

### .kodyrc file
The `.kodyrc` file is used to define variables that will be used by tasks that you define in your configuration. It will also define the order of any defined tasks.
#### An example
```json
{
  "order": [
    "a.js",
    "b.js",
    "*"
  ],
  "brewInstalls": [
    "git",
    "fish"
  ],
  "globalNpmModules": [
    "coffee-script",
    "bower"
  ]
}
```
The `order` key is the only key that is defined by `kody` and required if you need some tasks to run before others. In this example; `a` will run before `b`. A real example would be maybe say making sure `homebrew` would be installed before `brew cask` could be ran.

Any other keys in the `.kodyrc` file are purely user defined and made available in any tasks you write/use. For example; you could use an array with key `globalNpmModules` to define a set of global npm modules to install on your machine.

### Creating tasks
Defining tasks for `kody` to run is what automates your machine setup.
`kody` will automatically pick up any `.js` files within directories that contain `.tasks` in their name. For example; `kody.tasks/`.

A symlinking task is included with `kody`. The rest is your imagination.

The task boilerplate is as follows;

```js
const options = {
  name: 'Task A',
  description: 'A task that does something',
  exec: function(resolve, reject, shell, log, config) {
    // Do some stuff then resolve it.
    resolve();
  }
};

exports.options = options;
```
Tasks are defined by exporting an options object from `.js` files. You define `name`, `description` and `exec`.

* `name {string}` - defines a task name to be used by `kody`.
* `description {string}` - defines a description for a task.
* `exec {function}` - defines a function that will be run by `kody`. The parameters are important. You can name them whatever you want. The `resolve/reject` function must be invoked in order for the task to finish as `kody` relies on `Promises` to run through tasks. `shell` gives you access to the `shelljs` API. `log` gives you access to `kody`'s instance of `winston` logger. Lastly, `config` gives you access to the `.kodyrc` config object.

#### An example task
For an example task, let's install `Homebrew`, the package manager for `OSX`.

```js
const PROPS = {
    URL: 'https://raw.githubusercontent.com/Homebrew/install/master/install'
  },
  options = {
    name: 'homebrew',
    description: 'install and set up homebrew',
    exec: function(resolve, reject, shell, log, config) {
      const brewInstalled = shell.which('brew') !== null,
        packages = config.brewInstalls;
      if (!brewInstalled) {
        log.info('installing Homebrew');
        shell.exec(`ruby -e "$(curl -fsSL ${PROPS.URL})"`);
        log.success('Homebrew installed');
      } else
        log.warn('Homebrew already installed');
      shell.exec('brew doctor');
      log.warn(`NOTE: any info from brew doctor may
        account for any issues with package installs`);
      if (packages.length > 0) {
        shell.exec(`brew install ${packages.join(' ')}`);
        log.success('brew packages installed');
      }
      resolve();
    }
  };

exports.options = options;
```
#### Tasks that have already been written
* set up git
* write OSX defaults
* Install and set up Homebrew
* Install brew cask and install other programs supported by brew cask such as Spotify, Chrome, etc.
* Set up fish shell
* Install Atom IDE packages
* Remove unwanted default system applications



##Disclaimer
I've only used `kody` on OSX(Up to Yosemite, haven't braved Capitan yet) and therefore I can't say for sure how it will run on non-unix based systems etc. `kody` will essentially make symbollic links to the $HOME directory on your PATH and then runs commands from the command line that would normally be executed with bash such as `npm install`.

===

Any problems or questions, feel free to post an issue or tweet me, [@_jh3y](https://twitter.com/@_jh3y)!

@jh3y 2016
