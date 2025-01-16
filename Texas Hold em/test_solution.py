import unittest
import solution


class TestSolution(unittest.TestCase):
    def test_nothing(self):
        result = solution.hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])
        self.assertEqual(result, ("nothing", ["A", "K", "Q", "J", "9"]))

    def test_pair(self):
        result = solution.hand(["K♠", "Q♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"])
        self.assertEqual(result, ("pair", ["Q", "K", "J", "9"]))

    def test_two_pair(self):
        result = solution.hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"])
        self.assertEqual(result, ("two pair", ["K", "J", "9"]))

    def test_three_of_a_kind(self):
        result = solution.hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"])
        self.assertEqual(result, ("three-of-a-kind", ["Q", "J", "9"]))

    def test_straight(self):
        result = solution.hand(["Q♠", "2♦"], ["J♣", "10♥", "9♥", "K♥", "3♦"])
        self.assertEqual(result, ("straight", ["K", "Q", "J", "10", "9"]))

    def test_flush(self):
        result = solution.hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])
        self.assertEqual(result, ("flush", ["Q", "J", "10", "5", "3"]))

    def test_full_house(self):
        result = solution.hand(["A♠", "A♦"], ["K♣", "K♥", "A♥", "Q♥", "3♦"])
        self.assertEqual(result, ("full house", ["A", "K"]))

    def test_four_of_a_kind(self):
        result = solution.hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"])
        self.assertEqual(result, ("four-of-a-kind", ["2", "3"]))

    def test_straight_flush(self):
        result = solution.hand(["8♠", "6♠"], ["7♠", "5♠", "9♠", "J♠", "10♠"])
        self.assertEqual(result, ("straight-flush", ["J", "10", "9", "8", "7"]))
