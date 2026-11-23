import { isMotionReduced } from '@/utils';
import { useBrowser } from '@/utils/tests/helpers/stencil-build';

describe('isMotionReduced', () => {
  beforeEach(() => {
    useBrowser();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('queries prefers-reduced-motion and returns its result', () => {
    const matchSpy = jest.spyOn(globalThis, 'matchMedia');

    for (const matches of [true, false]) {
      matchSpy.mockReturnValue({ matches } as MediaQueryList);

      expect(isMotionReduced()).toBe(matches);
      expect(matchSpy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    }
  });

  it('defaults to true when `matchMedia` is unavailable', () => {
    globalThis.matchMedia = undefined;

    expect(isMotionReduced()).toBe(true);
  });
});
