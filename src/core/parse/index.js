/**
 * The Parser
 */

import defaultParser from './defaultParser';

/* Exports */
export default (config, typeName, core) =>
	(core.types[
		typeName || config.type
	] || defaultParser)(config, core);
