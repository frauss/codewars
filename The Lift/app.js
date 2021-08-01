(function () {

    module.exports = {
        toCamelCase: toCamelCase
    };

    function toCamelCase(str){
        let testingRegex = /[_-](\w)/;
        let match = str.match(testingRegex);
        while (match) {
            str = str.substr(0, match.index) + match[1].toUpperCase() + str.substr(match.index + match[0].length);
            match = str.match(testingRegex);
        }
        return str;
    }
}(module.exports));
