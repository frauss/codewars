from solution import FSM
import unittest


class TestSolution(unittest.TestCase):
    symbol_table = {}

    def test_it(self):
        instructions = "S1; S1, S2; 9"  "\n" \
                       "S2; S1, S3; 10" "\n" \
                       "S3; S4, S3; 8"  "\n" \
                       "S4; S4, S1; 0"
        start = "S1"
        sequence = [0, 1, 1, 0, 1]
        fsm = FSM(instructions)
        final_state, final_output, path = fsm.run_fsm(start, sequence)

        # According to the sequence, the path of states should be:
        # S1 -> S1 -> S2 -> S3 -> S4 -> S1
        #    0     1     1     0     1

        self.assertEqual(final_state, "S1", "The final state of the FSM should be 'S1'")
        self.assertEqual(final_output, 9, "The final output should be the output of 'S1'")
        self.assertEqual(path, ["S1", "S1", "S2", "S3", "S4", "S1"], "Incorrect path of states")
