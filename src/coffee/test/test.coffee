assert = require("assert")
kody = require("../lib/kody")

suite "kody", ->
	suite "run", ->
		test "kody should throw an error if there's no config file", ->
			assert.throws (->
				kody.init()	
			), Error