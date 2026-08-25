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

// jsdom has no real matchMedia, and the shared mock(helpers/mock-match-media.ts) 
// always returns the same matches value for every query. We need a different value per
// breakpoint width, so it's mocked locally here instead of using that.
let currentWidth = 0;

function mockMatchMedia(): void {
  globalThis.matchMedia = jest.fn().mockImplementation((query: string) => {
    const [, minWidthStr] = query.match(/min-width:\s*(\d+)px/) ?? [];
    const minWidth = Number(minWidthStr ?? 0);
    return {
      matches: currentWidth >= minWidth,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });
}

function setWidth(width: number): void {
  currentWidth = width;
}

// jsdom has no real layout, so clientWidth is always 0 and read-only.
// Redefine it per test to simulate a given viewport width, used to test
// the fallback path, for environments without matchMedia support.
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
  describe('via matchMedia (the path real browsers take)', () => {
    beforeAll(() => {
      mockMatchMedia();
    });

    breakpointStyles.widths.forEach((width, i) => {
      it('returns correct breakpoint key', () => {
        setWidth(width);
        expect(breakpoint.get('key')).toBe(breakpointStyles.keys[i]);
      });

      it('returns correct breakpoint device', () => {
        setWidth(width);
        expect(breakpoint.get('device')).toBe(breakpointStyles.devices[i]);
      });

      it('returns correct breakpoint min width', () => {
        setWidth(width);
        expect(breakpoint.get('minWidth')).toBe(breakpointStyles.widths[i]);
      });
    });
  });

  describe('via clientWidth (fallback when matchMedia is unavailable)', () => {
    beforeAll(() => {
      // Simulate an environment without matchMedia support (e.g. SSR).
      // @ts-expect-error - intentionally removing matchMedia for this block
      delete globalThis.matchMedia;
    });

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
});
