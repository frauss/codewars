from solution import work_on_strings
import unittest

class TestSolution(unittest.TestCase):

    def test_solution(self):
        self.assertEqual(work_on_strings("abc", "cde"), "abCCde")
        self.assertEqual(work_on_strings("abcdeFgtrzw", "defgGgfhjkwqe"), "abcDeFGtrzWDEFGgGFhjkWqE")
        self.assertEqual(work_on_strings("abcdeFg", "defgG"), "abcDEfgDEFGg")
        self.assertEqual(work_on_strings("abab", "bababa"), "ABABbababa")


if __name__ == '__main__':
    unittest.main()
