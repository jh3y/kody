var assert, kody;

assert = require("assert");

kody = require("../lib/kody");

suite("kody", function() {
  return suite("run", function() {
    return test("kody should throw an error if there's no config file", function() {
      return assert.throws((function() {
        return kody.init();
      }), Error);
    });
  });
});
