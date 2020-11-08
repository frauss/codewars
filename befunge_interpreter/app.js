(function () {

    const left = 0;
    const right = 1;
    const up = 2;
    const down = 3;
    let lineIndex = 0;
    let tokenIndex = 0;
    let currentDirection = 0;

    module.exports = {
        interpret: interpret
    };

    function interpret(code) {
        let output = "";
        let operandStack = [];
        let program = code.split('\n').map(line => line.split(''));
        while (program[lineIndex][tokenIndex] != '@') {
            let currentToken = program[lineIndex][tokenIndex];
            if (currentToken >= '0' && currentToken <= '9') {
                operandStack.push(parseInt(currentToken));
                updateIndex();
            }
            else if (currentToken === '+' ||
                currentToken == '-' ||
                currentToken == '*' ||
                currentToken == '/' ||
                currentToken == '%') {
                doArithmetic(currentToken);
                updateIndex();
            }
            else if (currentToken == '!') {
                operand = operandStack.pop();
                operandStack.push((operand === 0) ? 1 : 0);
                updateIndex();
            }
            else if (currentToken === '`') {
                operandA = operandStack.pop();
                operandB = operandStack.pop();
                operandStack.push((operandB > operandA) ? 1 : 0);
                updateIndex();
            }
            else if (currentToken == '>') {
                currentDirection = right;
                updateIndex();
            }
            else if (currentToken == '<') {
                currentDirection = left;
                updateIndex();
            }
            else if (currentToken == '^') {
                currentDirection = up;
                updateIndex();
            }
            else if (currentToken == 'v') {
                currentDirection = down;
                updateIndex();
            }
            else if (currentToken === '?') {
                currentDirection = randomNumber(0, 3);
                updateIndex();
            }
            else if (currentToken === '_') {
                currentDirection = (operandStack.pop() === 0) ? right : left;
                updateIndex();
            }
            else if (currentToken === '|') {
                currentDirection = (operandStack.pop() === 0) ? down : up;
                updateIndex();
            }
            else if (currentToken === '"') {
                updateIndex();
                while ((currentToken = program[lineIndex][tokenIndex]) !== '"') {
                    operandStack.push(currentToken);
                    updateIndex();
                }
            }
            else if (currentToken === ':') {
                if (operandStack.length === 0) {
                    operandStack.push(0);
                }
                else {
                    operandStack.push(operandStack[operandStack.length - 1]);
                }
                updateIndex();
            }
            else if (currentToken === '\\') {
                let operand1 = operandStack.pop();
                let operand2 = operandStack.pop();
                operandStack.push(operand1);
                operandStack.push(operand2);
                updateIndex();
            }
            else if (currentToken === '$') {
                operandStack.pop();
                updateIndex();
            }
            else if (currentToken === '.') {
                console.log(parseInt(operandStack.pop()));
                updateIndex();
            }
            else if (currentToken === ',') {
                console.log(operandStack.pop().toString());
                updateIndex();
            }
            else if (currentToken === '#') {
                updateIndex();
                updateIndex();
            }
            else if (currentToken === 'p') {
                let y = operandStack.pop();
                let x = operandStack.pop();
                let v = operandStack.pop();
                program[y][x] = v;
                updateIndex();
            }
            else if (currentToken === 'g') {
                let y = operandStack.pop();
                let x = operandStack.pop();
                operandStack.push(program[y][x]);
                updateIndex();
            }
            else if (currentToken === '@') {
                break;
            }
            else if (currentToken === ' ') {
                updateIndex();
            }
        }
        return output;
    }

    function updateIndex() {
        switch (currentDirection) {
            case right:
                tokenIndex++;
                break;
            case left:
                tokenIndex--;
                break;
            case up:
                lineIndex--;
                break;
            case down:
                lineIndex++;
                break;
        }
    }

    function doArithmetic(operator) {
        let operand1 = operandStack.pop();
        let operand2 = operandStack.pop();
        switch (operator) {
            case '+':
                operandStack.push(operand1 + operand2);
                break;
            case '-':
                operandStack.push(operand2 - operand1);
                break;
            case '*':
                operandStack.push(operand1 * operand2);
                break;
            case '/':
                operandStack.push((operand1 === 0) ? 0 : operand2 / operand1);
                break;
            case '%':
                operandStack.push((operand1 === 0) ? 0: operand2 % operand1);
                break;
        }
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}(module.exports));