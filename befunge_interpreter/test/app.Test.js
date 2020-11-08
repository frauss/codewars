"use strict";

const chai = require('chai'),
    expect = chai.expect

let befunge = require('../app');

describe("Solution", function() {
    it("example1", function() {
        let input = '>987v>.v\nv456<  :\n>321 ^ _@';
        let expectedResult = '123456789';
        let testResult = befunge.interpret(input);
        expect(testResult).to.equal(expectedResult);
    });
});