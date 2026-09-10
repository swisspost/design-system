// Mock the browser's matchMedia API on the global object

export type mockConfigMediaType = {
  matches: boolean;
};

export const mockConfig: mockConfigMediaType = { matches: false };

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: jest.fn(() => ({
    writable: true,
    matches: mockConfig.matches,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
