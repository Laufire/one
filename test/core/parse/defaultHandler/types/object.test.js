import { collection } from '@laufire/utils';
import objectParser from '../../../../../src/core/parse/defaultParser/typeParsers/object'; // eslint-disable-line max-len

/* Helpers */
const { patch } = collection;

/* Tests */
describe('objectParser', () => {
	const ctx = Symbol('ctx');
	const childHandlerResult = Symbol('childHandlerResult');
	const childHandler = jest.fn(() => childHandlerResult);
	const childTypeName = 'childType';
	const mockCoreBase = {
		types: {
			[childTypeName]: childHandler,
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

		const returned = objectParser(config, mockCore);
		const result = returned(ctx);

		expect(result).toEqual({
			someTypeName: childHandlerResult,
		});
	});

	test('when a type is not mentioned it\'s inferred from '
	+ 'the name of the children ', () => {
		const childConfig = {};
		const config = {
			[childTypeName]: childConfig,
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const type = objectParser(config, mockCore);

		type(ctx);

		expect(childHandler).toBeCalledWith({ ctx });
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

		const type = objectParser(config, mockCore);

		type(ctx);

		expect(childHandler).toHaveBeenNthCalledWith(1, { ctx });
		expect(childHandler).toHaveBeenNthCalledWith(2, {
			ctx: ctx, firstChild: childHandlerResult,
		});
	});
});
