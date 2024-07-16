import { getRoot } from '../get-root';

describe('getRoot', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('p');
  });

  it('should return the document to which the element is attached', () => {
    document.body.appendChild(element);

    expect(getRoot(element)).toBe(document);
  });

  it('should return the shadow tree to which the element is attached', () => {
    const shadowHost = document.createElement('div');
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(element);
    document.body.appendChild(shadowHost);

    expect(getRoot(element)).toBe(shadowRoot);
  });

  it('should throw an error when the element is not attached to the document or shadow tree', () => {
    expect(() => getRoot(element)).toThrow();
  });
});
