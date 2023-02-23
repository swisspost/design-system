/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

export type PropertyType =
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'object'
  | 'function';

export function checkType(value: unknown, type: PropertyType, errorMessage: string) {
  const typeIsArray = type === 'array';
  const valueIsArray = Array.isArray(value);

  if (typeIsArray || valueIsArray) {
    if (valueIsArray !== typeIsArray) throw new Error(errorMessage);
  } else {
    if (typeof value !== type) throw new Error(errorMessage);
  }
}
