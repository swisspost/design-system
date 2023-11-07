import { isMotionReduced } from '../is-motion-reduced';

describe('isMotionReduced', () => {
  let matchMedia;

  beforeEach(() => {
    matchMedia = window.matchMedia = jest.fn();
  });

  it('should return true if reduced motion is requested', () => {
    matchMedia.mockReturnValue({ matches: true });
    expect(isMotionReduced()).toBe(true);
  });

  it('should return false if reduced motion is not requested', () => {
    matchMedia.mockReturnValue({ matches: false });
    expect(isMotionReduced()).toBe(false);
  });
});
