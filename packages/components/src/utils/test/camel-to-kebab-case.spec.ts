/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { camelToKebabCase } from '../camel-to-kebab-case';

describe('camelToKebabCase', () => {
  it('should return a kebab case string', () => {
    expect(camelToKebabCase('myAwesomeString')).toBe('my-awesome-string');
  });
});
