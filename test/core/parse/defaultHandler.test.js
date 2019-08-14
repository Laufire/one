import defaultHandler from '../../../src/core/parse/defaultHandler';
import { collection } from '@laufire/utils';

/* Helpers */
const { patch } = collection;

/* Tests */
describe('defaultHandler', () => {
	const customHandler = jest.fn();
	const customHandlerName = 'someHandler';
	const mockCoreBase = {
		handlers: {
			[customHandlerName]: customHandler,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('configs passed to the defaultHandler are returned as is, '
	+ 'when they are functions', () => {
		const testFunction = () => {};
		const mockCore = mockCoreBase;

		expect(defaultHandler(testFunction, mockCore))
			.toEqual(testFunction);
	});

	test('child configs of the config are passed '
	+ 'to the respective handlers, inferred from the config name '
	+ 'with the childConfigs and the core itself as arguments', () => {
		const childConfig = {};
		const config = {
			[customHandlerName]: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		defaultHandler(config, mockCore);

		expect(customHandler).toBeCalledWith(childConfig, mockCore);
	});

	test('child configs of the config are passed '
	+ 'to the respective handlers, got from the key, handler'
	+ 'with the childConfigs and the core itself as arguments', () => {
		const childConfig = {
			handler: customHandlerName,
		};
		const config = {
			someOtherName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		defaultHandler(config, mockCore);

		expect(customHandler).toBeCalledWith(childConfig, mockCore);
	});

	test('handlers are optional, which default to the default handler', () => {
		const someFunction = () => {};
		const childConfig = {
			fn: someFunction,
		};
		const config = {
			notAHandlerName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const returned = defaultHandler(config, mockCore);

		expect(returned).toEqual(someFunction);
	});

	test('when there are multiple child configs '
	+ 'the output of the last handler is returned', () => {
		const someSymbol = Symbol('someSymbol');
		const modifiedCore = patch(mockCoreBase, {
			handlers: {
				lastHandler: () => someSymbol,
			},
		});
		const testConfig = {
			firstChild: {
				handler: customHandlerName,
			},
			lastChild: {
				handler: 'lastHandler',
			},
		};

		const returned = defaultHandler(testConfig, modifiedCore);

		expect(returned).toEqual(someSymbol);
	});
});
