(function () {
    module.exports = {
        pigIt: pigIt
    };

    function pigIt(str) {
        let returnText = str.slice();
        let wordRegex = /\w+/g;
        let wordIterator = str.matchAll(wordRegex);
        let wordMatch = wordIterator.next();
        while (!wordMatch.done) {
            let matchedValue = wordMatch.value[0];
            let latinWord = matchedValue.substr(1, matchedValue.length - 1) + matchedValue.substr(0, 1) + 'ay';
            returnText = 
            wordMatch = wordIterator.next();
        }
        return returnText;
    }
}(module.exports));
