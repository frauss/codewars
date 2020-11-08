(function () {
    module.exports = {
        simple_assembler: simple_assembler
    };

    let registers = {};

    function simple_assembler(program) {
        let instructionIndex = 0;
        while (instructionIndex < program.length) {
            console.log(`Executing: ${program[instructionIndex]}`);
            let instructionTokens = program[instructionIndex].split(' ');
            let currentInstruction = instructionTokens.shift();
            let newValue, operand;
            switch (currentInstruction) {
                case 'mov':
                    operand = getOperand(instructionTokens[1]);
                    console.log(`Moving value = ${operand} to register ${instructionTokens[0]}`);
                    registers[instructionTokens[0]] = operand;
                    instructionIndex++;
                    break;

                case 'inc':
                    operand = getRegister(instructionTokens[0]);
                    newValue = operand + 1;
                    console.log(`Incrementing register ${instructionTokens[0]} from ${operand} to ${newValue}`);
                    registers[instructionTokens[0]] = newValue;
                    instructionIndex++;
                    break;

                case 'dec':
                    operand = getRegister(instructionTokens[0]);
                    newValue = operand - 1;
                    console.log(`Decrementing register ${instructionTokens[0]} from ${operand} to ${newValue}`);
                    registers[instructionTokens[0]] = newValue;
                    instructionIndex++;
                    break;

                case 'jnz':
                    operand = getOperand(instructionTokens[0]);
                    instructionIndex = (operand !== 0) ?
                        instructionIndex + parseInt(instructionTokens[1]) :
                        instructionIndex + 1;
                    break;
            }
        }

        /* return a dictionary with the registers */
        return registers;
    }

    function getOperand(operandToken) {
        return (isNaN(operandToken)) ?
            getRegister(operandToken) :
            parseInt(operandToken);
    }

    function getRegister(registerId) {
        if (!registers.hasOwnProperty(registerId)) {
            console.log(`Initializing register ${registerId} to 0`);
            registers[registerId] = 0;
        }
        return registers[registerId];
    }
}(module.exports));
