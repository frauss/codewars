class FSM:
    def __init__(self, instructions):
        self.instructions = {}
        for line in instructions.splitlines():
            (state_name, inputs, output) = [token.strip() for token in line.split(";")]
            input_tokens = [token.strip() for token in inputs.split(",")]
            self.instructions[state_name] = {
                "state_0": input_tokens[0],
                "state_1": input_tokens[1],
                "output": int(output)
            }

    def run_fsm(self, start, sequence):
        current_state = start
        path = [current_state]
        for input in sequence:
            current_state = self.instructions[current_state]["state_0"] if input == 0 else self.instructions[current_state]["state_1"]
            path.append(current_state)
        return (current_state, self.instructions[current_state]["output"], path)
