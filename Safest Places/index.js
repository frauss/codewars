(function () {
    module.exports = {
        advice: advice
    };

    function advice(agents, n) {
        console.log(`n = ${n}, agents = [${agents.join(',')}]`);

        if (n === 0)
            return [];
        if (agents.length === 0)
            return allCoordinates(n);
        let maxDistanceMatrix = [];
        for (let x = 0; x < n; x++) {
            maxDistanceMatrix.push(new Array(n));
            for (let y = 0; y < n; y++) {
                maxDistanceMatrix[x][y] = -1
            }
        }

        // for each "agent" calculate the distance of a given cell in the distance matrix
        // from it. If the cell has a distance already keep the smaller value
        let agentsAdded = 0;
        for (let agentIndex = 0; agentIndex < agents.length; agentIndex++) {

            // Make sure agent is inside the "city"
            if (agents[agentIndex][0] < 0 || agents[agentIndex][0] >= n ||
                agents[agentIndex][1] < 0 || agents[agentIndex][1] >= n) {
                continue;
            }
            agentsAdded += 1;

            // Loop through all points in the city and calculate distance from agent
            for (let x = 0; x < n; x++) {
                for (let y = 0; y < n; y++) {
                    let currentCoordinates = [x, y];
                    let distance = manhattanDistance(agents[agentIndex], currentCoordinates);
                    if (maxDistanceMatrix[x][y] === -1 || maxDistanceMatrix[x][y] > distance)
                        maxDistanceMatrix[x][y] = distance;
                }
            }
        }

        if (agentsAdded === 0)
            return allCoordinates(n);

        // Find maximum distance found
        let maxDistance = 0;
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                if (maxDistanceMatrix[x][y] > maxDistance)
                    maxDistance = maxDistanceMatrix[x][y];
            }
        }
        if (maxDistance === 0)
            return [];

        let returnCoordinates = [];
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                if (maxDistanceMatrix[x][y] === maxDistance) {
                    returnCoordinates.push([x, y]);
                }
            }
        }
        return returnCoordinates;
    }

    function allCoordinates(n) {
        let returnCoordinates = [];
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                returnCoordinates.push([x, y]);
            }
        }
        return returnCoordinates;
    }

    function manhattanDistance(p1, p2) {
        return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
    }
}(module.exports));