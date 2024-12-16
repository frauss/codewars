(function () {
    module.exports = {
        parseInt: parseInt,
    };

    const values = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
        thirty: 30,
        forty: 40,
        fifty: 50,
        sixty: 60,
        seventy: 70,
        eighty: 80,
        ninety: 90,
    };

    const multipliers = {
        hundred: 100,
        thousand: 1000,
        million: 1000000,
    };

    const valueKeys = Object.keys(values);
    const multiplierKeys = Object.keys(multipliers);

    function parseInt(intText) {
        console.log(`Evaluating text = ${intText}`);
        let tokens = intText.split(/ |-/);
        let accumulatedValue = 0;
        let currentValue = 0;
        let previousMultiplier = 0;
        for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
            console.log(`Checking token = ${tokens[tokenIndex]}...`)
            if (valueKeys.includes(tokens[tokenIndex])) {
                let valueToAdd = values[tokens[tokenIndex]];
                currentValue += valueToAdd;
                console.log(`Added value = ${valueToAdd} to accumulated value now = ${accumulatedValue}`);
            }
            else if (multiplierKeys.includes(tokens[tokenIndex])) {
                let multiplier = multipliers[tokens[tokenIndex]];
                currentValue *= multiplier;
                console.log(`Multiplied by ${multiplier}, accumulated value now = ${accumulatedValue}`);
                previousMultiplier = multiplier;
            }
            else {
                console.error(`Unrecognized token = ${tokens[tokenIndex]}`);
            }
        }
        return accumulatedValue;
    }
})(module.exports);
