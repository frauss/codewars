const assert = require("chai").assert;

let testee = require('../index');

describe("Your testee.interpreter", function () {

    // Prints representation of datagrid - 0's are black and 1's are white
    // Note: prettyPrint() only works properly if your interpreter returns a representation of the datagrid in the correct format
    function prettyPrint(datagrid) {
        var consoleOutput = "<pre>", copy = datagrid.split("\r\n");
        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < copy[i].length; j++) {
                consoleOutput += `<span style="color:${copy[i][j] === "0" ? "black" : "white"};background-color:${copy[i][j] === "0" ? "black" : "white"}">xx</span>`;
            }
            consoleOutput += "<br />";
        }
        consoleOutput += "</pre>";
        console.log(consoleOutput);
        return datagrid;
    }
    // Displays the grid your interpreter returns
    function displayActual(actual) {
        console.log("You returned:");
        return prettyPrint(actual);
    }
    // Displays the expected final state of datagrid
    function displayExpected(expected) {
        console.log("Expected final state of data grid:");
        return prettyPrint(expected);
    }

    it("should work for some example test cases", function () {
        assert.equal(displayActual(testee.interpreter("*e*e*e*es*es*ws*ws*w*w*w*n*n*n*ssss*s*s*s*", 0, 6, 9)),
            displayExpected("000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000"),
            "Your interpreter should initialize all cells in the datagrid to 0");
        assert.equal(displayActual(testee.interpreter("*e*e*e*es*es*ws*ws*w*w*w*n*n*n*ssss*s*s*s*", 7, 6, 9)),
            displayExpected("111100\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000\r\n000000"),
            "Your interpreter should adhere to the number of iterations specified");
        assert.equal(displayActual(testee.interpreter("*e*e*e*es*es*ws*ws*w*w*w*n*n*n*ssss*s*s*s*", 19, 6, 9)),
            displayExpected("111100\r\n000010\r\n000001\r\n000010\r\n000100\r\n000000\r\n000000\r\n000000\r\n000000"),
            "Your interpreter should traverse the 2D datagrid correctly");
        assert.equal(displayActual(testee.interpreter("*e*e*e*es*es*ws*ws*w*w*w*n*n*n*ssss*s*s*s*", 42, 6, 9)),
            displayExpected("111100\r\n100010\r\n100001\r\n100010\r\n111100\r\n100000\r\n100000\r\n100000\r\n100000"),
            "Your interpreter should traverse the 2D datagrid correctly for all of the \"n\", \"e\", \"s\" and \"w\" commands");
        assert.equal(displayActual(testee.interpreter("*e*e*e*es*es*ws*ws*w*w*w*n*n*n*ssss*s*s*s*", 100, 6, 9)),
            displayExpected("111100\r\n100010\r\n100001\r\n100010\r\n111100\r\n100000\r\n100000\r\n100000\r\n100000"),
            "Your interpreter should terminate normally and return a representation of the final state of the 2D datagrid when all commands have been considered from left to right even if the number of iterations specified have not been fully performed");
    });

    it("should work for loops", function () {
        assert.equal(displayActual(testee.interpreter('*[es*]', 9, 5, 6)),
            displayExpected('10000\r\n01000\r\n00100\r\n00000\r\n00000\r\n00000'),
            "Your interpreter should evaluate this loop");
    });
});
