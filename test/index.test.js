import one from '../src';

describe('one', () => {
	test('initializing the parser', () => {
		expect(one()).toHaveProperty('parse', expect.any(Function));
	});
});

describe('parsing', () => {
	test('the passed configTree when it is a function', () => {
		const { parse } = one();
		const testFunction = () => {};

		expect(parse(testFunction)).toEqual(testFunction);
	});
});
