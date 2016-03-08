const assert = require('assert'),
  kody = require('../lib/kody');

suite('kody', ()=> {
  suite('run', ()=> {
    test('should throw error if no config file present', ()=> {
      assert.throws(() => {
        kody.init();
      }, Error);
    })
  })
})
