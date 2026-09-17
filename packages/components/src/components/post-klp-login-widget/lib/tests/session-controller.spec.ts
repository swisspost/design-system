import type { KlpMessage, KlpSessionData } from '../klp-session.model';
import { createSessionController } from '../session-controller';

const sessionData: KlpSessionData = {
  name: 'Ada',
  surname: 'Lovelace',
  userType: 'B2B',
  authLevel: 'PASSWORD',
};

function mockSubscribe(message: KlpMessage) {
  const fetchMock = jest.fn().mockResolvedValue({ json: async () => message });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
}

/** Every controller installs a keep-alive interval on login; an untracked one outlives the test. */
const running: { stop: () => void }[] = [];

function track<T extends { stop: () => void }>(controller: T): T {
  running.push(controller);
  return controller;
}

function controllerFor(message: KlpMessage) {
  const fetchMock = mockSubscribe(message);
  const onSessionChange = jest.fn();
  const controller = track(
    createSessionController({
      endPoint: 'https://n.accountint1.post.ch',
      onSessionChange,
    }),
  );

  return { controller, onSessionChange, fetchMock };
}

describe('session-controller', () => {
  afterEach(() => {
    while (running.length > 0) running.pop().stop();
    jest.restoreAllMocks();
  });

  it('reports the session carried by a sub message', async () => {
    const { controller, onSessionChange } = controllerFor({
      typ: 'sub',
      adr: 'address-1',
      ttl: 60_000,
      data: sessionData,
    });

    await controller.start();

    expect(onSessionChange).toHaveBeenCalledWith(sessionData);
    expect(controller.getSession()).toEqual(sessionData);
  });

  it('adopts the address the platform assigned', async () => {
    const { controller } = controllerFor({
      typ: 'sub',
      adr: 'address-1',
      ttl: 60_000,
      data: sessionData,
    });

    await controller.start();

    expect(controller.getAddress()).toBe('address-1');
  });

  it('subscribes against the endpoint built for the given platform', async () => {
    const { controller, fetchMock } = controllerFor({ typ: 'bye' });

    await controller.start();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://n.accountint1.post.ch/v1/session/subscribe',
      expect.objectContaining({ credentials: 'include' }),
    );
  });

  it('stays anonymous when the platform does not know us', async () => {
    const { controller, onSessionChange } = controllerFor({ typ: 'ukn' });

    await controller.start();

    expect(onSessionChange).toHaveBeenCalledWith(null);
    expect(controller.getSession()).toBeNull();
  });

  it('drops the session again on bye', async () => {
    const { controller, onSessionChange } = controllerFor({
      typ: 'sub',
      adr: 'address-1',
      ttl: 60_000,
      data: sessionData,
    });
    await controller.start();
    onSessionChange.mockClear();

    mockSubscribe({ typ: 'bye' });
    await controller.start();

    expect(onSessionChange).toHaveBeenCalledWith(null);
    expect(controller.getSession()).toBeNull();
  });

  it('survives a failing subscribe without rejecting', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch;
    const onSessionChange = jest.fn();
    const controller = track(
      createSessionController({
        endPoint: 'https://n.accountint1.post.ch',
        onSessionChange,
      }),
    );

    await expect(controller.start()).resolves.toBeUndefined();
    expect(controller.getSession()).toBeNull();
  });

  describe('keep-alive', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('refreshes the portal and the platform once logged in', async () => {
      jest.useFakeTimers();
      const fetchMock = mockSubscribe({
        typ: 'sub',
        adr: 'address-1',
        ttl: 60_000,
        data: sessionData,
      });
      const controller = track(
        createSessionController({
          endPoint: 'https://n.accountint1.post.ch',
          keepAliveUrl: 'https://int.post.ch/keepalive',
          conf: { keepAliveInterval: 1 },
          onSessionChange: jest.fn(),
        }),
      );

      await controller.start();
      fetchMock.mockClear();
      jest.advanceTimersByTime(60 * 1000);

      const pinged = fetchMock.mock.calls.map(([url]) => url as string);
      expect(pinged).toHaveLength(2);
      expect(pinged[0]).toContain('https://int.post.ch/keepalive');
      expect(pinged[1]).toContain('https://n.accountint1.post.ch/v1/session/keepalive');
    });

    it('does not refresh anything while anonymous', async () => {
      jest.useFakeTimers();
      const fetchMock = mockSubscribe({ typ: 'ukn' });
      const controller = track(
        createSessionController({
          endPoint: 'https://n.accountint1.post.ch',
          conf: { keepAliveInterval: 1 },
          onSessionChange: jest.fn(),
        }),
      );

      await controller.start();
      fetchMock.mockClear();
      jest.advanceTimersByTime(60 * 1000 * 3);

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('stops refreshing once the controller is stopped', async () => {
      jest.useFakeTimers();
      const fetchMock = mockSubscribe({
        typ: 'sub',
        adr: 'address-1',
        ttl: 60_000,
        data: sessionData,
      });
      const controller = track(
        createSessionController({
          endPoint: 'https://n.accountint1.post.ch',
          conf: { keepAliveInterval: 1 },
          onSessionChange: jest.fn(),
        }),
      );
      await controller.start();

      controller.stop();
      fetchMock.mockClear();
      jest.advanceTimersByTime(60 * 1000 * 3);

      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
