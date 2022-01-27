const unary = require('./index.js');

it('should pass only a single argument', function () {
    const mockFn = jest.fn();
    const unaryFn = unary(mockFn);
    unaryFn(1, "2", [3]);
    expect(mockFn).lastCalledWith(1);
}); 