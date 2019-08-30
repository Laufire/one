import { collection } from '@laufire/utils';
import defaultParser from '../../../../../src/core/parse/defaultParser';

/* Helpers */
const { patch } = collection;

/* Tests */
describe('integration of the types', () => {
	const returnValue = 1;
	const handler = () => returnValue;
	const parser = () => handler;
	const childTypeName = 'someType';
	const mockCoreBase = {
		types: {
			[childTypeName]: parser,
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('handlers receive the results of the preceding handlers', () => {
		const config = {
			firstChild: {
				type: childTypeName,
			},
			secondChild: () => ({ ctx, firstChild }) => (ctx.val = firstChild),
			thirdChild: 'ctx.val + firstChild',
		};
		const mockCore = patch(mockCoreBase, {
			config,
		});

		const typeHandler = defaultParser(config, mockCore);
		const context = {};
		const result = typeHandler(context);

		expect(context).toEqual({ val: returnValue });
		expect(result).toEqual({
			firstChild: returnValue,
			secondChild: returnValue,
			thirdChild: returnValue + returnValue,
		});
	});
});
