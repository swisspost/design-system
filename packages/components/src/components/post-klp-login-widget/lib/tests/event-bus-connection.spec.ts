import { createEventBusConnection } from '../event-bus-connection';
import type { KlpEventBus } from '../vertx-event-bus';

function fakeEventBus(): KlpEventBus & { registerHandler: jest.Mock; close: jest.Mock } {
  return {
    onopen: null,
    onclose: null,
    registerHandler: jest.fn(),
    close: jest.fn(),
  };
}

function setup(overrides: Partial<Parameters<typeof createEventBusConnection>[0]> = {}) {
  const bus = fakeEventBus();
  const loadEventBus = jest.fn().mockResolvedValue(() => bus);
  const onMessage = jest.fn();
  const onReconnect = jest.fn();
  const log = jest.fn();
  const connection = createEventBusConnection({
    url: 'https://n.accountint1.post.ch/eventbus',
    log,
    getAddress: () => 'address-1',
    shouldRetryOnFail: () => false,
    onMessage,
    onReconnect,
    loadEventBus,
    ...overrides,
  });

  return { connection, bus, loadEventBus, onMessage, onReconnect, log };
}

describe('event-bus-connection', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not load the transport until a session asks for it', () => {
    const { loadEventBus } = setup();

    expect(loadEventBus).not.toHaveBeenCalled();
  });

  it('listens on the address the subscription handed out', async () => {
    const { connection, bus, onMessage } = setup();

    await connection.openCommunication();
    bus.onopen();

    expect(bus.registerHandler).toHaveBeenCalledWith('address-1', expect.any(Function));

    const [, handler] = bus.registerHandler.mock.calls[0];
    handler({ typ: 'bye' });
    expect(onMessage).toHaveBeenCalledWith({ typ: 'bye' });
  });

  it('opens one socket however many subscriptions arrive', async () => {
    const { connection, loadEventBus } = setup();

    await Promise.all([connection.openCommunication(), connection.openCommunication()]);
    await connection.openCommunication();

    expect(loadEventBus).toHaveBeenCalledTimes(1);
  });

  it('stays anonymous rather than failing when the transport cannot be loaded', async () => {
    const loadEventBus = jest.fn().mockRejectedValue(new Error('chunk 404'));
    const { connection, log } = setup({ loadEventBus });

    await expect(connection.openCommunication()).resolves.toBeUndefined();
    expect(log).toHaveBeenCalledWith('EventBus could not be loaded: Error: chunk 404');
  });

  it('retries the whole subscription when the socket drops on a live session', async () => {
    const { connection, bus, onReconnect } = setup({ shouldRetryOnFail: () => true });
    await connection.openCommunication();
    bus.onopen();

    bus.onclose();

    expect(onReconnect).toHaveBeenCalledTimes(1);
  });

  it('lets the socket go quietly when the session itself ended', async () => {
    const { connection, bus, onReconnect } = setup({ shouldRetryOnFail: () => false });
    await connection.openCommunication();
    bus.onopen();

    bus.onclose();

    expect(onReconnect).not.toHaveBeenCalled();
  });

  it('can open again after the socket dropped', async () => {
    const { connection, bus, loadEventBus } = setup();
    await connection.openCommunication();
    bus.onopen();
    bus.onclose();

    await connection.openCommunication();

    expect(loadEventBus).toHaveBeenCalledTimes(2);
  });

  it('closes the socket when asked', async () => {
    const { connection, bus } = setup();
    await connection.openCommunication();

    connection.closeCommunication();

    expect(bus.close).toHaveBeenCalled();
  });

  it('survives being closed before anything was opened', () => {
    const { connection } = setup();

    expect(() => connection.closeCommunication()).not.toThrow();
  });

  it('closes the socket when the page goes away, and stops listening once it has', async () => {
    const addEventListener = jest.spyOn(globalThis, 'addEventListener');
    const removeEventListener = jest.spyOn(globalThis, 'removeEventListener');
    const { connection, bus } = setup();
    await connection.openCommunication();

    bus.onopen();
    expect(addEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));

    bus.onclose();
    expect(removeEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));
  });
});
