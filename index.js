// Ch 3 FP utility functions

function unary(fn) {
    return function firstArgument( arg ) {
        return fn( arg );
    }
}

function partial(fn, ...args) {
    return function partialFn(...remainingArgs) {
        return fn(...args, ...remainingArgs)
    }
}

function curry(fn, arity) {
    return arity < 2 ? fn :
        function partialCurry( arg ) {
            return curry( partial(fn, arg), --arity  );
        }
}

function looseCurry(fn, arity) {
    return arity < 2 ? fn :
        function partialCurry( ...args ) {
            return curry( partial(fn, ...args), arity - args.length  );
        }
}

// Ch4

function compose(...fnArgs) {
    // Not handling case where no function arguments passed
    return function composed(...args) {
        // inner-most result
        let result = fnArgs[fnArgs.length - 1](...args);
        for (let i = fnArgs.length - 2; i >= 0; i--) {
            result = fnArgs[i](result)
        }
        return result;
   }
}

// Same as compose but using reduce
function compose2(...fnArgs) {
    // Not handling case where no function arguments passed
    return function composed(...args) {
        let [lastFnArg, ...remainingFnArgs] = [...fnArgs].reverse();
        // inner-most result
        return remainingFnArgs.reduce(function (result, fn) {
            return fn(result)
        }, lastFnArg(...args));
    }
}

function pipe(...fnArgs) {
    // Not handling case where no function arguments passed
    return function piped(...args) {
        // inner-most result
        let result = fnArgs[0](...args);
        for (let i = 1; i < fnArgs.length; i++) {
            result = fnArgs[i](result)
        }
        return result;
    }
}

module.exports = {
    unary, partial, curry, looseCurry, compose, compose2, pipe
};
