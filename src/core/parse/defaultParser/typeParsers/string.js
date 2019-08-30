/**
 * Parser for the config type, string.
 */

export default (config) =>
	new Function('scope', `with (scope) { return ${ config } }`); // eslint-disable-line no-new-func
