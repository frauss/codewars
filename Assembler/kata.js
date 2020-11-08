(function () {
    module.exports = {
        assemblerInterpreter: assembler
    };

    let registers = {};
    let labels = {};
    let callStack = [];
    let operationStack = [];
    let programOutput;

    const labelRegex = /^([a-zA-Z0-9_]+):/;

    function assembler(program) {

        // First step is to split the "program" into an array using \n as delimiter
        let programLines = program.split('\n');

        // Do a "pre-parse" step to identify labels and remove comments
        let preParsedProgram = preprocess(programLines);

        let instructionIndex = 0;
        let programFinishedWithEnd = false;
        while (instructionIndex < preParsedProgram.length && !programFinishedWithEnd) {
            let currentLine = preParsedProgram[instructionIndex];

            // Skip blank lines and labels
            if (currentLine.length === 0 || labelRegex.test(currentLine)) {
                instructionIndex++;
                continue;
            }

            console.log(`Executing: ${currentLine}`);
            let matches = /(\w+)(\s+(.*))?$/.exec(currentLine);
            let currentInstruction = matches[1];
            let argumentTokens = (matches.length > 2 && matches[2]) ?
                matches[3].split(/,(?=(?:[^\']*\'[^\']*\')*[^\']*$)/).map(token => token.trim()) :
                null;
            let operand1, destinationLabel;
            switch (currentInstruction) {

                case 'mov':
                    operand1 = getOperand(argumentTokens[1]);
                    console.log(`Moving value = ${operand1} to register ${argumentTokens[0]}`);
                    registers[argumentTokens[0]] = operand1;
                    instructionIndex++;
                    break;

                case 'inc':
                case 'dec':
                    doIncrementDecrement(currentInstruction, argumentTokens);
                    instructionIndex++;
                    break;

                case 'add':
                case 'sub':
                case 'mul':
                case 'div':
                    doRegisterArithmetic(currentInstruction, argumentTokens);
                    instructionIndex++;
                    break;

                case 'jnz':
                    operand1 = getOperand(argumentTokens[0]);
                    instructionIndex = (operand1 !== 0) ?
                        instructionIndex + parseInt(argumentTokens[1]) :
                        instructionIndex + 1;
                    break;

                case 'jmp':
                    destinationLabel = argumentTokens[0];
                    if (labels[destinationLabel]) {
                        instructionIndex = labels[destinationLabel];
                    }
                    else {
                        throw `Invalid destination for jmp: ${destinationLabel}`;
                    }
                    break;

                case 'cmp':
                    operationStack.push(getOperand(argumentTokens[0]));
                    operationStack.push(getOperand(argumentTokens[1]));
                    instructionIndex++;
                    break;

                case 'jne':
                case 'je':
                case 'jge':
                case 'jg':
                case 'jle':
                case 'jl':
                    instructionIndex = doConditionalJump(currentInstruction, argumentTokens, instructionIndex);
                    break;

                case 'call':
                    destinationLabel = argumentTokens[0];
                    if (labels[destinationLabel]) {
                        callStack.push(instructionIndex);
                        console.log(`calling ${destinationLabel} at index = ${labels[destinationLabel]} with return at index = ${instructionIndex}`);
                        instructionIndex = labels[destinationLabel];
                    }
                    else {
                        throw `Invalid destination for call: ${destinationLabel}`;
                    }
                    break;

                case 'ret':
                    let returnIndex = callStack.pop() + 1;
                    console.log(`returning from subroutine to index = ${returnIndex}`);
                    instructionIndex = returnIndex;
                    break;

                case 'msg':
                    programOutput = formatMessage(argumentTokens);
                    instructionIndex++;
                    break;

                case 'end':
                    return programOutput;
            }
        }
        return -1;
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

    function preprocess(rawProgram) {
        let resultantProgram = [];
        for (let instructionIndex = 0; instructionIndex < rawProgram.length; instructionIndex++) {
            let currentInstruction = rawProgram[instructionIndex];

            // Remove any comments
            let commentTokens = currentInstruction.split(';');
            if (commentTokens.length > 1)
                currentInstruction = commentTokens[0];

            // test for a label, if we find one insert the name and the
            // instruction index in the labels hash
            let labelMatch = labelRegex.exec(currentInstruction);
            if (labelMatch !== null) {
                let labelName = labelMatch[1];
                labels[labelName] = instructionIndex;
            }

            // Trim leading space from instruction
            resultantProgram.push(currentInstruction.trim());
        }
        return resultantProgram;
    }

    function doRegisterArithmetic(instruction, arguments) {
        let operand2 = getOperand(arguments[1]);
        let operand1 = getRegister(arguments[0]);
        let newValue;
        switch (instruction) {
            case 'add':
                newValue = operand2 + operand1;
                break;
            case 'sub':
                newValue = operand1 - operand2;
                break;
            case 'mul':
                newValue = operand2 * operand1;
                break;
            case 'div':
                newValue = Math.floor(operand1 / operand2);
                break;
        }
        console.log(`${instruction} register ${arguments[0]} = ${operand1} with ${operand2} for ${newValue}`);
        registers[arguments[0]] = newValue;
    }

    function doIncrementDecrement(instruction, arguments) {
        let operand1 = getRegister(arguments[0]);
        let newValue = (instruction === 'inc') ?
            operand1 + 1 :
            operand1 - 1;
        console.log(`${instruction} register ${arguments[0]} to ${newValue}`);
        registers[arguments[0]] = newValue;
    }

    function doConditionalJump(instruction, arguments, currentIndex) {
        let destinationLabel = arguments[0];
        if (!labels[destinationLabel]) {
            throw `Invalid destination for ${instruction}: ${destinationLabel}`;
        }
        let operand2 = operationStack.pop();
        let operand1 = operationStack.pop();
        let comparisonResult;
        switch (instruction) {
            case 'jne':
                comparisonResult = (operand1 !== operand2);
                break;

            case 'je':
                comparisonResult = (operand1 === operand2);
                break;

            case 'jge':
                comparisonResult = (operand1 >= operand2);
                break;

            case 'jg':
                comparisonResult = (operand1 > operand2);
                break;

            case 'jle':
                comparisonResult = (operand1 <= operand2);
                break;

            case 'jl':
                comparisonResult = (operand1 < operand2);
                break;
        }
        return (comparisonResult) ? labels[destinationLabel] : currentIndex + 1;
    }

    function formatMessage(arguments) {
        let output = "";
        for (let argument of arguments) {
            if (argument.substr(0, 1) === '\'') {
                output += argument.substr(1, argument.length - 2);
            }
            else {
                let value = getRegister(argument);
                output += value.toString();
            }
        }
        return output;
    }
}(module.exports));
