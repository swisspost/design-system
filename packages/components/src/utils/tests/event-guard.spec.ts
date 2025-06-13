import { EventGuard } from '../event-guard';

describe('EventGuard decorator', () => {
  let callback: jest.Mock;
  let mockHost: HTMLElement;
  let decoratedMethod: (event: CustomEvent) => void;

  beforeEach(() => {
    callback = jest.fn();
    mockHost = document.createElement('div');
    
    // Create a test class with a decorated method
    class TestClass {
      host = mockHost;

      @EventGuard({ targetLocalName: 'button' })
      handleButtonEvent(event: CustomEvent) {
        callback(event);
      }

      @EventGuard({ targetLocalName: 'button', delegatorSelector: '.container' })
      handleDelegatedButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    decoratedMethod = instance.handleButtonEvent.bind(instance);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('calls callback when event target matches targetLocalName', () => {
    const mockEvent = {
      target: { localName: 'button' } as HTMLElement,
    } as unknown as CustomEvent<unknown>;

    decoratedMethod(mockEvent);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('calls callback when the delegatorSelector is provided and matches', () => {
    const container = document.createElement('div');
    container.classList.add('container');
    const button = document.createElement('button');
    container.appendChild(button);

    const mockEvent = {
      target: button,
    } as unknown as CustomEvent<unknown>;

    document.body.appendChild(container);

    // Need to create a new instance for this specific test
    class TestClass {
      host = container;

      @EventGuard({ targetLocalName: 'button', delegatorSelector: '.container' })
      handleDelegatedButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleDelegatedButtonEvent(mockEvent);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not call callback when delegatorSelector does not match', () => {
    const outerDiv = document.createElement('div');
    const innerButton = document.createElement('button');
    outerDiv.appendChild(innerButton);

    const mockEvent = {
      target: innerButton,
    } as unknown as CustomEvent<unknown>;

    document.body.appendChild(outerDiv);

    class TestClass {
      host = outerDiv;

      @EventGuard({ targetLocalName: 'button', delegatorSelector: '.non-existent-container' })
      handleDelegatedButtonEvent(event: CustomEvent) {
        callback(event);
      }
    }

    const instance = new TestClass();
    instance.handleDelegatedButtonEvent(mockEvent);
    
    expect(callback).not.toHaveBeenCalled();
  });

  test('calls callback when the delegatorSelector is undefined', () => {
    const mockEvent = {
      target: { localName: 'button' } as HTMLElement,
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

  test('does not call callback when targetLocalName is provided but does not match', () => {
    const mockEvent = {
      target: { localName: 'div' } as HTMLElement,
    } as unknown as CustomEvent<unknown>;

    decoratedMethod(mockEvent);
    expect(callback).not.toHaveBeenCalled();
  });
});
