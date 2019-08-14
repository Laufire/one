import parse from '../../../src/core/parse';
import defaultHandler from '../../../src/core/parse/defaultHandler';
import { collection } from '@laufire/utils';

/* Mocks and Stubs */
jest.mock('../../../src/core/parse/defaultHandler', () => jest.fn());

/* Helpers */
const { patch } = collection;

/* Tests */
describe('parsing', () => {
	const customHandler = jest.fn();
	const customHandlerName = 'someHandler';
	const childConfig = {
		handler: customHandlerName,
	};
	const config = {
		someDummyName: childConfig,
	};
	const handlers = {
		[customHandlerName]: customHandler,
	};
	const core = {
		config,
		handlers,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('parse passes the configs and the core '
	+ 'to the specified handler', () => {
		const someConfig = {};

		parse(someConfig, customHandlerName, core);

		expect(customHandler).toHaveBeenCalledWith(someConfig, core);
		expect(customHandler).toHaveBeenCalledTimes(1);
	});

	test('parse passes the configs and the core '
	+ 'to the handler specified in the config', () => {
		const configWithHandler = patch(config, {
			handler: customHandlerName,
		});

		parse(configWithHandler, undefined, core);

		expect(customHandler).toHaveBeenCalledWith(configWithHandler, core);
		expect(customHandler).toHaveBeenCalledTimes(1);
	});

	test('parse passes the configs and the core '
	+ 'to the defaultHandler when no handler is specified', () => {
		const someConfig = {};

		parse(someConfig, undefined, core);

		expect(defaultHandler).toHaveBeenCalledWith(someConfig, core);
		expect(defaultHandler).toHaveBeenCalledTimes(1);
	});
});
