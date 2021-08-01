"use strict";

const chai = require('chai'),
    expect = chai.expect

let coding = require('../app');

describe("Solution", function() {
    it("example1", function() {
        let u = "I should have known that you would have a perfect answer for me!!!";
        let v = ["J vltasl rlhr ", "zdfog odxr ypw", " atasl rlhr p ", "gwkzzyq zntyhv", " lvz wp!!!"];
        let encoded = coding.movingShift(u, 1);
        let joinedV = v.join('');
        expect(joinedV).to.be.equal(encoded);
        //Test.assertSimilar(movingShift(u, 1), v)
    });
});