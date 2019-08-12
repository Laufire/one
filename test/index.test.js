import one from '../src';

describe('one', () => {
	test('initializing the parser', () => {
		expect(one()).toHaveProperty('parse', expect.any(Function));
	});
});

describe('parsing', () => {
	test('the passed configTree is returned as is,'
	+ 'when it is a function.', () => {
		const { parse } = one();
		const testFunction = () => {};

		expect(parse(testFunction)).toEqual(testFunction);
	});

	test('child configs of the configTree are passed '
	+ 'to the respective handlers with the '
	+ 'childConfigs and the core itself as arguments', () => {
		const handler = jest.fn();
		const handlerName = 'someHandler';
		const childConfig = {
			handler: handlerName,
		};
		const testConfig = {
			someDummyName: childConfig,
		};
		const core = one({
			handlers: {
				[handlerName]: handler,
			},
		});

		core.parse(testConfig);

		expect(handler).toBeCalledWith(childConfig, core);
	});

	test('when there are multiple child configs '
	+ 'the output of the last handler is returned', () => {
		const handler = jest.fn((config) => config);
		const handlerName = 'someHandler';
		const lastChildConfig = {
			handler: handlerName,
			someValue: 'someValue',
		};
		const testConfig = {
			firstChild: {
				handler: handlerName,
			},
			lastChild: lastChildConfig,
		};

		const { parse } = one({
			handlers: {
				[handlerName]: handler,
			},
		});

		const returned = parse(testConfig);

		expect(returned).toEqual(lastChildConfig);
	});
});
