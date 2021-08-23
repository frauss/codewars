function Automaton()
{
    this.currentState = 0;
    this.states = ["q1", "q2", "q3"];
}

Automaton.prototype.readCommands = function(commands)
{
    console.log(`Incoming commands: ${JSON.stringify(commands)}`);
    this.currentState = 0;
    for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
        console.log(`Current state = ${this.states[this.currentState]}, command = ${commands[commandIndex]}`);
        switch (this.states[this.currentState]) {
            case "q1":
                if (commands[commandIndex] == 1) {
                    this.currentState = 1;
                }
                break;
            case "q2":
                if (commands[commandIndex] == 0) {
                    this.currentState = 2;
                }
                break;
            case "q3":
                this.currentState = 1;
                break;
        }
        console.log(`New state = ${this.states[this.currentState]}`);
    }
    return (this.currentState == 1);
}

var myAutomaton = new Automaton();

// Do anything necessaryto set up your automaton's states, q1, q2, and q3.