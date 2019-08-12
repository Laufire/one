/* The main entry. */

import { collection, reflection } from '@laufire/utils';

/* Helpers */
const { isFunction } = reflection;
const { values } = collection;

/* Exports */
export default (baseConfig = {}) => {
	const { handlers = {}} = baseConfig;

	return {
		parse: (configTree) =>
			(isFunction(configTree)
				? configTree
				: values(configTree)
					.map(
						(childConfig) => handlers[childConfig.handler](childConfig)
					)
					.pop()),
	};
};
