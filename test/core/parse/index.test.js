import parse from '../../../src/core/parse';
import defaultParser from '../../../src/core/parse/defaultParser';

/* Mocks and Stubs */
jest.mock('../../../src/core/parse/defaultParser', () => jest.fn());

/* Tests */
describe('parsing', () => {
	const customType = jest.fn();
	const customTypeName = 'someType';
	const childConfig = {
		type: customTypeName,
	};
	const config = {
		someDummyName: childConfig,
	};
	const types = {
		[customTypeName]: customType,
	};
	const core = {
		config,
		types,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('parse passes the configs and the core '
	+ 'to the specified type handler', () => {
		const someConfig = {
			type: customTypeName,
		};

		parse(someConfig, core);

		expect(customType).toHaveBeenCalledWith(someConfig, core);
		expect(customType).toHaveBeenCalledTimes(1);
	});

	test('parse passes the configs and the core '
	+ 'to the defaultParser when no type is specified', () => {
		const someConfig = {};

		parse(someConfig, core);

		expect(defaultParser).toHaveBeenCalledWith(someConfig, core);
		expect(defaultParser).toHaveBeenCalledTimes(1);
	});
});
