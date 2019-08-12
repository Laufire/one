/* The main entry. */

import { reflection } from '@laufire/utils';

/* Helpers */
const { isFunction } = reflection;

/* Exports */
export default () => ({
	parse: (configTree) =>
		(isFunction(configTree) ? configTree : configTree),
});
