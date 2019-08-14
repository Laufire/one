/* The main entry. */

import parse from './core/parse';

/* Exports */
export default (baseConfig = {}) => {
	const core = {
		config: baseConfig,
		handlers: baseConfig.handlers || {},
		parse: (config, handlerName) => parse(config, handlerName, core),
	};

	return core;
};
