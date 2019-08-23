/**
 * Default Handler for config type, object.
 */

import { collection } from '@laufire/utils';

/* Helpers */
const { entries } = collection;

export default (config, core) => entries(config)
	.map(
		([configName, childConfig]) =>
			(core.handlers[
				childConfig.handler || configName
			]
			// TODO: The defaultHandler is dynamically imported, to avoid circular dependencies. Find a way to fix this.
			|| require('../index').default)(childConfig, core)
	)
	.pop();
