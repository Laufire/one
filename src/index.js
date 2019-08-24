/* The main entry. */

import parse from './core/parse';

/* Exports */
export default (baseConfig = {}) => {
	const core = {
		config: baseConfig,
		parse: (config, typeName) => parse(config, typeName, core),
		types: baseConfig.types || {},
	};

	return core;
};
