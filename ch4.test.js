const {
    compose, compose2, compose3, compose4, compose3Equivalent, compose4Equivalent, pipe,
    imperative, tacit
} = require('./index.js');

describe('ch4 functions', () => {

    it.each([
        {fn: imperative},
        {fn: tacit},
    ])('$fn.name should print the order owner\'s name', function ({fn: fnToTest}) {

        const ajax = jest.fn();
        const output = jest.fn();

        fnToTest(ajax, output);

        expect(ajax).toBeCalledWith("http://some.api/order", { id: -1 }, expect.any(Function));

        let [,,callback] = ajax.mock.calls.pop();
        callback({personId: 4});

        expect(ajax).toBeCalledWith("http://some.api/person", { id: 4 }, expect.any(Function));

        [,,callback] = ajax.mock.calls.pop();
        callback({name: 'Fred'});

        expect(output).toBeCalledWith('Fred');
    });

    it.each([
        {fn: compose},
        {fn: compose2},
        {fn: compose3, singleArgumentPassed: true},
        {fn: compose3Equivalent, singleArgumentPassed: true},
        {fn: compose4},
        {fn: compose4Equivalent}
    ])('$fn.name should compose functions in the correct order', function ({fn: fnToTest, singleArgumentPassed}) {
        const mockFn1 = jest.fn().mockReturnValue(1);
        const mockFn2 = jest.fn().mockReturnValue(2);
        const mockFn3 = jest.fn().mockReturnValue(3);

        const composedFn = fnToTest(mockFn1, mockFn2, mockFn3);

        // mockFn1 invoked last and it's result returned from the piped function
        expect(composedFn("some", "args")).toBe(1);

        // mockFn3 is invoked first with the pipedFn arguments
        expect(mockFn3).lastCalledWith(
            ...singleArgumentPassed ? ["some"] : ["some", "args"]
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


