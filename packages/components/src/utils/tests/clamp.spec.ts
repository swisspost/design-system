import { clamp } from '../clamp';

describe('clamp', () => {
  it('should return the provided value if within the bounds', () => {
    expect(clamp(10, 0, 100)).toEqual(10);
  });

  it('should return the min if provided value is lower', () => {
    expect(clamp(0, 10, 100)).toEqual(10);
  });

  it('should return the max if provided value is greater', () => {
    expect(clamp(100, 0, 10)).toEqual(10);
  });
});
