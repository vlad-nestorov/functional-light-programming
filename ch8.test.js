const { isOdd, isOddV2, isEven } = require('./index.js');

it.each([
    [0, false],
    [1, true],
    [2, false],
    [9, true],
])('isOdd should return true for odd numbers', function (number, expected) {
    expect(isOdd(number)).toBe(expected);
});

it('should run into a RangeError', function () {
    expect( () => isOdd(99999)).toThrow("Maximum call stack size exceeded");
});

it.each([
    [0, false],
    [1, true],
    [2, false],
    [9, true],
    // Trampolined version does not choke here.
    [99999, true],
    [100000, false],
])('isOdd should return true for odd numbers', function (number, expected) {
    expect(isOddV2(number)).toBe(expected);
});

