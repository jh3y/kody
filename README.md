[![NPM](https://nodei.co/npm/kody.png?downloads=true&downloadRank=true&stars=true)](https://github.com/jh3y/kody)

[![Build Status](https://travis-ci.org/jh3y/kody.svg)](http://travis-ci.org/jh3y/kody)
![img](https://img.shields.io/badge/version-2.0.0-000000.svg)
![img](https://img.shields.io/badge/language-JS-9a12b3.svg)
![img](https://img.shields.io/badge/license-MIT-22a7f0.svg)

# kody
![alt tag](https://raw.github.com/jh3y/pics/master/kody/kody.png)


## _An interactive `.files` and environment configuration tool created with node_

_Inspired by Zach Holmans popular [dotfiles](https://github.com/holman/dotfiles), stripped down and written in node_

* One command
* No restrictions on where you run from or store your dotfiles
* Easy to configure, extend and tweak
* Interactive CLI that prompts which tasks you want to run
* Just needs `node` and your dotfiles!

![alt tag](https://raw.github.com/jh3y/pics/master/kody/basic-tasks.gif)

## Index

* [What is kody?](https://github.com/jh3y/kody#what-is-kody)
* [What else would I use it for?](https://github.com/jh3y/kody#what-else-would-i-use-it-for)
* [Installation](https://github.com/jh3y/kody#installation)
* [Usage](https://github.com/jh3y/kody#usage)
  * [Installing dotfiles](https://github.com/jh3y/kody#installing-dotfiles)
  * [Tasks](https://github.com/jh3y/kody#tasks)
    * [Hello World!](https://github.com/jh3y/kody#hello-world)
  * [.kodyrc file](https://github.com/jh3y/kody#.kodyrc-file)
    * [An example .kodyrc file](https://github.com/jh3y/kody#an-example-.kodyrc-file)
  * [A real task](https://github.com/jh3y/kody#a-real-task)
  * [Tasks that have already been created](https://github.com/jh3y/kody#tasks-that-have-already-been-created)
* [Examples](https://github.com/jh3y/kody#examples)
* [Development](https://github.com/jh3y/kody#development)
* [Under the hood](https://github.com/jh3y/kody#under-the-hood)
* [Disclaimer](https://github.com/jh3y/kody#disclaimer)
* [Contributing](https://github.com/jh3y/kody#contributing)

## What is kody
`kody` is more than a dotfiles installer. Out of the box, it can handle symlinking your version controlled files to a desired directory. It will also backup your originals if you wish 👍

But it can do much more! And it's up to you how creative you want to get 🐻

You create some tasks to set up your machine, run `kody`, and `kody` will go ahead and run the tasks you tell it to!

## What else would I use it for
You can use `kody` to automate most things.

For example, fed up of installing a bunch of apps when you set up a machine? Create a small task to install `homebrew`, configure a list of apps you want and tell `kody` to do it for you! 😉

Or how about automating your shell configuration or IDE set up! They can be time consuming 😅

You can see some examples in the `examples` section below 👍

## Installation
You'll need to install `node/npm` first as this is a dependency of `kody`.
Then, install `kody` globally 👍
```shell
npm i -g kody
```

## Usage
### Installing Dotfiles
Out of the box, `kody` comes with dotfile installation. `kody` will symlink your version controlled dotfiles to a directory of your choosing. The default is `$HOME`.

`kody` needs to know which files to symlink. So any files or directories you wish to symlink should have the suffix `.link`.

For example; I want to install a dotfile for a `.gitignore` file. Rename your version controlled `.gitignore` to `.gitignore.link` and then run `kody` in that directory. The same works for directories if you want to symlink the contents of a directory.

```shell
/my/version/controlled/dotfiles/repo/.gitignore.link -> $HOME/.gitignore
```

`kody` will also prompt you to see if you'd like to backup your original dotfiles. It will backup the original to the same destination with the `.bak` suffix.

That's all you need to manage and install your dotfiles 💪

### Tasks
Now the fun starts! 😉

You can also use kody to automate various defined tasks.

Let's start with the basics.

By default, all tasks live inside a `kody.tasks` directory. You can configure this (we will get to that). kody will search the directory for all the JavaScript files it can find. You can nest tasks.

Each task file exposes an object that must consist of at least a `name` and an `exec` function. The `description` property is metadata to give a friendly description of tasks. `description` will be rendered when choosing which tasks to run.

```js
module.exports = {
  name: '🦄',
  description: 'A truly magical task',
  exec: (resolve, reject, shell, config, log, ora) => {}
}
```
The `exec` function is what gets run by `kody`. You can do whatever you like inside this function but the arguments passed in are important. This is how `kody` exposes various things to the user. You are of course free to name the parameters however you wish 😄

Let's run through them 👍
* `resolve/reject` - `kody` uses `Promise`s so the first two arguments enable you to inform `kody` of when to move on. If your task is complete, invoke `resolve`. If your task stumbles, make use of `reject` 🛑
* `shell` - one of the main things when automating set up etc. is running various shell commands. `kody` exposes the `shelljs` API to your tasks. We will use this in the `Hello World` example
* `config` - a major thing with set ups is being able to keep everything in one config file. This way you won't have to hard code values into your tasks. `kody` will search for a `.kodyrc` file on start and pass that configuration object to your tasks. In here you can define any `JSON` you want. For example, a list of apps to install, editor plugins to install etc. Define under keys and access them in your tasks 👊
* `log` - `kody` exposes a simple color logging utility that uses `chalk`. It's a function that takes three parameters. The first is the message you want to display. The second and third are the text color and background color respectively. The function expects color represented by a hexidecimal value 👍 You use this `log` function inside your standard `console` invocation.
* `ora` - `kody` exposes the `ora` API so you can fire up a terminal spinner when needed too!


#### Hello World
For our first task, why not "Hello World!"? 😅

We will use `shelljs` to invoke `say`.

```javascript
const task = {
  name: 'Hello World 👋',
  description: 'Hey from kody 🐻',
  exec: (resolve, reject, shell) => {
    shell.exec('say hello world!')
    resolve()
  }
}
module.exports = task
```
That's it! Run `kody` in the parent of your tasks directory and choose the `Hello World` task. Depending on your OS, you should hear `Hello World!` 🎉

### .kodyrc file
The `.kodyrc` file was mentioned briefly above. It's used to define values and configuration for your tasks.
It also has two special keys. Both are _optional_

* `task_directory` - this specifies the location of your tasks relative to your current working directory
* `running_order` - this specifies a running order for your tasks

#### An example .kodyrc
```json
{
  "task_directory": "./awesome-tasks",
  "running_order": [
    "b",
    "a",
    "*"
  ],
  "brewInstalls": [
    "google-chrome",
    "visual-studio-code"
  ],
}
```
In this `.kodyrc` file we specify that tasks are under `./awesome-tasks`. We also state that tasks run in any order but `b` must run before `a`.
It's important to note that running order entries are task file names and not the name of the task. The extension is not necessary.

Any other keys in the `.kodyrc` file are user defined and made available in any tasks you write/use. In this example, we have `brewInstalls` which could be an array of homebrew casks to install.

### A real task
For a real task example, let's install `Homebrew`.

```js
const { info } = console
const HOMEBREW_URL =
  'https://raw.githubusercontent.com/Homebrew/install/master/install'
const task = {
  name: 'Homebrew',
  description: 'Install and set up Homebrew',
  exec: function(resolve, reject, shell, config, log) {
    const { brew_installs: packages } = config
    const brewInstalled = shell.which('brew') !== null
    if (!brewInstalled) {
      try {
        info(log('Installing Homebrew'))
        const result = shell.exec(`ruby -e "$(curl -fsSL ${PROPS.URL})"`)
        if (result.code !== 0) throw new Error(result.stderr)
        else info(log('Homebrew installed'))
      } catch (err) {
        throw new Error(err)
      }
    } else info(log('Homebrew already installed'))
    info(log('Running brew doctor'))
    shell.exec('brew doctor')
    info(
      log(
        `NOTE: Any info from brew doctor may account for any issues with package installs`
      )
    )
    if (packages && packages.length > 0) {
      info(log(`Installing ${packages.join(' ')}`))
      shell.exec(`brew install ${packages.join(' ')}`)
      info(log('Brew packages installed'))
    } else {
      info(log('No brew packages to install'))
    }
    resolve()
  },
}

module.exports = task
```
It may look like there's a lot going on here. But the majority of this is actually logging to the `console` 😅

### Tasks that have already been created
* Set up git
* Write OSX defaults
* Install and set up Homebrew
* Install programs supported by brew cask such as Spotify, Chrome, etc.
* Set up fish shell
* Set up oh-my-zsh
* Install Atom IDE packages
* Install and set up Visual Studio Code
* Remove unwanted default system applications

## Examples
* [Jhey's .files](https://github.com/jh3y/kody_env) - My personal kody set up. Sets up IDE, installs programs, configures shell etc.

## Development
`kody` is easy to work on. It uses a self-documented `Makefile`.

Just run `make` to see what tasks are available.

First things first is to pull in dependencies with `make setup`.

Then you'll be wanting to use `make develop` to start work. Use `npm link` to get a global instance of what you're working on available in the shell. You can test this by running `kody --version`.

It's best to create a dummy folder that you can test things out in. This reduces the risk of breaking your `$HOME` setup.

Enjoy! 😎

## Under the hood
`kody` is written using `es6` with `babel` and is developed using a self-documented `Makefile`.

## Disclaimer
I've only used `kody` on OSX. I'm not responsible if you bork your machine configuration 😅 However, I'm happy to try and help you out if you get stuck!

## Contributing
Any problems or questions, feel free to post an issue or tweet me, [@jh3yyy](https://twitter.com/@jh3yyy)! 🐦

------

Made with 🐻s by @jh3y 2018
