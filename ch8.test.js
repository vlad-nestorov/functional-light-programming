const { isOdd, isEven } = require('./index.js');

it.each([
    [0, false],
    [1, true],
    [2, false],
    [9, true],
])('isOdd should return true for odd numbers', function (number, expected) {
    expect(isOdd(number)).toBe(expected);
});