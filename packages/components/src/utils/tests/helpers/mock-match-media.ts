// Mock the browser's matchMedia API on the global object
export const mockConfig = { matchMedia: false as boolean | undefined };

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: jest.fn(() => ({
    writable: true,
    matches: mockConfig.matchMedia ?? false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
