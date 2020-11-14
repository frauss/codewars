(function () {
    module.exports = {
        interpreter: interpreter
    };

    function interpreter(code, iterations, width, height) {
        console.log(`code = '${code}', iterations = '${iterations}', width = '${width}', height = '${height}'`);
        let codeTokens = code.split('');
        let tape = [];
        for (let row = 0; row < height; row++) {
            let currentRow = [];
            for (let column = 0; column < width; column++) {
                currentRow.push(0);
            }
            tape.push(currentRow);
        }

        let currentRow = 0;
        let currentColumn = 0;
        let codeIndex = 0;
        let iteration = 1;
        while (codeIndex >= 0 && codeIndex < codeTokens.length && iteration <= iterations) {
            switch(codeTokens[codeIndex]) {
                case 'n':
                    currentRow--;
                    if (currentRow < 0)
                        currentRow = height - 1;
                    codeIndex++;
                    iteration++;
                    break;

                case 's':
                    currentRow++;
                    if (currentRow === height)
                        currentRow = 0;
                    codeIndex++;
                    iteration++;
                    break;

                case 'e':
                    currentColumn++;
                    if (currentColumn === width)
                        currentColumn = 0;
                    codeIndex++;
                    iteration++;
                    break;

                case 'w':
                    currentColumn--;
                    if (currentColumn < 0)
                        currentColumn = width - 1;
                    codeIndex++;
                    iteration++;
                    break;

                case '*':
                    tape[currentRow][currentColumn] = tape[currentRow][currentColumn] ? 0 : 1;
                    codeIndex++;
                    iteration++;
                    break;

                case '[':
                    if (tape[currentRow][currentColumn] === 0) {
                        codeIndex++;
                        let bracketsToFind = 1;
                        while (codeIndex < codeTokens.length) {
                            if (codeTokens[codeIndex] === ']') {
                                bracketsToFind--;
                                if (bracketsToFind === 0) {
                                    codeIndex++;
                                    break;
                                }
                            }
                            else if (codeTokens[codeIndex] === '[') {
                                bracketsToFind++;
                            }
                            codeIndex++;
                        }
                    }
                    else
                        codeIndex++;
                    iteration++;
                    break;

                case ']':
                    if (tape[currentRow][currentColumn] !== 0) {
                        codeIndex--;
                        let bracketsToFind = 1;
                        while (codeIndex >= 0) {
                            if (codeTokens[codeIndex] === '[') {
                                bracketsToFind--;
                                if (bracketsToFind === 0) {
                                    codeIndex++;
                                    break;
                                }
                            }
                            else if (codeTokens[codeIndex] === ']') {
                                bracketsToFind++;
                            }
                            codeIndex--;
                        }
                    }
                    else
                        codeIndex++;
                    iteration++;
                    break;

                default:
                    codeIndex++;
                    break;
            }
        }
        let returnValue = tape.map(row => row.join('')).join('\r\n');
        return returnValue;
    }
}(module.exports));
