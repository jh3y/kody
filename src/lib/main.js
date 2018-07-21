/**
 * kody - dotfiles manager in node!
 * @author jh3y - 2018
 * @license MIT
 */

import program from 'commander'
/* eslint-disable-next-line no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime'
import { fail } from './log'
import pkg from '../package.json'
import Kody from './kody'
const { error } = console
program.version(pkg.version).parse(process.argv)
const main = async () => {
  try {
    const instance = new Kody()
    instance.welcome()
    instance.init()
    await instance.prompt()
  } catch (err) {
    error(fail(err.toString()))
  }
}
main()
