import { collection } from '@laufire/utils';
import objectHandler from '../../../../../src/core/parse/defaultHandler/types/object'; // eslint-disable-line max-len

/* Helpers */
const { patch } = collection;

/* Tests */
describe('objectHandler', () => {
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

		objectHandler(config, mockCore);

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

		objectHandler(config, mockCore);

		expect(customHandler).toBeCalledWith(childConfig, mockCore);
	});

	test('handlers are optionals, which default to the defaultHandler', () => {
		const handler = () => {};
		const childConfig = {
			someKey: () => handler,
		};
		const config = {
			notAHandlerName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const returned = objectHandler(config, mockCore);

		expect(returned).toEqual(handler);
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

		const returned = objectHandler(testConfig, modifiedCore);

		expect(returned).toEqual(someSymbol);
	});
});
