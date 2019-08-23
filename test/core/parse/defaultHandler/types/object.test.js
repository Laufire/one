import { collection } from '@laufire/utils';
import objectHandler from '../../../../../src/core/parse/defaultHandler/types/object'; // eslint-disable-line max-len

/* Helpers */
const { patch } = collection;

/* Tests */
describe('objectHandler', () => {
	const ctx = Symbol('ctx');
	const childHandlerResult = Symbol('customReturnValue');
	const childHandler = jest.fn(() => childHandlerResult);
	const childHandlerName = 'childHandler';
	const mockCoreBase = {
		handlers: {
			[childHandlerName]: childHandler,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('object configs return a handler function'
	+ 'which collects the results from the children', () => {
		const childConfig = {
			handler: childHandlerName,
		};
		const config = {
			someHandlerName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const returned = objectHandler(config, mockCore);
		const result = returned(ctx);

		expect(result).toEqual({
			someHandlerName: childHandlerResult,
		});
	});

	test('when a handler is not mentioned it\'s inferred from'
	+ ' the name of the children ', () => {
		const childConfig = {};
		const config = {
			[childHandlerName]: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const handler = objectHandler(config, mockCore);

		handler(ctx);

		expect(childHandler).toBeCalledWith({ ctx });
	});

	test('handlers receive the results of the preceding handlers', () => {
		const childConfig = {
			handler: childHandlerName,
		};
		const config = {
			firstChild: childConfig,
			secondChild: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const handler = objectHandler(config, mockCore);

		handler(ctx);

		expect(childHandler).toHaveBeenNthCalledWith(1, { ctx });
		expect(childHandler).toHaveBeenNthCalledWith(2, {
			ctx: ctx, firstChild: childHandlerResult,
		});
	});

	test.skip('the defaultHandler is used when a'
	+ ' handlers is unresolved', () => {
		const someReturnValue = Symbol('someReturnValue');
		const childConfig = {
			someKey: () => someReturnValue,
		};
		const config = {
			notAHandlerName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const handler = objectHandler(config, mockCore);

		expect(handler()).toEqual(someReturnValue);
	});
});
