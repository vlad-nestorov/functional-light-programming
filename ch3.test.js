const unary = require('./index.js');

it('should pass only a single argument', function () {
    const mockFn = jest.fn().mockReturnValue('mockResult');

    const unaryFn = unary(mockFn);

    expect(
        unaryFn(1, "2", [3])
    ).toBe(
        'mockResult'
    )
    expect(mockFn).lastCalledWith(1);
});


it('using parseInt in map directly leads to unexpected results', function () {
    expect(
        ["1", "2", "3"].map(parseInt)
    ).toEqual(
        [1, Number.NaN, Number.NaN]
    );
});

it('changing behavior of parseInt by passing single argument leads to expected results', function () {
    expect(
        ["1", "2", "3"].map( unary(parseInt) )
    ).toEqual(
        [1, 2, 3]
    );
});

it('should apply partial ', function () {
    function partial(fn, ...args) {
        return function partialFn(...remainingArgs) {
            return fn(...args, ...remainingArgs)
        }
    }

    const mockFn = jest.fn();

    const partialFn = partial(mockFn, "Hello");

    partialFn("World");

    expect(mockFn).lastCalledWith("Hello", "World");

});

it('should curry a function', function () {
    function partial(fn, ...args) {
        return function partialFn(...remainingArgs) {
            return fn(...args, ...remainingArgs)
        }
    }

    function curry(fn, arity = fn.length) {
        return arity < 2 ? fn :
            function partialCurry( arg ) {
                return curry( partial(fn, arg), --arity  );
            }
    }

    function concat(x, y, z) {
        return x + y + z;
    }


    const curriedFn = curry( concat, 3 );


    expect(
        curriedFn("hello")("world")("here's")
    ).toEqual("helloworldhere's")



});
