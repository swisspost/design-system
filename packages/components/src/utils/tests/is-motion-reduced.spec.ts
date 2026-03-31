import '../tests/helpers/mock-stencil-constants';
import { mockConfig } from '../tests/helpers/mock-match-media';

// Must be imported after mock helpers to ensure it uses the mocked environment
import { isMotionReduced } from '../is-motion-reduced';

describe('isMotionReduced', () => {
  it('should return true if reduced motion is requested', () => {
    mockConfig.matches = true;
    expect(isMotionReduced()).toBe(true);
  });

  it('should return false if reduced motion is not requested', () => {
    mockConfig.matches = false;
    expect(isMotionReduced()).toBe(false);
  });
});
