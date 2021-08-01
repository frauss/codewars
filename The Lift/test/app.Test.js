"use strict";

const chai = require('chai');

let testee = require('../app');

describe("Example Tests", function() {
    it("up", function() {
        let queues = [
            [], // G
            [], // 1
            [5,5,5], // 2
            [], // 3
            [], // 4
            [], // 5
            [], // 6
        ];
        let result = testee.theLift(queues, 5);
        expect(result).to.have.members([0,2,5,0]);
    });

    it("down", function() {
        let queues = [
            [], // G
            [], // 1
            [1,1], // 2
            [], // 3
            [], // 4
            [], // 5
            [], // 6
        ];
        let result = testee.theLift(queues,5);
        expect(result).to.have.members([0,2,1,0]);
    });
    
    it("up and up", function() {
        let queues = [
            [], // G
            [3], // 1
            [4], // 2
            [], // 3
            [5], // 4
            [], // 5
            [], // 6
        ];
        let result = testee.theLift(queues,5);
        expect(result).to.have.members([0,1,2,3,4,5,0]);
    });

    it("down and down", function() {
        let queues = [
            [], // G
            [0], // 1
            [], // 2
            [], // 3
            [2], // 4
            [3], // 5
            [], // 6
        ];
        let result = testee.theLift(queues,5);
        expect(result).to.have.members([0,5,4,3,2,1,0]);
    });
});