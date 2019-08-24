import parse from '../../../src/core/parse';
import defaultParser from '../../../src/core/parse/defaultParser';
import { collection } from '@laufire/utils';

/* Mocks and Stubs */
jest.mock('../../../src/core/parse/defaultParser', () => jest.fn());

/* Helpers */
const { patch } = collection;

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
	+ 'to the specified type', () => {
		const someConfig = {};

		parse(someConfig, customTypeName, core);

		expect(customType).toHaveBeenCalledWith(someConfig, core);
		expect(customType).toHaveBeenCalledTimes(1);
	});

	test('parse passes the configs and the core '
	+ 'to the type specified in the config', () => {
		const configWithType = patch(config, {
			type: customTypeName,
		});

		parse(configWithType, undefined, core);

		expect(customType).toHaveBeenCalledWith(configWithType, core);
		expect(customType).toHaveBeenCalledTimes(1);
	});

	test('parse passes the configs and the core '
	+ 'to the defaultParser when no type is specified', () => {
		const someConfig = {};

		parse(someConfig, undefined, core);

		expect(defaultParser).toHaveBeenCalledWith(someConfig, core);
		expect(defaultParser).toHaveBeenCalledTimes(1);
	});
});
