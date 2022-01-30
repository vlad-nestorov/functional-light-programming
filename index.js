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

function partialRight(fn, ...args) {
    return function partialFn(...remainingArgs) {
        return fn(...remainingArgs, ...args)
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

// getify's version of compose, innermost call should not support multiple arguments.
function compose3(...fns) {
    return function composed(result){
        return [...fns].reverse().reduce( function reducer(result,fn){
            return fn( result );
        }, result );
    };
}

// getify's version - should allow for passing of multiple arguments.
// calling reducer without initial value will take the first item of the array as the initial value and skip accumulating it.
// note the reducer now returns the function to invoke. In compose3 the reducer returns the result of the invocation.
function compose4(...fns) {
    return fns.reverse().reduce( function reducer(fn1,fn2){
        return function composed(...args){
            return fn2( fn1( ...args ) );
        };
    } );
}

// compose3(fn1, fn2, fn3) equivalent:
function compose3Equivalent(fn1, fn2, fn3) {
    return function composed3(result) {
        // reduce runs here every time composed3 is called
        return fn1( fn2( fn3(result) ) );
    }
}

// compose4(fn1, fn2, fn3) equivalent:
function compose4Equivalent(fn1, fn2, fn3) {
    // reduce runs in this scope, so composed41 is already a nested function without the reduce
    return function composed41(...args) {
        return fn1( function composed42(...args){
            return fn2( fn3(...args));
        }(...args))
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


// ch4 - revisiting points
// given: ajax( url, data, cb )

function imperative(ajax, output) {
    var getPerson = partial( ajax, "http://some.api/person" );
    var getLastOrder = partial( ajax, "http://some.api/order", { id: -1 } );

    getLastOrder( function orderFound(order){
        getPerson( { id: order.personId }, function personFound(person){
            output( person.name );
        } );
    } );
}

function tacit(ajax, output) {
    let getPerson = curry( partial( ajax, "http://some.api/person" ), 2);
    let getLastOrder = partial( ajax, "http://some.api/order", { id: -1 } );
    let prop = ( name, object ) => object[name];
    let makeObjectWithProp = (name, value ) => ({[name]: value});

    let invoke = ( args ) => ( fn ) => fn(args);


    getLastOrder(
        pipe(
            partial(prop, 'personId'),
            partial(makeObjectWithProp, 'id'),
            getPerson,
            invoke(
                pipe(
                    partial(prop, 'name'),
                    output
                )
            )
        )
    )
}


module.exports = {
    unary, partial, curry, looseCurry, compose, compose2, compose3, compose4, compose3Equivalent, compose4Equivalent, pipe,
    imperative, tacit
};
