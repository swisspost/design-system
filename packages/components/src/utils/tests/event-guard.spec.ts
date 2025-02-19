import { eventGuard } from '../event-guard';

describe('eventGuard', () => {
  let callback: jest.Mock;
  let mockHost: HTMLElement;

  beforeEach(() => {
    callback = jest.fn();
    mockHost = document.createElement('div');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('calls callback when event target matches targetLocalName', () => {
    const mockEvent = {
      target: { localName: 'button' } as HTMLElement,
    } as unknown as CustomEvent<unknown>;

    eventGuard.bind({ host: mockHost })(mockEvent, { targetLocalName: 'button' }, callback);

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

    eventGuard.bind({ host: container })(mockEvent, { targetLocalName: 'button', delegatorSelector: '.container' }, callback);

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

    eventGuard.bind({ host: outerDiv })(mockEvent, { targetLocalName: 'button', delegatorSelector: '.non-existent-container' }, callback);

    expect(callback).not.toHaveBeenCalled();
  });

  test('calls callback when the delegatorSelector is undefined', () => {
    const mockEvent = {
      target: { localName: 'button' } as HTMLElement,
    } as unknown as CustomEvent<unknown>;

    eventGuard.bind({ host: mockHost })(mockEvent, { targetLocalName: 'button' }, callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not throw error if event target is null', () => {
    const mockEvent = {
      target: null,
    } as unknown as CustomEvent<unknown>;

    expect(() => eventGuard.bind({ host: mockHost })(mockEvent, {}, callback)).not.toThrow();
    expect(callback).not.toHaveBeenCalled();
  });

  test('does not call callback when targetLocalName is provided but does not match', () => {
    const mockEvent = {
      target: { localName: 'div' } as HTMLElement,
    } as unknown as CustomEvent<unknown>;

    eventGuard.bind({ host: mockHost })(mockEvent, { targetLocalName: 'button' }, callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
