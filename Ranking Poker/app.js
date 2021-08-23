var Result = {
  win: 1,
  loss: 2,
  tie: 3,
};

let cardRanks = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let suits = {
  H: "Hearts",
  S: "Spades",
  D: "Diamonds",
  C: "Clubs",
};

let handRanks = {
  "Royal Flush": 9,
  "Straight Flush": 8,
  "Four of a Kind": 7,
  "Full House": 6,
  Flush: 5,
  Straight: 4,
  "Three of a Kind": 3,
  "Two Pairs": 2,
  Pair: 1,
  "High Card": 0,
};

function PokerCard(card) {
  this.value = card[0];
  this.rank = cardRanks[this.value];
  this.suit = card[1];
}

function PokerHand(hand) {
  console.log(`New Hand from = ${hand}`);
  let cardTokens = hand.split(" ");
  this.cards = cardTokens.map((card) => new PokerCard(card));
  this.cards.sort((card1, card2) => card2.rank - card1.rank);
  this.highCard = this.cards[0].rank;
  this.valueCounts = {};
  for (const card of this.cards) {
    this.valueCounts[card.value] = this.valueCounts[card.value]
      ? this.valueCounts[card.value] + 1
      : 1;
  }
  this.handName = this.getHandName();
  this.handRank = handRanks[this.handName];
}

