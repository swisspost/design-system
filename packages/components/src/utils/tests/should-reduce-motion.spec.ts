import { shouldReduceMotion } from '../should-reduce-motion';

describe('shouldReduceMotion', () => {
  let matchMedia;

  beforeEach(() => {
    matchMedia = window.matchMedia = jest.fn();
  });

  it('should return true if reduced motion is requested', () => {
    matchMedia.mockReturnValue({ matches: true });
    expect(shouldReduceMotion()).toBe(true);
  });

  it('should return false if reduced motion is not requested', () => {
    matchMedia.mockReturnValue({ matches: false });
    expect(shouldReduceMotion()).toBe(false);
  });
});
