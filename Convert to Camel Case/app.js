(function () {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";

    module.exports = {
        movingShift: movingShift,
        demovingShift: demovingShift
    };

    function movingShift(s, shift) {
        let inputChars = s.split('');
        let encodedChars = [];
        for (let charIndex = 0, shiftValue = shift; charIndex < inputChars.length; charIndex++) {
            let currentChar = inputChars[charIndex];
            if (isLetter(currentChar)) {
                encodedChars.push(encodeChar(currentChar, shiftValue));
            }
            else {
                encodedChars.push(currentChar);
            }
            shiftValue += 1;
        }
        let encodedText = encodedChars.join('');
        let runners = getRunners(encodedText);
        return runners;
    }

    function demovingShift(arr, shift) {
        let inputChars = s.split('');
        let decodedChars = [];
        for (let charIndex = 0, shiftValue = shift; charIndex < inputChars.length; charIndex++) {
            let currentChar = inputChars[charIndex];
            if (isLetter(currentChar)) {
                decodedChars.push(decodeChar(currentChar, shiftValue));
            }
            else {
                decodedChars.push(currentChar);
            }
            shiftValue += 1;
        }
        let decodedText = decodedChars.join('');
        let runners = getRunners(decodedText);
        return runners;
    }

    function isLetter(c) {
        return (c.toLowerCase() != c.toUpperCase());
    }

    function isUpper(c) {
        return (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90);
    }

    function encodeChar(c, shift) {
        let code = c.charCodeAt(0);
        let baseCharValue = isUpper(c) ? 65 : 97;
        let encodedValue = ((code - baseCharValue) + shift) % 26;
        return isUpper(c) ?
            upperCaseChars.substr(encodedValue, 1) :
            lowerCaseChars.substr(encodedValue, 1);
    }

    function decodeChar(c, shift) {
        let code = c.charCodeAt(0);
        let baseCharValue = isUpper(c) ? 65 : 90;
        let decodedValue = ((code - baseCharValue) - shift) % 26;
        return isUpper(c) ?
            upperCaseChars.substr(decodedValue, 1) :
            lowerCaseChars.substr(decodedValue, 1);
    }

    function getRunners(text) {
        let runnerLength = Math.floor(text.length / 4);
        let extraRunner = text.length % 4;
        let lengthRemaining = text.length;
        let bucket = 0;
        let buckets = [];
        while (lengthRemaining > 0) {
            if (runnerLength > 0) {
                let runnerValue = (bucket === 4) ? extraRunner : runnerLength;
                buckets.push(runnerValue);
                lengthRemaining -= runnerValue;
            }
            else {
                buckets.push(1);
                lengthRemaining -= 1;
            }
            bucket++;
        }
        return buckets;
    }
}(module.exports));