PokerHand.prototype.compareWith = function (hand) {
  if (this.handRank > hand.handRank) {
    console.log(`${this.handName} beats ${hand.handName}`);
    return Result.win;
  } else if (this.handRank < hand.handRank) {
    console.log(`${this.handName} loses to ${hand.handName}`);
    return Result.loss;
  } else {
    console.log(`Both are ${this.handName} using tie breaker, high card`);
    return this.tieBreak(hand);
  }
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

PokerHand.prototype.isFlush = function () {
  return this.cards.map((card) => card.suit).filter(onlyUnique).length == 1;
};

PokerHand.prototype.isStraight = function () {
  return (this.cards[0].rank - this.cards[4].rank === 4) &&
    (Object.keys(this.valueCounts).filter(key => this.valueCounts[key] > 1).length === 0);
};

PokerHand.prototype.isStraightFlush = function () {
  return this.isFlush() && this.isStraight();
};

PokerHand.prototype.isFourOfAKind = function () {
  return (
    Object.keys(this.valueCounts).find((key) => this.valueCounts[key] === 4) !==
    undefined
  );
};

PokerHand.prototype.isFullHouse = function () {
  return this.isThreeOfAKind() && this.isPair();
};

PokerHand.prototype.isThreeOfAKind = function () {
  return (
    Object.keys(this.valueCounts).find((key) => this.valueCounts[key] === 3) !==
    undefined
  );
};

PokerHand.prototype.isTwoPair = function () {
  let pairCount = Object.keys(this.valueCounts).filter(
    (key) => this.valueCounts[key] === 2
  ).length;
  return pairCount === 2;
};

PokerHand.prototype.isPair = function () {
  return (
    Object.keys(this.valueCounts).find((key) => this.valueCounts[key] === 2) !==
    undefined
  );
};

PokerHand.prototype.getHandName = function () {
  let handName;
  if (this.isStraightFlush()) {
    if (this.highCard == cardRanks["A"]) {
      handName = "Royal Flush";
    } else {
      handName = "Straight Flush";
    }
  } else if (this.isStraightFlush()) {
    handName = "Straight Flush";
  } else if (this.isFourOfAKind()) {
    handName = "Four of a Kind";
  } else if (this.isFullHouse()) {
    handName = "Full House";
  } else if (this.isFlush()) {
    handName = "Flush";
  } else if (this.isStraight()) {
    handName = "Straight";
  } else if (this.isThreeOfAKind()) {
    handName = "Three of a Kind";
  } else if (this.isTwoPair()) {
    handName = "Two Pairs";
  } else if (this.isPair()) {
    handName = "Pair";
  } else {
    handName = "High Card";
  }
  return handName;
};

PokerHand.prototype.tieBreak = function (hand) {
  let hand1High, hand2High;

  switch (this.handName) {
    case "Royal Flush":
      return Result.tie;

    case "Straight Flush":
    case "Straight":
    case "Flush":
    case "High Card":
      return highCardDecider(
        this.cards.map((card) => card.rank).sort((a, b) => b - a),
        hand.cards.map((card) => card.rank).sort((a, b) => b - a)
      );

    case "Four of a Kind":
      hand1High = Object.keys(this.valueCounts).find(
        (key) => this.valueCounts[key] === 4
      );
      hand2High = Object.keys(hand.valueCounts).find(
        (key) => hand.valueCounts[key] === 4
      );
      if (cardRanks[hand1High] > cardRanks[hand2High]) {
        return Result.win;
      } else if (cardRanks[hand1High] < cardRanks[hand2High]) {
        return Result.loss;
      } else {
        // Compare remaining for high card
        let hand1Remaining = Object.keys(this.valueCounts)
          .filter((key) => this.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        let hand2Remaining = Object.keys(hand.valueCounts)
          .filter((key) => hand.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        return highCardDecider(hand1Remaining, hand2Remaining);
      }

    case "Full House":
      // Check the highest 3 of a kind
      hand1High = Object.keys(this.valueCounts).find(
        (key) => this.valueCounts[key] === 3
      );
      hand2High = Object.keys(hand.valueCounts).find(
        (key) => hand.valueCounts[key] === 3
      );
      if (cardRanks[hand1High] > cardRanks[hand2High]) {
        return Result.win;
      } else if (cardRanks[hand1High] < cardRanks[hand2High]) {
        return Result.loss;
      } else {
        // Same 3 of a kind now check the pair
        hand1High = Object.keys(this.valueCounts).find(
          (key) => this.valueCounts[key] === 2
        );
        hand2High = Object.keys(hand.valueCounts).find(
          (key) => hand.valueCounts[key] === 2
        );
        if (cardRanks[hand1High] > cardRanks[hand2High]) {
          return Result.win;
        } else if (cardRanks[hand1High] < cardRanks[hand2High]) {
          return Result.loss;
        } else {
          return Result.tie;
        }
      }

    case "Three of a Kind":
      // Check the highest 3 of a kind
      hand1High = Object.keys(this.valueCounts).find(
        (key) => this.valueCounts[key] === 3
      );
      hand2High = Object.keys(hand.valueCounts).find(
        (key) => hand.valueCounts[key] === 3
      );
      if (cardRanks[hand1High] > cardRanks[hand2High]) {
        return Result.win;
      } else if (cardRanks[hand1High] < cardRanks[hand2High]) {
        return Result.loss;
      } else {
        // Compare remaining for high card
        let hand1Remaining = Object.keys(this.valueCounts)
          .filter((key) => this.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        let hand2Remaining = Object.keys(hand.valueCounts)
          .filter((key) => hand.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        return highCardDecider(hand1Remaining, hand2Remaining);
      }

    case "Two Pairs":
      // Check the 2 pairs
      let hand1Pairs = Object.keys(this.valueCounts).filter(
        (key) => this.valueCounts[key] === 2
      );
      let hand2Pairs = Object.keys(hand.valueCounts).filter(
        (key) => hand.valueCounts[key] === 2
      );
      if (cardRanks[hand1Pairs[0]] > cardRanks[hand2Pairs[0]]) {
        return Result.win;
      } else if (cardRanks[hand1Pairs[0]] < cardRanks[hand2Pairs[0]]) {
        return Result.loss;
      } else {
        if (cardRanks[hand1Pairs[1]] > cardRanks[hand2Pairs[1]]) {
          return Result.win;
        } else if (cardRanks[hand1Pairs[1]] < cardRanks[hand2Pairs[1]]) {
          return Result.loss;
        } else {
          // Compare remaining for high card
          let hand1Remaining = Object.keys(this.valueCounts)
            .filter((key) => this.valueCounts[key] === 1)
            .sort((a, b) => cardRanks[b] - cardRanks[a]);
          let hand2Remaining = Object.keys(hand.valueCounts)
            .filter((key) => hand.valueCounts[key] === 1)
            .sort((a, b) => cardRanks[b] - cardRanks[a]);
          return highCardDecider(hand1Remaining, hand2Remaining);
        }
      }
      break;

    case "Pair":
      // Check the highest 3 of a kind
      hand1High = Object.keys(this.valueCounts).find(
        (key) => this.valueCounts[key] === 2
      );
      hand2High = Object.keys(hand.valueCounts).find(
        (key) => hand.valueCounts[key] === 2
      );
      if (cardRanks[hand1High] > cardRanks[hand2High]) {
        return Result.win;
      } else if (cardRanks[hand1High] < cardRanks[hand2High]) {
        return Result.loss;
      } else {
        // Compare remaining for high card
        let hand1Remaining = Object.keys(this.valueCounts)
          .filter((key) => this.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        let hand2Remaining = Object.keys(hand.valueCounts)
          .filter((key) => hand.valueCounts[key] === 1)
          .sort((a, b) => cardRanks[b] - cardRanks[a]);
        return highCardDecider(hand1Remaining, hand2Remaining);
      }
  }
};

function highCardDecider(cardRanks1, cardRanks2) {
  for (let cardIndex = 0; cardIndex < cardRanks1.length; cardIndex++) {
    if (cardRanks1[cardIndex] > cardRanks2[cardIndex]) {
      return Result.win;
    } else if (cardRanks1[cardIndex] < cardRanks2[cardIndex]) {
      return Result.loss;
    }
  }
  return Result.tie;
}

module.exports = {
  Result: Result,
  PokerHand: PokerHand,
};
