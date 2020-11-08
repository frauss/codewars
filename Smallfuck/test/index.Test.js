const chai = require("chai");
const expect = chai.expect;

let testee = require('../index');

describe("Your testee.testee.interpreter", function () {
    it("should work for some example test cases", function () {
        // Flips the leftmost cell of the tape
        expect(testee.interpreter("*", "00101100")).to.equal("10101100");

        // Flips the second and third cell of the tape
        expect(testee.interpreter(">*>*", "00101100")).to.equal("01001100");

        // Flips all the bits in the tape
        expect(testee.interpreter("*>*>*>*>*>*>*>*", "00101100")).to.equal("11010011");

        // Flips all the bits that are initialized to 0
        expect(testee.interpreter("*>*>>*>>>*>*", "00101100")).to.equal("11111111");

        // Goes somewhere to the right of the tape and then flips all bits that are initialized to 1, progressing leftwards through the tape
        expect(testee.interpreter(">>>>>*<*<<*", "00101100")).to.equal("00000000");
    });

    it("should for for some more elaborate cases", function () {
        expect(testee.interpreter('*[>*]', tape = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')).to.equal('')
    });

    it("should work for nested loops", function() {
        expect(testee.interpreter('[[]*>*>*>]', '000')).to.equal('000');
        expect(testee.interpreter('*>[[]*>]<*', '100')).to.equal('100');
        expect(testee.interpreter('[*>[>*>]>]', '11001')).to.equal('01100');
        expect(testee.interpreter('[>[*>*>*>]>]', '10110')).to.equal('10101');
    });
});