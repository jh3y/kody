import { expect } from 'chai'
import { existsSync } from 'fs'
import shell from 'shelljs'
import Kody from '../lib/kody'
import { symlinkDotfile } from '../lib/dotfiles'

const cwd = process.cwd()
let instance
let testDir
let testFile
let testEnv
let testDotfile
let testDotdir
let testDestDir
let testDestDotfile
let testDestDotdir

describe('kody', () => {
  describe('instance', () => {
    before(() => {
      instance = new Kody()
    })
    describe('sorting tasks', () => {
      it('sorts tasks w/out file extension specified', () => {
        const tasks = ['a.js', 'b.js', 'c.js']
        const order = ['b', 'c', 'a']
        const desired = ['b.js', 'c.js', 'a.js']
        expect(instance.sortTasks(tasks, order)).to.eql(desired)
      })
      it('sorts tasks based on basename', () => {
        const tasks = ['a.js', 'b.js', 'c.js']
        const order = ['b', 'c', 'a']
        const desired = ['b.js', 'c.js', 'a.js']
        expect(instance.sortTasks(tasks, order)).to.eql(desired)
      })
      it('sorts tasks regardless of how nested they are', () => {
        const tasks = [
          '/some/awesome/dir/really/nested/a.js',
          '/not/as/nested/b.js',
          'c.js',
        ]
        const order = ['b', 'c', 'a']
        const desired = [
          '/not/as/nested/b.js',
          'c.js',
          '/some/awesome/dir/really/nested/a.js',
        ]
        expect(instance.sortTasks(tasks, order)).to.eql(desired)
      })
    })
    describe('getting tasks', () => {
      beforeEach(() => {
        testDir = `${cwd}/kody-test-dir`
        testFile = `${testDir}/dummy-kody-task.js`
        shell.mkdir(testDir)
        shell.touch(testFile)
      })
      afterEach(() => {
        shell.rm('-rf', testDir)
      })
      it('grabs tasks from a directory', () => {
        const tasks = instance.getTasks(testDir)
        expect(tasks).to.eql([testFile])
      })
      it('grabs nested tasks from a directory', () => {
        const nestedDir = `${testDir}/nested-tasks`
        const nestedFile = `${nestedDir}/nested.js`
        shell.mkdir(nestedDir)
        shell.touch(nestedFile)
        const tasks = instance.getTasks(testDir)
        expect(tasks).to.eql([testFile, nestedFile])
      })
    })
  })
  describe('dotfiles', () => {
    beforeEach(() => {
      testEnv = `${cwd}/test-kody-env`
      testDotfile = `${testEnv}/.kody-test-config.link`
      testDestDir = `${cwd}/kody-test-home`
      testDestDotfile = `${testDestDir}/.kody-test-config`
      testDotdir = `${testEnv}/.kody-test-dot-dir.link`
      testFile = `${testDotdir}/hello.txt`
      testDestDotdir = `${testDestDir}/.kody-test-dot-dir`

      shell.mkdir(testEnv)
      shell.touch(testDotfile)
      shell.mkdir(testDestDir)
      shell.mkdir(testDotdir)
      shell.touch(testFile)
    })
    afterEach(() => {
      shell.rm('-rf', testEnv)
      shell.rm('-rf', testDestDir)
    })
    it('symlinks a file', () => {
      symlinkDotfile(testDotfile, testDestDotfile)
      expect(existsSync(testDestDotfile)).to.equal(true)
    })
    it('symlinks a directory', () => {
      symlinkDotfile(testDotdir, testDestDotdir)
      expect(existsSync(testDestDotdir)).to.equal(true)
    })
    it('does not back up current dotfiles if not there', () => {
      symlinkDotfile(testDotfile, testDestDotfile, true)
      expect(existsSync(`${testDestDotfile}.bak`)).to.equal(false)
    })
    it('does back up current dotfiles if there', () => {
      shell.touch(`${testDestDir}/.kody-test-config`)
      symlinkDotfile(testDotfile, testDestDotfile, true)
      expect(existsSync(`${testDestDotfile}.bak`)).to.equal(true)
    })
  })
})
