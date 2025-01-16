from solution import Interpreter
# import provided

import unittest


class TestSolution(unittest.TestCase):
    symbol_table = {}

    def test_repl(self):
        interpreter = Interpreter()

        # Basic arithmetic
        self.assertEqual(interpreter.input("1 + 1"), 2)
        self.assertEqual(interpreter.input("2 - 1"), 1)
        self.assertEqual(interpreter.input("2 * 3"), 6)
        self.assertEqual(interpreter.input("8 / 4"), 2)
        self.assertEqual(interpreter.input("7 % 4"), 3)
        self.assertEqual(interpreter.input("4 + 2 * 3"), 10)

        # Variables
        self.assertEqual(interpreter.input("x = 1"), 1)
        self.assertEqual(interpreter.input("x"), 1)
        self.assertEqual(interpreter.input("x + 3"), 4)
        with self.assertRaises(ValueError):
            interpreter.input("y")

        # Empty input
        self.assertEqual(interpreter.input(""), "")

        # Errant input
        with self.assertRaises(ValueError):
            interpreter.input("+")
        with self.assertRaises(ValueError):
            interpreter.input("1 2")
        with self.assertRaises(ValueError):
            interpreter.input("1two")
