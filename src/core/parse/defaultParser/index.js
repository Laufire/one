/**
 * The Default Type
 */

import { reflection } from '@laufire/utils';
import functionParser from './typeParsers/function';
import objectParser from './typeParsers/object';
import stringParser from './typeParsers/string';

/* Helpers */
const { inferType } = reflection;

/* Data */
const typeParsers = {
	function: functionParser,
	object: objectParser,
	string: stringParser,
};

/* Exports */
export default (config, core) =>
	typeParsers[inferType(config)](config, core);
