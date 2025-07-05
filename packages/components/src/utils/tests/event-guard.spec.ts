import { EventFrom } from '../event-from';

describe('EventFrom decorator', () => {
  let callback: jest.Mock;
  let mockHost: HTMLElement;
  let decoratedMethod: (event: CustomEvent) => void;

  beforeEach(() => {
    callback = jest.fn();
    mockHost = document.createElement('div');
    mockHost.setAttribute('data-testid', 'host');

    class TestClass {
      host = mockHost;

      @EventFrom('button')
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }

      @EventFrom('button', { ignoreNestedComponents: false })
      handleButtonEventAllowNested(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    decoratedMethod = instance.handleButtonEvent.bind(instance);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('calls callback when event target matches tag', () => {
    const button = document.createElement('button');
    mockHost.appendChild(button);
    document.body.appendChild(mockHost);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    decoratedMethod(mockEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('calls callback when ignoreNestedComponents is false', () => {
    const outerHost = document.createElement('div');
    outerHost.setAttribute('data-testid', 'outer-host');

    const innerHost = document.createElement('div');
    innerHost.setAttribute('data-testid', 'inner-host');

    const button = document.createElement('button');

    outerHost.appendChild(innerHost);
    innerHost.appendChild(button);
    document.body.appendChild(outerHost);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    class TestClass {
      host = outerHost;

      @EventFrom('button', { ignoreNestedComponents: false })
      handleButtonEventAllowNested(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleButtonEventAllowNested(mockEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not call callback when ignoreNestedComponents is true and event comes from nested component', () => {
    const outerHost = document.createElement('div');
    outerHost.setAttribute('data-testid', 'outer-host');

    const innerHost = document.createElement('div');
    innerHost.setAttribute('data-testid', 'inner-host');

    const button = document.createElement('button');

    outerHost.appendChild(innerHost);
    innerHost.appendChild(button);
    document.body.appendChild(outerHost);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    class TestClass {
      host = outerHost;

      @EventFrom('button', { ignoreNestedComponents: true })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleButtonEvent(mockEvent);

    expect(callback).not.toHaveBeenCalled();
  });

  test('calls callback when ignoreNestedComponents is true and event comes from direct child', () => {
    const host = document.createElement('div');
    const button = document.createElement('button');
    host.appendChild(button);
    document.body.appendChild(host);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    class TestClass {
      host = host;

      @EventFrom('button', { ignoreNestedComponents: true })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleButtonEvent(mockEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('calls callback when ignoreNestedComponents is undefined (defaults to true)', () => {
    const button = document.createElement('button');
    mockHost.appendChild(button);
    document.body.appendChild(mockHost);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    decoratedMethod(mockEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not throw error if event target is null', () => {
    const mockEvent = {
      target: null,
    } as unknown as CustomEvent<unknown>;

    expect(() => decoratedMethod(mockEvent)).not.toThrow();
    expect(callback).not.toHaveBeenCalled();
  });

  test('does not call callback when tag does not match', () => {
    const div = document.createElement('div');
    mockHost.appendChild(div);
    document.body.appendChild(mockHost);

    const mockEvent = {
      target: div,
    } as unknown as CustomEvent<unknown>;

    decoratedMethod(mockEvent);
    expect(callback).not.toHaveBeenCalled();
  });

  test('does not throw error if event is null', () => {
    expect(() => decoratedMethod(null as unknown as CustomEvent)).not.toThrow();
    expect(callback).not.toHaveBeenCalled();
  });
});
