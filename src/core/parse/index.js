/**
 * The Parser
 */

import defaultParser from './defaultParser';

/* Exports */
export default (config, core) =>
	(core.types[config.type] || defaultParser)(config, core);
