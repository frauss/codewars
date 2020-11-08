"use strict";

const chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe("Solution", function() {
    it("example1", function() {
        Test.assertDeepEquals(
            computeRanks(6,
                [[0, 5, 2, 2],
                    [1, 4, 0, 2],
                    [2, 3, 1, 2],
                    [1, 5, 2, 2],
                    [2, 0, 1, 1],
                    [3, 4, 1, 1],
                    [2, 5, 0, 2],
                    [3, 1, 1, 1],
                    [4, 0, 2, 0]]),
            [4,4,6,3,1,2]);
    });

    it("example2", function() {
        Test.assertDeepEquals(
            computeRanks(6,
                [[0, 5, 2, 0],
                    [1, 4, 2, 2],
                    [2, 3, 1, 3],
                    [1, 5, 0, 0],
                    [2, 0, 2, 1],
                    [3, 4, 3, 1]]),
            [2,3,4,1,5,6]);
    });

    it("example3", function() {
        Test.assertDeepEquals(
            computeRanks(4,
                [[0, 3, 1, 1],
                    [1, 2, 2, 2],
                    [1, 3, 2, 0],
                    [2, 0, 2, 0]]),
            [3,1,1,3]);
    });

    it("exampleEmpty", function() {
        Test.assertDeepEquals(
            computeRanks(10, []),
            [1,1,1,1,1,1,1,1,1,1]);
    });

    it("exampleOneGame", function() {
        Test.assertDeepEquals(
            computeRanks(8, [[0, 7, 2, 0]]),
            [1,2,2,2,2,2,2,8]);
    });
});
