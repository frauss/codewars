import unittest
import solution


class TestSolution(unittest.TestCase):

    def test_solution(self):
        self.assertEqual(solution.sum_strings("1", "1"), "2")
        self.assertEqual(solution.sum_strings("123", "456"), "579")
        self.assertEqual(solution.sum_strings("12397", "456"), "12853")
        self.assertEqual(solution.sum_strings("9999", "54"), "10053")
        self.assertEqual(solution.sum_strings("33", "9999"), "10032")
        self.assertEqual(solution.sum_strings("42", "69"), "111")
        self.assertEqual(solution.sum_strings("50095301248058391139327916261",
                                              "81055900096023504197206408605"),
                         "131151201344081895336534324866")
        self.assertEqual(solution.sum_strings("00545", "0023"), "568")
