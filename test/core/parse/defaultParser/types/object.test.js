import { collection } from '@laufire/utils';
import objectParser from '../../../../../src/core/parse/defaultParser/typeParsers/object'; // eslint-disable-line max-len
import defaultParser from '../../../../../src/core/parse/defaultParser';

/* Mocks and Stubs */
jest.mock('../../../../../src/core/parse/defaultParser', () => ({
	__esModule: true,
	default: jest.fn(),
}));

/* Helpers */
const { patch } = collection;

/* Tests */
describe('objectParser', () => {
	const ctx = Symbol('ctx');
	const childHandlerResult = Symbol('childHandlerResult');
	const childHandler = jest.fn(() => childHandlerResult);
	const childParser = jest.fn(() => childHandler);
	const childTypeName = 'childType';
	const mockCoreBase = {
		types: {
			[childTypeName]: childParser,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('object configs return a handler function, '
	+ 'which collects the results from the children', () => {
		const childConfig = {
			type: childTypeName,
		};
		const config = {
			someTypeName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const typeHandler = objectParser(config, mockCore);
		const result = typeHandler(ctx);

		expect(childParser).toBeCalledWith(childConfig, mockCore);
		expect(result).toEqual({
			someTypeName: childHandlerResult,
		});
	});

	test('when a type is not mentioned it\'s inferred from '
	+ 'the name of the children', () => {
		const childConfig = {};
		const config = {
			[childTypeName]: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const typeHandler = objectParser(config, mockCore);

		typeHandler(ctx);

		expect(childParser).toBeCalledWith(childConfig, mockCore);
		expect(childHandler).toBeCalledWith({ ctx });
	});

	test('when a type is not available the defaultParser is used', () => {
		const childConfig = () => {};
		const config = {
			notAHandlerName: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		objectParser(config, mockCore);

		expect(defaultParser).toBeCalledWith(childConfig, mockCore);
	});

	test('handlers receive the results of the preceding handlers', () => {
		const childConfig = {
			type: childTypeName,
		};
		const config = {
			firstChild: childConfig,
			secondChild: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const typeHandler = objectParser(config, mockCore);

		typeHandler(ctx);

		expect(childHandler).toHaveBeenNthCalledWith(1, { ctx });
		expect(childHandler).toHaveBeenNthCalledWith(2, {
			ctx: ctx, firstChild: childHandlerResult,
		});
	});
});
