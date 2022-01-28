const { pipe } = require('./index.js');

it('should pipe functions in the correct order', function () {
    const mockFn1 = jest.fn().mockReturnValue(1);
    const mockFn2 = jest.fn().mockReturnValue(2);
    const mockFn3 = jest.fn().mockReturnValue(3);

    const pipedFn = pipe(mockFn1, mockFn2, mockFn3);

    // mockFn1 invoked last and it's result returned from the piped function
    expect(pipedFn("some", "args")).toBe(1);

    // mockFn3 is invoked first with the pipedFn arguments
    expect(mockFn3).lastCalledWith("some", "args");
    // mockFn2 gets called with output from mockFn3
    expect(mockFn2).lastCalledWith(3);
    expect(mockFn1).lastCalledWith(2);
});