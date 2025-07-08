import { EventFrom } from '../event-from';

describe('EventFrom decorator', () => {
  let callback: jest.Mock;
  let mockHost: HTMLElement;

  // Helper function to create proper CustomEvent instances
  function createCustomEvent(target: HTMLElement | null): CustomEvent {
    const event = new CustomEvent('test');
    Object.defineProperty(event, 'target', {
      value: target,
      writable: false,
      configurable: true
    });
    return event;
  }

  beforeEach(() => {
    callback = jest.fn();
    mockHost = document.createElement('div');
    mockHost.setAttribute('data-testid', 'host');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('calls callback when event target exactly matches tag', () => {
    const button = document.createElement('button');
    mockHost.appendChild(button);
    document.body.appendChild(mockHost);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(button); // Target is exactly the button
    instance.handleButtonEvent(mockEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does NOT call callback when event target is inside matching tag', () => {
    const button = document.createElement('button');
    const span = document.createElement('span');
    button.appendChild(span);
    mockHost.appendChild(button);
    document.body.appendChild(mockHost);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    const mockEvent = createCustomEvent(span); // Target is span inside button
    instance.handleButtonEvent(mockEvent);
    expect(callback).not.toHaveBeenCalled();
  });

  test('calls callback when ignoreNestedComponents is false and event comes from direct child', () => {
    const host = document.createElement('div');
    const button = document.createElement('button');
    host.appendChild(button);
    document.body.appendChild(host);

    const mockEvent = createCustomEvent(button);

    class TestClass {
      host = host;

      @EventFrom('button', { ignoreNestedComponents: false })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleButtonEvent(mockEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not call callback when tag does not match', () => {
    const div = document.createElement('div');
    mockHost.appendChild(div);
    document.body.appendChild(mockHost);

    const mockEvent = createCustomEvent(div);

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleButtonEvent(mockEvent);
    expect(callback).not.toHaveBeenCalled();
  });

  test('does not throw error if event is not a CustomEvent', () => {
    const notAnEvent = { some: 'object' };
    
    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    expect(() => instance.handleButtonEvent(notAnEvent as unknown as CustomEvent)).not.toThrow();
    expect(callback).not.toHaveBeenCalled();
  });
});
