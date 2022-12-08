/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

import { getPropAttributes } from '../get-prop-attributes';

describe('getPropAttributes', () => {
  it('should return an empty string', () => {
    [undefined, {}, { undefinedProp: undefined }].forEach(noAttributeProps => {
      expect(getPropAttributes(noAttributeProps)).toBe('');
    });
  });

  it('should return an attribute string', () => {
    const props = {
      propA: 0,
      propB: false,
      propC: undefined,
      propD: 'someValue',
    };

    expect(getPropAttributes(props)).toBe(' prop-a="0" prop-b="false" prop-d="someValue"');
  });
});
