// Mock CSS variables data used for breakpoints
const breakpointStyles = {
  widths: [0, 600, 780, 1024, 1280],
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  devices: ['mobile', 'tablet', 'tablet', 'desktop', 'desktop'],
};

class ResizeObserverMock {
  observe() {
    /* do nothing */
  }
  unobserve() {
    /* do nothing */
  }
  disconnect() {
    /* do nothing */
  }
}

globalThis.ResizeObserver = ResizeObserverMock;

// Mock getComputedStyle to return the above breakpoint data
globalThis.getComputedStyle = jest.fn().mockReturnValue({
  getPropertyValue: (property: string) => {
    const key = property.replace('--post-grid-breakpoint-', '');
    return breakpointStyles[key].map(String).join(', ');
  },
});

// jsdom has no real layout, so clientWidth is always 0 and read-only.
// Redefine it per test to simulate a given viewport width.
Object.defineProperty(document.documentElement, 'clientWidth', {
  configurable: true,
  value: 0,
});

function setClientWidth(width: number): void {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    configurable: true,
    value: width,
  });
}

// Import breakpoint utility after mocks so it uses the mocked data
import { breakpoint } from '@/utils';

describe('breakpoints', () => {
  breakpointStyles.widths.forEach((width, i) => {
    it('returns correct breakpoint key', () => {
      setClientWidth(width);
      expect(breakpoint.get('key')).toBe(breakpointStyles.keys[i]);
    });

    it('returns correct breakpoint device', () => {
      setClientWidth(width);
      expect(breakpoint.get('device')).toBe(breakpointStyles.devices[i]);
    });

    it('returns correct breakpoint min width', () => {
      setClientWidth(width);
      expect(breakpoint.get('minWidth')).toBe(breakpointStyles.widths[i]);
    });
  });
});
