(function () {
    module.exports = {
        interpreter: interpreter
    };

    function interpreter(code, tape) {
        console.log(`code = '${code}', tape = '${tape}'`);
        let codeTokens = code.split('');
        let binaryTape = tape.split('').map(item => parseInt(item));
        let tapeIndex = 0;
        let codeIndex = 0;
        while (codeIndex >= 0 && codeIndex < codeTokens.length && tapeIndex >= 0 && tapeIndex < binaryTape.length) {
            switch(codeTokens[codeIndex]) {
                case '>':
                    tapeIndex++;
                    codeIndex++;
                    break;

                case '<':
                    tapeIndex--;
                    codeIndex++;
                    break;

                case '*':
                    binaryTape[tapeIndex] = binaryTape[tapeIndex] ? 0 : 1;
                    codeIndex++;
                    break;

                case '[':
                    if (binaryTape[tapeIndex] === 0) {
                        codeIndex++;
                        let bracketsToFind = 1;
                        while (codeIndex < codeTokens.length) {
                            if (codeTokens[codeIndex] === ']') {
                                bracketsToFind--;
                                if (bracketsToFind === 0)
                                     break;
                            }
                            else if (codeTokens[codeIndex] === '[') {
                                bracketsToFind++;
                            }
                            codeIndex++;
                        }
                        if (codeTokens[codeIndex] === ']') {
                            codeIndex++;
                        }
                    }
                    else
                        codeIndex++;
                    break;

                case ']':
                    if (binaryTape[tapeIndex] !== 0) {
                        codeIndex--;
                        let bracketsToFind = 1;
                        while (codeIndex >= 0) {
                            if (codeTokens[codeIndex] === '[') {
                                bracketsToFind--;
                                if (bracketsToFind === 0)
                                    break;
                            }
                            else if (codeTokens[codeIndex] === ']') {
                                bracketsToFind++;
                            }
                            codeIndex--;
                        }
                    }
                    else
                        codeIndex++;
                    break;

                default:
                    codeIndex++;
                    break;
            }
        }
        return binaryTape.map(item => item.toString()).join('');
    }
}(module.exports));
