import one from '../src';
import parse from '../src/core/parse';

/* Mocks and Stubs */
jest.mock('../src/core/parse', () => jest.fn());

/* Tests */
describe('one', () => {
	test('initializing', () => {
		const handlers = {};
		const config = {
			handlers,
		};
		const childConfig = {};
		const childHandlerName = '';

		const initialized = one(config);

		expect(initialized).toEqual({
			config: config,
			handlers: handlers,
			parse: expect.any(Function),
		});

		initialized.parse(childConfig, childHandlerName);
		expect(parse)
			.toHaveBeenCalledWith(childConfig, childHandlerName, initialized);
	});

	test('config is an optional argument', () => {
		expect(one()).toEqual(expect.any(Object));
	});

	test('config.handlers is an optional argument', () => {
		const assignedHandlers = one({}).handlers;

		expect(assignedHandlers).toEqual({});
	});
});
