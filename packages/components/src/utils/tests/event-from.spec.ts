import { EventFrom } from '../event-from';

describe('EventFrom decorator', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  // Create a proper mock HTMLElement that passes instanceof checks
  function createMockHTMLElement(tagName: string): HTMLElement {
    const element = Object.create(HTMLElement.prototype);
    
    Object.defineProperties(element, {
      localName: {
        value: tagName.toLowerCase(),
        writable: false,
        configurable: true,
        enumerable: true
      },
      tagName: {
        value: tagName.toUpperCase(),
        writable: false,
        configurable: true,
        enumerable: true
      },
      nodeType: {
        value: 1,
        writable: false,
        configurable: true
      },
      parentElement: {
        value: null,
        writable: true,
        configurable: true
      },
      parentNode: {
        value: null,
        writable: true,
        configurable: true
      },
      ownerDocument: {
        value: document || {},
        writable: false,
        configurable: true
      }
    });

    return element;
  }

  function createCustomEvent(target: HTMLElement | null): CustomEvent {
    const event = new CustomEvent('test');
    Object.defineProperty(event, 'target', {
      value: target,
      writable: false,
      configurable: true
    });
    return event;
  }

  // Helper to set up parent-child relationships
  function setParent(child: HTMLElement, parent: HTMLElement) {
    Object.defineProperty(child, 'parentElement', {
      value: parent,
      writable: true,
      configurable: true
    });
    Object.defineProperty(child, 'parentNode', {
      value: parent,
      writable: true,
      configurable: true
    });
  }

  test('calls callback when event target exactly matches tag', () => {
    const mockHost = createMockHTMLElement('div');
    const button = createMockHTMLElement('button');
    
    setParent(button, mockHost);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(button);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does NOT call callback when event target is inside matching tag', () => {
    const mockHost = createMockHTMLElement('div');
    const button = createMockHTMLElement('button');
    const span = createMockHTMLElement('span');
    
    setParent(button, mockHost);
    setParent(span, button);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(span);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).not.toHaveBeenCalled();
  });

  test('calls callback when ignoreNestedComponents is false', () => {
    const host = createMockHTMLElement('div');
    const button = createMockHTMLElement('button');
    
    setParent(button, host);

    class TestClass {
      host = host;

      @EventFrom('button', { ignoreNestedComponents: false })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(button);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not call callback when tag does not match', () => {
    const mockHost = createMockHTMLElement('div');
    const div = createMockHTMLElement('div');
    
    setParent(div, mockHost);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(div);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).not.toHaveBeenCalled();
  });

  test('ignores events from nested components when ignoreNestedComponents is true (default)', () => {
    const outerHost = createMockHTMLElement('div');
    const innerHost = createMockHTMLElement('div');
    const button = createMockHTMLElement('button');
    
    setParent(innerHost, outerHost);
    setParent(button, innerHost);

    class TestClass {
      host = outerHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(button);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).not.toHaveBeenCalled();
  });

  test('processes events from nested components when ignoreNestedComponents is false', () => {
    const outerHost = createMockHTMLElement('div');
    const innerHost = createMockHTMLElement('div');
    const button = createMockHTMLElement('button');
    
    setParent(innerHost, outerHost);
    setParent(button, innerHost);

    class TestClass {
      host = outerHost;

      @EventFrom('button', { ignoreNestedComponents: false })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(button);
    instance.handleButtonEvent(mockEvent);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
