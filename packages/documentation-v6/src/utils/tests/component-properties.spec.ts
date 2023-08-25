/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { definedProperties } from '../component-properties';

describe('definedProperties', () => {
  it('should return an object consisting of all properties that have defined values', () => {
    const mockProperties = {
      property_a: 'Property A',
      property_b: undefined,
      property_c: 'Property C',
    };

    const { property_b, ...expectedProperties } = mockProperties;

    expect(definedProperties(mockProperties)).toEqual(expectedProperties);
  };

  it('should not filter properties that have falsy but not undefined values', () => {
    const falsyProperties = {
      property_a: false,
      property_b: null,
      property_c: NaN,
      property_d: 0,
      property_e: '',
    };

    expect(definedProperties(falsyProperties)).toEqual(falsyProperties);
  };
});
