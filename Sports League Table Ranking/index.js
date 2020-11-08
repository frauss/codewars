function computeRanks(number, games) {
    let teamResults = new Array(number);
    for (let teamIndex = 0; teamIndex < number; teamIndex++) {
        teamResults.push({
            team: teamIndex,
            points: 0,
            differential: 0,
            goals: 0
        });
    }
    for (let gameIndex = 0; gameIndex < games[0].length; gameIndex++) {
        console.log(`Game[${gameIndex}] = [${games[0][gameIndex].join(', ')}]`);

        // First calc points for game
        if (games[0][gameIndex][2] > games[0][gameIndex][3]) {
            console.log(`Winner is ${games[0][gameIndex][0]}`);
            teamResults[games[0][gameIndex][0]].points += 3;
        }
        else if (games[0][gameIndex][2] < games[0][gameIndex][3]) {
            console.log(`Winner is ${games[0][gameIndex][1]}`);
            teamResults[games[0][gameIndex][1]].points += 3;
        }
        else {
            console.log('Tie game');
            teamResults[games[0][gameIndex][0]].points += 1;
            teamResults[games[0][gameIndex][1]].points += 1;
        }

        // Update goal differential and goals scored for each team
        teamResults[games[0][gameIndex][0]].goals += games[0][gameIndex][2];
        teamResults[games[0][gameIndex][1]].goals += games[0][gameIndex][3];
        teamResults[games[0][gameIndex][0]].differential += games[0][gameIndex][2] - games[0][gameIndex][3];
        teamResults[games[0][gameIndex][1]].differential += games[0][gameIndex][3] - games[0][gameIndex][2];
    }
    teamResults.sort((t1, t2) => {
        if (t1.points > t2.points)
            return 1;
        else if (t1.points < t2.points)
            return -1;
        else if (t1.differential > t2.differential)
            return 1;
        else if (t1.differential < t2.differential)
            return -1;
        else if (t1.goals > t2.goals)
            return 1;
        else if (t1.goals < t2.goals)
            return -1
        else
            return 0;
    });

    teamResults.map(t => console.log(JSON.stringify(t)));
}
