// A customized version inspired by 'Javascript the Good Parts' -> Memoization
var memoizatedCalculator = function (memoizationDataStore, recursiveExpression) {

    // recursiveExpression is a function representing the recursion needed to calculate a value for the input 'n'
    var numberOfInvocations = 0;

    var calculateRecursiveExpressionUsingMemoization = function (n) {
        numberOfInvocations += 1;
        // console.log("Invocations = " + numberOfInvocations);

        var result = memoizationDataStore[n];
        if (typeof result !== 'number') {
            // We use the recursive expression in conjunction with the cached stored values to calculate the final
            // result for input 'n'
            result = recursiveExpression(calculateRecursiveExpressionUsingMemoization, n);
            memoizationDataStore[n] = result;
        }

        return result;
    }

    return {
        calculate: function (n) {
            return calculateRecursiveExpressionUsingMemoization(n);
        }
    };

};

var fibonacciCalculator = memoizatedCalculator([0, 1], function (fibonacci, n) {
    return fibonacci(n - 1) + fibonacci(n - 2)
});

for (var i = 0; i <= 10; i += 1) {
    console.log('// ' + i + ': ' + fibonacciCalculator.calculate(i));
}

var factorialCalculator = memoizatedCalculator([1, 1], function (factorial, n) {
    return n * factorial(n - 1)
});

for (var i = 0; i <= 10; i += 1) {
    console.log('** ' + i + ': ' + factorialCalculator.calculate(i));
}

console.log('## ' + i + ': ' + factorialCalculator.calculate(10));