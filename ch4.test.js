const { compose, compose2, compose3, compose4, pipe } = require('./index.js');

describe('ch4 functions', () => {
    it.each([
        { fn: compose },
        { fn: compose2 },
        { fn: compose3, singleArgumentPassed: true },
        { fn: compose4 }
    ])('$fn.name should compose functions in the correct order', function ({fn: fnToTest, singleArgumentPassed}) {
        const mockFn1 = jest.fn().mockReturnValue(1);
        const mockFn2 = jest.fn().mockReturnValue(2);
        const mockFn3 = jest.fn().mockReturnValue(3);

        const composedFn = fnToTest(mockFn1, mockFn2, mockFn3);

        // mockFn1 invoked last and it's result returned from the piped function
        expect(composedFn("some", "args")).toBe(1);

        // mockFn3 is invoked first with the pipedFn arguments
        expect(mockFn3).lastCalledWith(
            ... singleArgumentPassed ? ["some"] : ["some", "args"]
        );
        // mockFn2 gets called with output from mockFn3
        expect(mockFn2).lastCalledWith(3);
        expect(mockFn1).lastCalledWith(2);
    });

    it('should pipe functions in the correct order', function () {
        const mockFn1 = jest.fn().mockReturnValue(1);
        const mockFn2 = jest.fn().mockReturnValue(2);
        const mockFn3 = jest.fn().mockReturnValue(3);

        const pipedFn = pipe(mockFn1, mockFn2, mockFn3);

        // mockFn3 invoked last and it's result returned from the piped function
        expect(pipedFn("some", "args")).toBe(3);

        // mockFn1 is invoked first with the pipedFn arguments
        expect(mockFn1).lastCalledWith("some", "args");
        // mockFn2 gets called with output from mockFn3
        expect(mockFn2).lastCalledWith(1);
        expect(mockFn3).lastCalledWith(2);
    });
});
