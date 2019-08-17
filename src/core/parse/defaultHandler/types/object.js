/**
 * Default Handler for config type, object.
 */

import { collection } from '@laufire/utils';
import defaultHandler from "../index";

/* Helpers */
const { entries } = collection;

export default (config, core) => entries(config)
  .map(
    ([configName, childConfig]) =>
      (core.handlers[
        childConfig.handler || configName
      ] || defaultHandler)(childConfig, core)
  ).pop();