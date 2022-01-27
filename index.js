// Ch 3 unary functions

function unary(fn) {
    return function firstArgument( arg ) {
        return fn( arg );
    }
}

module.exports = unary;
