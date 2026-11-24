/**
 * Creates a placeholder property on the global object if it does not already exist.
 *
 * This is useful for testing environments where certain global properties may not be defined, since
 * `jest.replaceProperty` can only replace existing properties.
 *
 * @param name - The name of the property to create.
 */
export function createPlaceholderProperty(name: string) {
  if (!Object.prototype.hasOwnProperty.call(globalThis, name)) {
    Object.defineProperty(globalThis, name, {
      value: undefined,
      configurable: true,
      writable: true,
    });
  }
}
