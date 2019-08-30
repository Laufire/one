/**
 * Parser for the config type, object.
 */

import { collection, reflection } from '@laufire/utils';

/* Helpers */
const { collect } = collection;
const { isObject } = reflection;

export default (config, core) => {
	const childHandlers = collect(config,
		(childConfig, configName) => (
			core.types[
				isObject(childConfig)
					? childConfig.type || configName
					: configName
			]
			// TODO: The defaultParser is dynamically imported, to avoid circular dependencies. Find a way to fix this.
			|| require('../index').default
		)(childConfig, core));

	return (ctx) => {
		const scope = {};

		return collect(childHandlers, (type, typeName) =>
			(scope[typeName] = type({ ctx, ...scope })));
	};
};
