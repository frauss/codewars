const debug = require("debug")("ChutesAndLadders");

function SnakesLadders() {
    this.boardLength = 100;
    this.players = [
        {
            "boardPosition": 0
        },
        {
            "boardPosition": 0
        }
    ];
    this.chutesAndLadders = [
        {
            "position": 2,
            "newPosition": 38
        },
        {
            "position": 7,
            "newPosition": 14
        },
        {
            "position": 8,
            "newPosition": 31
        },
        {
            "position": 15,
            "newPosition": 26
        },
        {
            "position": 16,
            "newPosition": 6
        },
      
        {
            "position": 21,
            "newPosition": 42
        },
        {
            "position": 28,
            "newPosition": 84
        },
        {
            "position": 36,
            "newPosition": 44
        },
        {
            "position": 46,
            "newPosition": 25
        },
        {
            "position": 49,
            "newPosition": 11
        },
        {
            "position": 51,
            "newPosition": 67
        },
        {
            "position": 62,
            "newPosition": 19
        },
        {
            "position": 64,
            "newPosition": 60
        },
        {
            "position": 71,
            "newPosition": 91
        },
        {
            "position": 74,
            "newPosition": 53
        },
        {
            "position": 78,
            "newPosition": 98
        },
        {
            "position": 87,
            "newPosition": 94
        },
              {
            "position": 89,
            "newPosition": 68
        },

        {
            "position": 92,
            "newPosition": 88
        },
        {
            "position": 95,
            "newPosition": 75
        },
        {
            "position": 99,
            "newPosition": 80
        }
    ];
    this.playerIndex = 0;
    this.gameOver = false;
};

SnakesLadders.prototype.play = function (die1, die2) {
    debug(`It's Player ${this.playerIndex + 1}'s turn from position = ${this.players[this.playerIndex].position}`)
    debug(`Entering play method with die1 = ${die1}, die2 = ${die2}`);

    // First make sure we don't have a winner already
    if (this.gameOver) {
        debug("Winner already found");
        return "Game over!";
    }

    // Calculate current players new position
    let moveDistance = die1 + die2;
    debug(`Distance to move is ${moveDistance}`);
    let newPosition = this.players[this.playerIndex].boardPosition + moveDistance;
    debug(`Newly calculated position for player ${this.playerIndex + 1} is ${newPosition}`);

    // Move takes player to last space, winner!
    let returnText;
    if (newPosition === this.boardLength) {
        returnText = `Player ${this.playerIndex + 1} Wins!`;
        this.gameOver = true;
    }

    // If still on board, see if landed on a chute or ladder and set position accordingly
    else if (newPosition < this.boardLength) {
        let chuteOrLadder = this.findChuteOrLadder(newPosition);
        if (chuteOrLadder) {
            debug(`Found an object at position = ${newPosition}, newPosition = ${chuteOrLadder.newPosition}`)
            this.players[this.playerIndex].boardPosition = chuteOrLadder.newPosition;
        }
        else {
            this.players[this.playerIndex].boardPosition = newPosition;
        }
        returnText = `Player ${this.playerIndex + 1} is on square ${this.players[this.playerIndex].boardPosition}`;
    }
        
    // New Position is off the end of the board so we move to last space and 
    // "bounce" the user back the remaining # of squares
    else {
        newPosition = this.boardLength - (newPosition - this.boardLength);
        debug(`Player ${this.playerIndex + 1} bounced back to position ${this.players[this.playerIndex].boardPosition}`);
        let chuteOrLadder = this.findChuteOrLadder(newPosition);
        if (chuteOrLadder) {
            debug(`Found an object at position = ${newPosition}, newPosition = ${chuteOrLadder.newPosition}`)
            this.players[this.playerIndex].boardPosition = chuteOrLadder.newPosition;
        }
        else {
            this.players[this.playerIndex].boardPosition = newPosition;
        }
        returnText = `Player ${this.playerIndex + 1} is on square ${this.players[this.playerIndex].boardPosition}`;
    }

    // See if a double was rolled, if so don't change player
    if (die1 !== die2) {
        this.playerIndex = (this.playerIndex) ? 0 : 1;
    }
    return returnText;
};

SnakesLadders.prototype.findChuteOrLadder = function (position) {
    return this.chutesAndLadders.find(chuteOrLadder => chuteOrLadder.position === position);
};

let game = new SnakesLadders();
do {
    let die1 = Math.ceil(Math.random() * 6);
    let die2 = Math.ceil(Math.random() * 6);
    let returnText = game.play(die1, die2);
    if (returnText === 'Game over!')        
        break;
    else {
        console.log(returnText);
    }
} while (true);