import functionHandler from '../../../../../src/core/parse/defaultHandler/types/function'; // eslint-disable-line max-len

test('configs passed to the defaultHandler are returned as is, '
	+ 'when they are functions', () => {
	const handlerFunction = () => {};
	const mockCore = Symbol('Mock Core');
	const config = jest.fn(() => handlerFunction);

	const returnedHandler = functionHandler(config, mockCore);

	expect(config).toBeCalledWith(config, mockCore);
	expect(returnedHandler).toEqual(handlerFunction);
});
