"use strict";

const chai = require('chai'),
    assert = chai.assert;

let testee = require('../app');

describe("Solution", function() {
    it("simple tests", function() {
        assert.equal(testee.toCamelCase(''), '', "An empty string was provided but not returned");
        assert.equal(testee.toCamelCase("the_stealth_warrior"), "theStealthWarrior", "toCamelCase('the_stealth_warrior') did not return correct value");
        assert.equal(testee.toCamelCase("The-Stealth-Warrior"), "TheStealthWarrior", "toCamelCase('The-Stealth-Warrior') did not return correct value");
        assert.equal(testee.toCamelCase("A-B-C"), "ABC", "toCamelCase('A-B-C') did not return correct value");
        //Test.assertSimilar(movingShift(u, 1), v)
    });
});