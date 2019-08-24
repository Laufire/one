/**
 * The Default Type
 */

import { reflection } from '@laufire/utils';
import functionParser from './typeParsers/function';
import objectParser from './typeParsers/object';

/* Helpers */
const { inferType } = reflection;

/* Data */
const typeParsers = {
	function: functionParser,
	object: objectParser,
};

/* Exports */
export default (config, core) =>
	typeParsers[inferType(config)](config, core);
