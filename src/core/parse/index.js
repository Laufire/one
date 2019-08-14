/**
 * The Parser
 */

import defaultHandler from './defaultHandler';

/* Exports */
export default (config, handlerName, core) =>
	(core.handlers[
		handlerName || config.handler
	] || defaultHandler)(config, core);
