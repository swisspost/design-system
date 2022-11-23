/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { camelToKebabCase } from './camel-to-kebab-case';

export function getPropAttributes(props: Record<string, unknown> | undefined): string {
  if (!props) return '';

  return Object.entries(props).reduce((attributes, [propName, propValue]) => {
    if (typeof propValue !== 'undefined') attributes += ` ${camelToKebabCase(propName)}="${propValue}"`;

    return attributes;
  }, '');
}
