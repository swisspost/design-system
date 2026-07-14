import { findClosableTarget } from '../closable-target';

// Creates a lightweight mock that mimics an Element well enough for `findClosableTarget`
// (localName, hasAttribute, parentElement/parentNode traversal) without depending on a
// real DOM/shadow DOM implementation, mirroring the approach used in event-from.spec.ts.
function createMockElement(
  tagName: string,
  options: { attributes?: Record<string, string>; methods?: Record<string, jest.Mock> } = {},
): Element {
  const { attributes = {}, methods = {} } = options;
  const element = Object.create(HTMLElement.prototype);

  Object.defineProperties(element, {
    localName: { value: tagName.toLowerCase(), configurable: true },
    tagName: { value: tagName.toUpperCase(), configurable: true },
    nodeType: { value: 1, configurable: true },
    parentElement: { value: null, writable: true, configurable: true },
    parentNode: { value: null, writable: true, configurable: true },
  });

  element.hasAttribute = (name: string) => name in attributes;
  element.getAttribute = (name: string) => attributes[name] ?? null;

  for (const [methodName, mockFn] of Object.entries(methods)) {
    element[methodName] = mockFn;
  }

  return element;
}

// Mimics a ShadowRoot boundary using the same duck-typing signature
// (`nodeType === 11` and a `host` property) that `findClosestAcrossShadow` relies on.
function createMockShadowRoot(host: Element): Node {
  return { nodeType: 11, host } as unknown as Node;
}

function setParent(child: Element, parent: Element) {
  Object.defineProperty(child, 'parentElement', {
    value: parent,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(child, 'parentNode', { value: parent, writable: true, configurable: true });
}

function setShadowParent(child: Element, shadowRoot: Node) {
  Object.defineProperty(child, 'parentElement', {
    value: null,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(child, 'parentNode', {
    value: shadowRoot,
    writable: true,
    configurable: true,
  });
}

describe('findClosableTarget', () => {
  describe('DOM context: light DOM', () => {
    it('finds a <dialog> ancestor directly containing the close button', () => {
      const close = jest.fn();
      const dialog = createMockElement('dialog', { methods: { close } });
      const closebutton = createMockElement('post-closebutton');

      setParent(closebutton, dialog);

      const target = findClosableTarget(closebutton);

      expect(target?.element).toBe(dialog);
      target?.close(target.element);
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM context: slotted into another component', () => {
    it('finds the <post-banner> host when the close button is slotted via a named slot', () => {
      const dismiss = jest.fn();
      const banner = createMockElement('post-banner', { methods: { dismiss } });
      const closebutton = createMockElement('post-closebutton', {
        attributes: { slot: 'close-button' },
      });

      // A slotted element stays in the light DOM: its parentElement is the host it was
      // placed into (post-banner), not the slot itself.
      setParent(closebutton, banner);

      const target = findClosableTarget(closebutton);

      expect(target?.element).toBe(banner);
      target?.close(target.element);
      expect(dismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM context: rendered inside another component shadow DOM', () => {
    it('crosses the shadow boundary via the host to find <post-popover>', () => {
      const hide = jest.fn();
      const popover = createMockElement('post-popover', { methods: { hide } });
      const closebutton = createMockElement('post-closebutton');
      const shadowRoot = createMockShadowRoot(popover);

      // The close button has no light DOM parent: it is the root of the shadow tree
      // rendered by post-popover, so a regular parentElement walk stops here.
      setShadowParent(closebutton, shadowRoot);

      const target = findClosableTarget(closebutton);

      expect(target?.element).toBe(popover);
      target?.close(target.element);
      expect(hide).toHaveBeenCalledTimes(1);
    });

    it('crosses multiple shadow boundaries to find <post-popovercontainer>', () => {
      const hide = jest.fn();
      const popoverContainer = createMockElement('post-popovercontainer', { methods: { hide } });
      const innerWrapper = createMockElement('div');
      const closebutton = createMockElement('post-closebutton');

      setParent(innerWrapper, popoverContainer);
      setShadowParent(closebutton, createMockShadowRoot(innerWrapper));

      const target = findClosableTarget(closebutton);

      expect(target?.element).toBe(popoverContainer);
      target?.close(target.element);
      expect(hide).toHaveBeenCalledTimes(1);
    });
  });

  describe('supported closable targets', () => {
    it('calls toggle(false) on the closest <post-collapsible>', () => {
      const toggle = jest.fn();
      const collapsible = createMockElement('post-collapsible', { methods: { toggle } });
      const closebutton = createMockElement('post-closebutton');
      setParent(closebutton, collapsible);

      const target = findClosableTarget(closebutton);
      target?.close(target.element);

      expect(target?.element).toBe(collapsible);
      expect(toggle).toHaveBeenCalledWith(false);
    });

    it('calls toggle(false) on the closest <post-accordion-item>', () => {
      const toggle = jest.fn();
      const accordionItem = createMockElement('post-accordion-item', { methods: { toggle } });
      const closebutton = createMockElement('post-closebutton');
      setParent(closebutton, accordionItem);

      const target = findClosableTarget(closebutton);
      target?.close(target.element);

      expect(target?.element).toBe(accordionItem);
      expect(toggle).toHaveBeenCalledWith(false);
    });

    it('calls togglePopover(false) on a native [popover] element', () => {
      const togglePopover = jest.fn();
      const popoverEl = createMockElement('div', {
        attributes: { popover: '' },
        methods: { togglePopover },
      });
      const closebutton = createMockElement('post-closebutton');
      setParent(closebutton, popoverEl);

      const target = findClosableTarget(closebutton);
      target?.close(target.element);

      expect(target?.element).toBe(popoverEl);
      expect(togglePopover).toHaveBeenCalledWith(false);
    });

    it('prefers the post-popovercontainer tag match over the generic [popover] attribute match', () => {
      const hide = jest.fn();
      const togglePopover = jest.fn();
      const popoverContainer = createMockElement('post-popovercontainer', {
        attributes: { popover: '' },
        methods: { hide, togglePopover },
      });
      const closebutton = createMockElement('post-closebutton');
      setParent(closebutton, popoverContainer);

      const target = findClosableTarget(closebutton);
      target?.close(target.element);

      expect(hide).toHaveBeenCalledTimes(1);
      expect(togglePopover).not.toHaveBeenCalled();
    });
  });

  describe('no closable ancestor', () => {
    it('returns null when no supported ancestor exists', () => {
      const div = createMockElement('div');
      const closebutton = createMockElement('post-closebutton');
      setParent(closebutton, div);

      expect(findClosableTarget(closebutton)).toBeNull();
    });
  });
});
