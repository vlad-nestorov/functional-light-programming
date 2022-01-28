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

function pipe(...fnArgs) {
    // Not handling case where no function arguments passed
    return function piped(...args) {
        // inner-most result
        let result = fnArgs[fnArgs.length - 1](...args);
        for (let i = fnArgs.length - 2; i >= 0; i--) {
            result = fnArgs[i](result)
        }
        return result;
   }
}

module.exports = {
    unary, partial, curry, looseCurry, pipe
};
