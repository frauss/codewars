class Sandpile {
    constructor(piles) {
        if (piles) {
            console.log(`Pile:\n${piles}`);
            this.pile = [];
            for (let pile of piles.split('\n')) {
                let values = pile.split('');
                this.pile.push(values.map(v => parseInt(v)));
            }
            this.stabilize();
        }
        else {
            this.pile = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
        }
        console.log(`Created:\n${JSON.stringify(this.pile)}`);
    }

    add(sandpile) {
        console.log(`Adding ${JSON.stringify(this.pile)} to ${JSON.stringify(sandpile.pile)}`);
        let newPile = new Sandpile();
        for (let rowIndex = 0; rowIndex < this.pile.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.pile[rowIndex].length; columnIndex++) {
                newPile.pile[rowIndex][columnIndex] = this.pile[rowIndex][columnIndex] + sandpile.pile[rowIndex][columnIndex];
            }
        }
        newPile.stabilize();
        console.log(`Sum = ${JSON.stringify(newPile.pile)}`);
        return newPile;
    }

    toString() {
        let rowValues = [];
        for (let row of this.pile) {
            let rowText = row.map(v => v.toString()).join('');
            rowValues.push(rowText);
        }
        return rowValues.join('\n');
    }

    distribute(row, column) {
        let grainsToDistribute = (this.pile[row][column] >= 4) ? 4 : this.pile[row][column] % 4;
        console.log(`Pre-distribute for row = ${row}, column = ${column}. Distributing ${grainsToDistribute} grains:\n${this.toString()}`);
        this.pile[row][column] -= grainsToDistribute;
        for (let neighbor = 1; neighbor <= grainsToDistribute; neighbor++) {
            // 1 = cell above current
            // 2 = cell right of current
            // 3 = cell below current
            // 4 = cell left of current
            switch (neighbor) {
                case 1:
                    if (row - 1 >= 0) {
                        this.pile[row - 1][column] += 1;
                    }
                    break;
                case 2:
                    if (column + 1 < this.pile[0].length) {
                        this.pile[row][column + 1] += 1;
                    }
                    break;
                case 3:
                    if (row + 1 < this.pile.length) {
                        this.pile[row + 1][column] += 1;
                    }
                    break;
                case 4:
                    if (column - 1 >= 0) {
                        this.pile[row][column - 1] += 1;
                    }
                    break;
            }
        }
        console.log(`Post Distribute for row = ${row}, column = ${column}:\n${this.toString()}`);
    }

    stabilize() {
        while (!this.isStable()) {
            let valueLimit = this.pile.length;
            for (let rowIndex = 0; rowIndex < this.pile.length; rowIndex++) {
                for (let columnIndex = 0; columnIndex < this.pile[rowIndex].length; columnIndex++) {
                    while (this.pile[rowIndex][columnIndex] > valueLimit) {
                        this.distribute(rowIndex, columnIndex);
                    }
                }
            }
        }
    }

    isStable() {
        let valueLimit = this.pile.length;
        for (let rowIndex = 0; rowIndex < this.pile.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.pile[rowIndex].length; columnIndex++) {
                if (this.pile[rowIndex][columnIndex] > valueLimit)
                    return false;
            }
        }
        return true;
    }
}
module.exports = Sandpile;