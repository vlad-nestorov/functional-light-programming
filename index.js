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

module.exports = {
    unary, partial, curry
};
