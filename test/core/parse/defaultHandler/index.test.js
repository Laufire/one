import defaultHandler from '../../../../src/core/parse/defaultHandler';
import functionHandler from '../../../../src/core/parse/defaultHandler/types/function'; // eslint-disable-line max-len
import objectHandler from '../../../../src/core/parse/defaultHandler/types/object'; // eslint-disable-line max-len

/* Mocks and Stubs */
jest.mock('../../../../src/core/parse/defaultHandler/types/function',
	() => jest.fn());
jest.mock('../../../../src/core/parse/defaultHandler/types/object',
	() => jest.fn());

/* Tests */
describe('defaultHandler', () => {
	const mockCore = Symbol('Mock Core');

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('configs of the type - function, passed to the defaultHandler'
	+ ' are routed to the proper type handler', () => {
		const config = () => {};

		defaultHandler(config, mockCore);

		expect(functionHandler).toBeCalledWith(config, mockCore);
	});

	test('configs of the type - object, passed to the defaultHandler '
	+ 'are routed to the proper type handler', () => {
		const config = {};

		defaultHandler(config, mockCore);

		expect(objectHandler).toBeCalledWith(config, mockCore);
	});
});
