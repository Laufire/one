import { collection } from '@laufire/utils';
import stringParser from '../../../../../src/core/parse/defaultParser/typeParsers/string'; // eslint-disable-line max-len

/* Helpers */
const { patch } = collection;

/* Tests */
describe('stringParser', () => {
	const value = 1;
	const config = 'value + 1';
	const mockCoreBase = {};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('string configs return a handler function, '
	+ 'which evaluates the passed config', () => {
		const mockCore = patch(mockCoreBase, {});

		const typeHandler = stringParser(config, mockCore);
		const result = typeHandler({ value });

		expect(result).toEqual(value + 1);
	});
});
