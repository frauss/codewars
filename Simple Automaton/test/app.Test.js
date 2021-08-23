const mocha = require('mocha');
const myAutomaton = require('../app');

describe("myAutomaton",()=>{
  it("example tests",()=>{
    Test.assertEquals(myAutomaton.readCommands(["1"]), true);
    Test.assertEquals(myAutomaton.readCommands(["1", "0", "0", "1"]), true);
  });
});