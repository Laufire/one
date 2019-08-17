/**
 * The Default Handler
 */

import { reflection } from '@laufire/utils';
import functionType from "./types/function";
import objectType from "./types/object";

/* Helpers */
const { inferType } = reflection;

/* Data */
const typeHandlers = {
	function: functionType,
	object: objectType,
};

/* Functions */
const defaultHandler = (config, core) =>
	typeHandlers[inferType(config)](config, core);

export default defaultHandler;
