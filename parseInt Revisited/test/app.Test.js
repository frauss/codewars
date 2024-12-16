"use strict";

const chai = require('chai'),
    expect = chai.expect

let app = require('../app');

describe("parseInt Tests", () => {
  it("test", () => {
    expect(app.parseInt("one")).to.equal(1);
    expect(app.parseInt("twenty")).to.equal(20);
    expect(app.parseInt("two hundred forty-six")).to.equal(246);
    expect(app.parseInt("nine hundred ninety nine thousand nine hundred ninety nine")).to.equal(246);
  });
});
