import unittest
from solution import digital_root


class TestSolution(unittest.TestCase):

    def test_solution(self):
        self.assertEqual(digital_root(16), 7)
        self.assertEqual(digital_root(942), 6)
        self.assertEqual(digital_root(132189), 6)
        self.assertEqual(digital_root(493193), 2)
