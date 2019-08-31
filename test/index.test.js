import one from '../src';
import parse from '../src/core/parse';

/* Mocks and Stubs */
jest.mock('../src/core/parse', () => jest.fn());

/* Tests */
describe('one', () => {
	test('initializing', () => {
		const types = {};
		const config = {
			types,
		};
		const childConfig = {};
		const initialized = one(config);

		expect(initialized).toEqual({
			config: config,
			parse: expect.any(Function),
			types: types,
		});

		initialized.parse(childConfig);
		expect(parse)
			.toHaveBeenCalledWith(childConfig, initialized);
	});

	test('config is an optional argument', () => {
		expect(one()).toEqual(expect.any(Object));
	});

	test('config.types is an optional argument', () => {
		const assignedTypes = one({}).types;

		expect(assignedTypes).toEqual({});
	});
});
