"use strict";

const chai = require('chai'),
    expect = chai.expect

let coding = require('../app');

describe("Solution", function() {
    it("example1", function() {
        let latinText = coding.pigIt('Pig latin is cool');
        expect(latinText).to.equal('igPay atinlay siay oolcay');
        latinText = coding.pigIt('This is my string');
        expect(latinText).to.equal('hisTay siay ymay tringsay');
    });
});