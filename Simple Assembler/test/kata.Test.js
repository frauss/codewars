const chai = require("chai");
const chaiDeepMatch = require('chai-deep-match');

chai.use( chaiDeepMatch );
const expect = chai.expect;

let testee = require('../kata');

describe("basic tests", () => {
    it("Execute simple assembly", () => {
        let returnRegisters = testee.simple_assembler(['mov a 5', 'inc a', 'dec a', 'dec a', 'jnz a -1', 'inc a']);
        expect(returnRegisters).to.deep.match({'a': 1});
    });
    it("Execute another simple assembly", () => {
        let returnRegisters = testee.simple_assembler(['mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2']);
        expect(returnRegisters).to.deep.match({'a': 0, 'b': -20});
    });
    it("Another assembly", () => {
        let returnRegisters = testee.simple_assembler(['mov d 100', 'dec d', 'mov b d', 'jnz b -2', 'inc d', 'mov a d', 'jnz 5 10', 'mov c a']);
        expect(returnRegisters).to.deep.match({ d: 1, b: 0, a: 1 });
    });
});
