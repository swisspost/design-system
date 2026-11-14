import { createVertxEventBus } from '../vertx-event-bus';

const socket = {
  onopen: null as (() => void) | null,
  onclose: null as (() => void) | null,
  onmessage: null as ((event: { data: string }) => void) | null,
  send: jest.fn(),
  close: jest.fn(),
};

const createBus = () => createVertxEventBus('https://n.accountint1.post.ch/eventbus', () => socket);

function frames() {
  return socket.send.mock.calls.map(([frame]) => JSON.parse(frame as string));
}

describe('vertx-event-bus', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    socket.send.mockClear();
    socket.close.mockClear();
    socket.onopen = socket.onclose = socket.onmessage = null;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('pings as soon as it is open, so the bridge does not drop it', () => {
    createBus();

    socket.onopen();

    expect(frames()).toEqual([{ type: 'ping' }]);
  });

  it('keeps pinging every five seconds', () => {
    createBus();
    socket.onopen();

    jest.advanceTimersByTime(15_000);

    expect(frames()).toHaveLength(4);
  });

  it('stops pinging once the socket is gone', () => {
    createBus();
    socket.onopen();

    socket.onclose();
    socket.send.mockClear();
    jest.advanceTimersByTime(15_000);

    expect(socket.send).not.toHaveBeenCalled();
  });

  it('registers on the bus for the address it is given', () => {
    const bus = createBus();
    socket.onopen();
    socket.send.mockClear();

    bus.registerHandler('address-1', jest.fn());

    expect(frames()).toEqual([{ type: 'register', address: 'address-1' }]);
  });

  it('registers an address only once, however many handlers want it', () => {
    const bus = createBus();
    socket.onopen();
    socket.send.mockClear();

    bus.registerHandler('address-1', jest.fn());
    bus.registerHandler('address-1', jest.fn());

    expect(frames()).toHaveLength(1);
  });

  it('hands the message body to every handler on the address', () => {
    const bus = createBus();
    const first = jest.fn();
    const second = jest.fn();
    socket.onopen();
    bus.registerHandler('address-1', first);
    bus.registerHandler('address-1', second);

    socket.onmessage({
      data: JSON.stringify({ address: 'address-1', body: { typ: 'hi' } }),
    });

    expect(first).toHaveBeenCalledWith({ typ: 'hi' });
    expect(second).toHaveBeenCalledWith({ typ: 'hi' });
  });

  it('ignores a message for an address nobody registered for', () => {
    const bus = createBus();
    const handler = jest.fn();
    socket.onopen();
    bus.registerHandler('address-1', handler);

    socket.onmessage({ data: JSON.stringify({ address: 'other', body: {} }) });

    expect(handler).not.toHaveBeenCalled();
  });

  it('ignores a message it cannot parse', () => {
    createBus();
    socket.onopen();

    expect(() => socket.onmessage({ data: 'not json' })).not.toThrow();
  });

  it('tells the widget when the bus opens and when it closes', () => {
    const bus = createBus();
    bus.onopen = jest.fn();
    bus.onclose = jest.fn();

    socket.onopen();
    socket.onclose();

    expect(bus.onopen).toHaveBeenCalledTimes(1);
    expect(bus.onclose).toHaveBeenCalledTimes(1);
  });

  it('closes the socket underneath it', () => {
    const bus = createBus();

    bus.close();

    expect(socket.close).toHaveBeenCalled();
  });
});
