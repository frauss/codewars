const chai = require("chai");
const assert = chai.assert;
chai.config.truncateThreshold=0;

const Sandpile = require('../sandpile');

describe('Basic Tests', () => {
    it('should create and render an empty sandpile', () => {
        let sp = new Sandpile();
        assert.strictEqual(sp.toString(), '000\n000\n000');
    });

    it('should create a custom sandpile', () => {
        let sp = new Sandpile('130\n121\n322');
        assert.strictEqual(sp.toString(), '130\n121\n322');
    });
});

describe('Basic Addition', () => {
    it('should handle adding two empty sandpiles', () => {
        let sp1 = new Sandpile('000\n000\n000');
        let sp2 = new Sandpile();
        let sp3 = sp1.add(sp2);
        assert.strictEqual(sp3.toString(), '000\n000\n000');
    });

    it('should handle adding an empty sandpile to a non-empty one', () => {
        let sp1 = new Sandpile('130\n121\n322');
        let sp2 = new Sandpile();
        let sp3 = sp1.add(sp2);
        assert.strictEqual(sp3.toString(), '130\n121\n322');
    });

    it('should not mutate the original sandpiles', () => {
        let sp1 = new Sandpile('130\n121\n322');
        let sp2 = new Sandpile();
        let sp3 = sp1.add(sp2);
        assert.strictEqual(sp1.toString(), '130\n121\n322');
        assert.strictEqual(sp2.toString(), '000\n000\n000');
        assert.strictEqual(sp1 === sp3, false, 'Sandpile 1 should not Equal the sum');
        assert.strictEqual(sp2 === sp3, false, 'Sandpile 2 should not Equal the sum');
    });

    it('should handle adding two non-empty sandpiles', () => {
        let sp1 = new Sandpile('130\n121\n322');
        let sp2 = new Sandpile('202\n210\n001');
        let sp3 = sp1.add(sp2);
        assert.strictEqual(sp3.toString(), '332\n331\n323');
    });


    it('should handle chained addition', () => {
        let sp1 = new Sandpile('111\n111\n111');
        let sp2 = new Sandpile('111\n111\n111');
        let sp3 = new Sandpile('010\n101\n100');
        let sp4 = sp1.add(sp2).add(sp3);
        assert.strictEqual(sp4.toString(), '232\n323\n322');
    })
});

describe('Toppling', () => {
    it('should handle toppling a custom sandpile', () => {
        let sp = new Sandpile('430\n121\n322');
        assert.strictEqual(sp.toString(), '101\n231\n322');
    });
});
