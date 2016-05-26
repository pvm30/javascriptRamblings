// From Javascript the Good Parts -> Memoization
var memoizatedCalculator = function (memo, recursiveExpression) {

    var numberOfInvocations = 0;

    var calculateRecursiveExpression = function (n) {
        numberOfInvocations += 1;
        console.log("Invocations = " + numberOfInvocations);

        var result = memo[n];
        if (typeof result !== 'number') {
            // This is what I don't get completely ...
            result = recursiveExpression(calculateRecursiveExpression, n);
            memo[n] = result;
        }

        return result;
    }

    return {
        calculate: function (n) {
            return calculateRecursiveExpression(n);
        }
    };

};

var fibonacciCalculator = memoizatedCalculator([0,1], function (fibonacci, n) {
    return fibonacci(n - 1) + fibonacci(n - 2)});

for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacciCalculator.calculate(i));
}

var factorialCalculator = memoizatedCalculator([1,1], function (factorial, n) {
    return n * factorial(n-1)});

for (var i = 0; i <= 10; i += 1) {
    console.log('** ' + i + ': ' + factorialCalculator.calculate(i));
}
