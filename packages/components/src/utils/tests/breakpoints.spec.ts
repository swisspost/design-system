const breakpointStyles = {
  widths: [0, 600, 780, 1024, 1280],
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  devices: ['mobile', 'tablet', 'tablet', 'desktop', 'desktop'],
};

global.getComputedStyle = jest.fn().mockReturnValue({
  getPropertyValue: (property: string) => {
    const key = property.replace('--post-grid-breakpoint-', '');
    return breakpointStyles[key].map(String).join(', ');
  },
});

import { breakpoint } from '@/utils';

describe('breakpoints', () => {
  breakpointStyles.widths.forEach((width, i) => {
    it('should return the correct breakpoint key', () => {
      global['innerWidth'] = width;
      const expectedKey = breakpointStyles.keys[i];
      expect(breakpoint.get('key')).toBe(expectedKey);
    });

    it('should return the correct breakpoint device', () => {
      global['innerWidth'] = width;
      const expectedKey = breakpointStyles.devices[i];
      expect(breakpoint.get('device')).toBe(expectedKey);
    });
  });
});
