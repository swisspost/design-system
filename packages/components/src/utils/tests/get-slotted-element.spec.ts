import { getSlottedElement } from '../get-slotted-element';

describe('getSlottedElement', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns the single matching element when exactly one exists', () => {
    const host = document.createElement('div');
    host.innerHTML = `
      <span></span>
      <button class="primary"></button>
    `;

    const result = getSlottedElement<HTMLButtonElement>(host, '.primary');

    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(HTMLButtonElement);
    expect(result.classList.contains('primary')).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('returns null and logs an error when no matching element exists', () => {
    const host = document.createElement('my-component');
    host.innerHTML = `
      <span></span>
      <button></button>
    `;

    const result = getSlottedElement<HTMLButtonElement>(host, '.primary');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '<my-component> expects exactly one element matching ".primary", but found 0.',
      host,
    );
  });

  it('returns null and logs an error when multiple matching elements exist', () => {
    const host = document.createElement('my-component');
    host.innerHTML = `
      <button class="primary"></button>
      <button class="primary"></button>
    `;

    const result = getSlottedElement<HTMLButtonElement>(host, '.primary');

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '<my-component> expects exactly one element matching ".primary", but found 2.',
      host,
    );
  });
});
