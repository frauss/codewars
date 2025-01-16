import unittest
import solution


class TestSolution(unittest.TestCase):

    def test_solution(self):
        self.assertEqual(solution.to_postfix("2+7*5"), "275*+")
        self.assertEqual(solution.to_postfix("3*3/(7+1)"), "33*71+/")
        self.assertEqual(solution.to_postfix("5+(6-2)*9+3^(7-1)"), "562-9*+371-^+")
        self.assertEqual(solution.to_postfix("(5-4-1)+9/5/2-7/1/7"), "54-1-95/2/+71/7/-")
        self.assertEqual(solution.to_postfix("1^2^3"), "123^^")
