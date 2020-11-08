(function () {
    module.exports = {
        sumOfPrimeDistance: sumOfPrimeDistance
    };

    function sumOfPrimeDistance(arr) {
        console.log(`Input values = [${arr.join(',')}]`);

        // Get all primes up to max value in incoming array
        let primes = sieve(arr[arr.length - 1]);
        let primeDistances = [];
        for (let increment = 1; increment < (arr[arr.length - 1] - arr[0]); increment++) {
            for (let index = 0; index < arr.length; index++) {
                let endIndex = index + increment;
                if (endIndex >= arr.length)
                    break;
                console.log(`Calculating prime distance between ${arr[index]} and ${arr[endIndex]}`);
                // let primeDistance = 0;
                // for (let testValue = arr[index]; testValue <= arr[endIndex]; testValue++) {
                //     primeDistance += (isPrime(testValue)) ? 1 : 0;
                // }
                let primeDistance = primes.filter(pv => pv >= arr[index] && pv <= arr[endIndex]).length;
                console.log(`Prime distance = ${primeDistance}`);
                primeDistances.push(primeDistance);
            }
        }
        let returnValue = primeDistances.reduce((a, c) => a + c);
        console.log(`Return = ${returnValue}`);
        return returnValue;
    }

    function sieve(limit) {
        let primes = [];
        if (limit >= 2) {
            let sqrtlmt = Math.sqrt(limit) - 2;
            let nums = new Array(); // start with an empty Array...
            for (let i = 2; i <= limit; i++) // and
                nums.push(i); // only initialize the Array once...
            for (let i = 0; i <= sqrtlmt; i++) {
                let p = nums[i];
                if (p)
                    for (let j = p * p - 2; j < nums.length; j += p)
                        nums[j] = 0;
            }
            for (let i = 0; i < nums.length; i++) {
                let p = nums[i];
                if (p)
                    primes.push(p);
            }
        }
        return primes;
    }
    
}(module.exports));