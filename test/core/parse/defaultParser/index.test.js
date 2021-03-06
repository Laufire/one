import defaultParser from '../../../../src/core/parse/defaultParser';
import functionParser from '../../../../src/core/parse/defaultParser/typeParsers/function'; // eslint-disable-line max-len
import objectParser from '../../../../src/core/parse/defaultParser/typeParsers/object'; // eslint-disable-line max-len
import stringParser from '../../../../src/core/parse/defaultParser/typeParsers/string'; // eslint-disable-line max-len

/* Mocks and Stubs */
jest.mock('../../../../src/core/parse/defaultParser/typeParsers/function',
	() => jest.fn());
jest.mock('../../../../src/core/parse/defaultParser/typeParsers/object',
	() => jest.fn());
jest.mock('../../../../src/core/parse/defaultParser/typeParsers/string',
	() => jest.fn());

/* Tests */
describe('defaultParser', () => {
	const mockCore = Symbol('Mock Core');

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('configs of the type - function, passed to the defaultParser'
	+ ' are routed to the proper typeParser', () => {
		const config = () => {};

		defaultParser(config, mockCore);

		expect(functionParser).toBeCalledWith(config, mockCore);
	});

	test('configs of the type - object, passed to the defaultParser '
	+ 'are routed to the proper typeParser', () => {
		const config = {};

		defaultParser(config, mockCore);

		expect(objectParser).toBeCalledWith(config, mockCore);
	});

	test('configs of the type - string, passed to the defaultParser '
	+ 'are routed to the proper typeParser', () => {
		const config = '';

		defaultParser(config, mockCore);

		expect(stringParser).toBeCalledWith(config, mockCore);
	});
});
