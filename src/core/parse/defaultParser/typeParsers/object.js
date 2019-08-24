/**
 * Parser for the config type, object.
 */

import { collection } from '@laufire/utils';

/* Helpers */
const { collect } = collection;

export default (config, core) => {
	const childTypes = collect(config,
		(childConfig, configName) => core.types[childConfig.type || configName]
		// TODO: The defaultParser is dynamically imported, to avoid circular dependencies. Find a way to fix this.
		|| require('../index').default);

	return (ctx) => {
		const scope = {};

		return collect(childTypes, (type, typeName) =>
			(scope[typeName] = type({ ctx, ...scope })));
	};
};
