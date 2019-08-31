/* The main entry. */

import parse from './core/parse';

/* Exports */
export default (baseConfig = {}) => {
	const types = baseConfig.types || {};

	const core = {
		config: { ...baseConfig, types },
		parse: (config) => parse(config, core),
		types: types,
	};

	return core;
};
