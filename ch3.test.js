const {
    unary, curry, partial
} = require('./index.js');

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

    const mockFn = jest.fn();

    const partialFn = partial(mockFn, "Hello");

    partialFn("World");

    expect(mockFn).lastCalledWith("Hello", "World");

});

it('should curry a function', function () {

    const mockFn = jest.fn().mockReturnValue('expectedReturn');

    const curriedFn = curry( mockFn, 3 );

    expect(
        curriedFn("hello")("world")("here's")
    ).toEqual("expectedReturn")

    expect(mockFn).lastCalledWith("hello", "world", "here's");

});
