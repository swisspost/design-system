import { getText } from './get-text';
import { AccessibleTextConfig, LinkConfig } from '@/models/shared.model';

describe('getText', () => {
  it('should return the string when input is a string', () => {
    expect(getText('hello')).toBe('hello');
  });

  it('should return text property from AccessibleTextConfig', () => {
    const config: AccessibleTextConfig = { text: 'accessible text', label: 'aria label' };
    expect(getText(config)).toBe('accessible text');
  });

  it('should return text property from LinkConfig', () => {
    const config: LinkConfig = { text: 'link text', url: '/path' };
    expect(getText(config)).toBe('link text');
  });
});
