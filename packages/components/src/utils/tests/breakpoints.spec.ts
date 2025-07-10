// Mock throttle to call the function immediately without delay
jest.mock('throttle-debounce', () => ({
  throttle: jest.fn().mockImplementation((_, fn) => fn)
}));

// Mock CSS variables data used for breakpoints
const breakpointStyles = {
  widths: [0, 600, 780, 1024, 1280],
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  devices: ['mobile', 'tablet', 'tablet', 'desktop', 'desktop'],
};

// Mock getComputedStyle to return the above breakpoint data
global.getComputedStyle = jest.fn().mockReturnValue({
  getPropertyValue: (property: string) => {
    const key = property.replace('--post-grid-breakpoint-', '');
    return breakpointStyles[key].map(String).join(', ');
  },
});

// Import breakpoint utility after mocks so it uses the mocked data
import { breakpoint } from '@/utils';

describe('breakpoints', () => {
  breakpointStyles.widths.forEach((width, i) => {
    it('returns correct breakpoint key', () => {
      global['innerWidth'] = width;
      expect(breakpoint.get('key')).toBe(breakpointStyles.keys[i]);
    });

    it('returns correct breakpoint device', () => {
      global['innerWidth'] = width;
      expect(breakpoint.get('device')).toBe(breakpointStyles.devices[i]);
    });

    it('returns correct breakpoint min width', () => {
      global['innerWidth'] = width;
      expect(breakpoint.get('minWidth')).toBe(breakpointStyles.widths[i]);
    });
  });
});
