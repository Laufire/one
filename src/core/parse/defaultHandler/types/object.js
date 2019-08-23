/**
 * Default Handler for config type, object.
 */

import { collection } from '@laufire/utils';

/* Helpers */
const { collect } = collection;

export default (config, core) => {
	const childHandlers = collect(config,
		(childConfig, configName) =>
			core.handlers[
				childConfig.handler || configName
			]
		// TODO: The defaultHandler is dynamically imported, to avoid circular dependencies. Find a way to fix this.
		|| require('../index').default);

	return (ctx) => {
		const scope = {};

		return collect(childHandlers, (handler, handlerName) =>
			(scope[handlerName] = handler({ ctx, ...scope })));
	};
};
