import { componentOnReady } from '../component-on-ready';
import { HTMLStencilElement } from '@stencil/core/internal';

describe('componentOnReady', () => {
  const mockRequestAnimationFrame = jest.fn();
  const mockSetTimeout = jest.fn();

  beforeAll(() => {
    globalThis.requestAnimationFrame = mockRequestAnimationFrame;
    globalThis.setTimeout = mockSetTimeout as unknown as typeof setTimeout;
  });

  afterEach(() => {
    mockRequestAnimationFrame.mockClear();
    mockSetTimeout.mockClear();
  });

  it('should return the result of componentOnReady if it exists', async () => {
    const el = {
      componentOnReady: jest.fn().mockResolvedValue('resolvedValue'),
    } as unknown as HTMLStencilElement;

    const result = await componentOnReady(el);
    expect(el.componentOnReady).toHaveBeenCalledTimes(1);
    expect(result).toBe('resolvedValue');
  });

  it('should use customOnReady if componentOnReady does not exist and requestAnimationFrame is available', async () => {
    mockRequestAnimationFrame.mockImplementation(callback => callback());

    const el = {} as HTMLStencilElement;
    const promise = componentOnReady(el);

    const result = await promise;
    expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(result).toBe(el);
  });

  it('should use customOnReady if componentOnReady does not exist and requestAnimationFrame is not available', async () => {
    delete globalThis.requestAnimationFrame;

    mockSetTimeout.mockImplementation(callback => callback());

    const el = {} as HTMLStencilElement;
    const promise = componentOnReady(el);

    const result = await promise;
    expect(mockSetTimeout).toHaveBeenCalledTimes(1);
    expect(result).toBe(el);
  });
});
