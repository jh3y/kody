[![Build Status](https://travis-ci.org/jh3y/kody.svg)](http://travis-ci.org/jh3y/kody)

kody
===

_A `.files` runner/manager written in node_

_kody is essentially a port of/inspired by Zach Holmans popular [dotfiles](https://github.com/holman/dotfiles) stripped down for what I need and written in node.js_

`kody` is a command line tool that helps you maintain your .files/configurations/installations etc.

* One command will take care of things.
* No restrictions on where you run from or store you symlink files.
* Easy to extend and tweak.
* Set what tasks you want to run and packages you want to install from one config file.
* just needs node.

##current implemented tasks

* set up git
* symlink config files to home directory
* write OSX defaults
* Install and set up Homebrew
* Install brew cask and install other programs supported by brew cask such as Spotify, Chrome, etc.
* Set fish shell as default shell(only worth running if you've installed fish)
* Install Atom IDE packages

##disclaimer
I've only used `kody` on OSX and therefore I can't say for sure how it will run on non-unix based systems etc. `kody` will essentially make symbollic links to the $HOME directory on your PATH and then runs commands from the command line that would normally be executed with bash such as `npm install`.

##installation
As a prerequisite it's assumed you have `npm` installed as this is the one dependency for using `kody`.

1. Install `kody`

    npm install -g kody

2. Set up your `kody_env`(can be named anything!) directory and necessary files (Refer to _conventions_)
3. Tweak your `kody.json` file.
3. Run `kody` from within your directory (if you're unsure about anything, backup your original symlinking files to be safe.)

    kody

4. Hack away, sit back and enjoy something else taking care of env setup!

##naming conventions for symlinking
For the symlinking task in `kody` there is only one thing to remember, suffix(?) `.link` to the end of either the directory you wish to symlink or the file you wish to symlink from within the directory you're working in. See the `dummy_env` folder for an example setup.

##kody.json
In order for `kody` to run, you need a `kody.json` file in place within the directory where your config lies. In here you can modify different options to tweak what tasks you want to run, what packages you wish to install etc.

Once again refer to the `kody.json` file within the `dummy_env` folder.

The options so far, are as follows;

###`set_up_git_config` : true/false
Set whether the git credential task runner should be run.
###`set_osx_defaults` : true/false
Set whether to run the Apple OSX Defaults option writer.
###`install_dot_files` : true/false
Set whether to run symlinking task,
###`install_brew_cask_and_casks` : true/false
Set whether the brew cask set up task will be run along with the installation of brew casks defined in `brew_casks`.
###`install_homebrew_and_packages` : true/false
Set whether Homebrew installation task is run.
###`install_npm_modules` : true/false
Set whether global npm modules are installed that are defined within `global_npm_modules`
###`install_apm_packages` : true/false
Set whether Atom IDE packages are installed that are defined within `apm_packages`.
###`set_fish_shell_as_default` : true/false
Set whether the shell script for setting fish as the default shell should be run.
###`brew_installs` : true/false
Defines the brew installs to run.
###`brew_casks` : string array
Defines the brew casks to be installed.
###`apm_packages`: string array
Defines the atom IDE packages to be installed.
###`global_npm_modules` : object
Defines the npm modules to be installed globally along with their version.

##known issue
If you are happily using a directory with `kody` but then delete it, this will ruin your symlinks in home and you will need to set up again. It's ideal if you can back up your original config files. You can always just manually copy them into the home directory if need be or delete them and re run `kody`.

I will be writing a backup option for the symlinking tasks of `kody`.

##extending
If you're looking to extend by adding more tasks, you can get a head start with the boilerplate coffeescript file in `src/coffee/lib/tasks`.
`kody` has been written in coffeescript and uses `gulp` for coffee compilation and watching. If you want to extend and develop `kody` you'll need to get `gulp` installed too.

##contributing
Feel free to get involved and give me some pointers on what could be improved.

Refer to __extending_ above and fork the repo.

I look forward to any potential pull requests!

##support

Any problems or questions, feel free to post an issue or tweet me, @_jh3y!

@jh3y 2014
