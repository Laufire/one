import functionParser from '../../../../../src/core/parse/defaultParser/typeParsers/function'; // eslint-disable-line max-len

test('configs passed to the defaultParser are returned as is, '
	+ 'when they are functions', () => {
	const typeHandler = () => {};
	const mockCore = Symbol('Mock Core');
	const config = jest.fn(() => typeHandler);

	const returnedType = functionParser(config, mockCore);

	expect(config).toBeCalledWith(config, mockCore);
	expect(returnedType).toEqual(typeHandler);
});
