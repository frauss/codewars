"use strict";

const chai = require("chai"),
  assert = chai.assert;

const { PokerHand } = require("../app");
let testee = require("../app");

describe("Test Hands:", function () {
  it("Royal Flush", function () {
    let testHand = new PokerHand("AH JH QH KH TH");
    assert.equal(testHand.handName, "Royal Flush");
  });
  it("Straight Flush", function () {
    let testHand = new PokerHand("3S 5S 4S 6S 7S");
    assert.equal(testHand.handName, "Straight Flush");
  });
  it("Four of a Kind", function () {
    let testHand = new PokerHand("3D 3H 3C 3S TC");
    assert.equal("Four of a Kind", testHand.handName);
  });
  it("Full House", function () {
    let testHand = new PokerHand("5S 5H 5C TS TD");
    assert.equal("Full House", testHand.handName);
  });
  it("Flush", function () {
    let testHand = new PokerHand("JS 2S 4S 5S 8S");
    assert.equal("Flush", testHand.handName);
  });
  it("Straight", function () {
    let testHand = new PokerHand("TC 9D 8H 7S 6D");
    assert.equal("Straight", testHand.handName);
  });
  it("Three of a Kind", function () {
    let testHand = new PokerHand("8C 8S 8H 5D 2C");
    assert.equal("Three of a Kind", testHand.handName);
  });
  it("Two Pairs", function () {
    let testHand = new PokerHand("3C 3D 8H 8D JD");
    assert.equal("Two Pairs", testHand.handName);
  });
  it("Pair", function () {
    let testHand = new PokerHand("KH KS TD 5C 8H");
    assert.equal("Pair", testHand.handName);
  });
  it("High Card", function () {
    let testHand = new PokerHand("QH KS 5D 8C 9H");
    assert.equal("High Card", testHand.handName);
  });
});

describe("Compare Hands:", function () {
  it("Highest straight flush wins", function () {
    compareHands(testee.Result.loss, "2H 3H 4H 5H 6H", "KS AS TS QS JS");
  });
  it("Straight flush wins of 4 of a kind", function () {
    compareHands(testee.Result.win, "2H 3H 4H 5H 6H", "AS AD AC AH JD");
  });
  it("Highest 4 of a kind wins", function () {
    compareHands(testee.Result.win, "AS AH 2H AD AC", "JS JD JC JH 3D");
  });
  it("4 Of a kind wins of full house", function () {
    compareHands(testee.Result.loss, "2S AH 2H AS AC", "JS JD JC JH AD");
  });
  it("Full house wins of flush", function () {
    compareHands(testee.Result.win, "2S AH 2H AS AC", "2H 3H 5H 6H 7H");
  });
  it("Highest flush wins", function () {
    compareHands(testee.Result.win, "AS 3S 4S 8S 2S", "2H 3H 5H 6H 7H");
  });
  it("Flush wins of straight", function () {
    compareHands(testee.Result.win, "2H 3H 5H 6H 7H", "2S 3H 4H 5S 6C");
  });
  it("Equal straight is tie", function () {
    compareHands(testee.Result.tie, "2S 3H 4H 5S 6C", "3D 4C 5H 6H 2S");
  });
  it("Straight wins of three of a kind", function () {
    compareHands(testee.Result.win, "2S 3H 4H 5S 6C", "AH AC 5H 6H AS");
  });
  it("3 Of a kind wins of two pair", function () {
    compareHands(testee.Result.loss, "2S 2H 4H 5S 4C", "AH AC 5H 6H AS");
  });
  it("2 Pair wins of pair", function () {
    compareHands(testee.Result.win, "2S 2H 4H 5S 4C", "AH AC 5H 6H 7S");
  });
  it("Highest pair wins", function () {
    compareHands(testee.Result.loss, "6S AD 7H 4S AS", "AH AC 5H 6H 7S");
  });
  it("Pair wins of nothing", function () {
    compareHands(testee.Result.loss, "2S AH 4H 5S KC", "AH AC 5H 6H 7S");
  });
  it("Highest card loses", function () {
    compareHands(testee.Result.loss, "2S 3H 6H 7S 9C", "7H 3C TH 6H 9S");
  });
  it("Highest card wins", function () {
    compareHands(testee.Result.win, "4S 5H 6H TS AC", "3S 5H 6H TS AC");
  });
  it("Equal cards is tie", function () {
    compareHands(testee.Result.tie, "2S AH 4H 5S 6C", "AD 4C 5H 6H 2C");
  });
  it("Tie 3 of a kind high card wins", function () {
    compareHands(testee.Result.loss, "7C 7S 3S 7H 5S", "7C 7S KH 2H 7H");
  });
});

function compareHands(expected, player, opponent) {
  var p = new testee.PokerHand(player);
  var o = new testee.PokerHand(opponent);
  assert.equal(p.compareWith(o), expected);
}
