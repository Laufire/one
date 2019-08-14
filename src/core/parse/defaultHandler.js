/**
 * The Default Handler
 */

import { collection, reflection } from '@laufire/utils';

/* Helpers */
const { isFunction } = reflection;
const { entries } = collection;

/* Functions */
const defaultHandler = (config, core) =>
	(isFunction(config)
		? config
		: entries(config)
			.map(
				([configName, childConfig]) =>
					(core.handlers[
						childConfig.handler || configName
					] || defaultHandler)(childConfig, core)
			)
			.pop());

export default defaultHandler;
