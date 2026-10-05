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

function controllerFor(message: KlpMessage) {
  const fetchMock = mockSubscribe(message);
  const onSessionChange = jest.fn();
  const controller = createSessionController({
    endPoint: 'https://n.accountint1.post.ch',
    onSessionChange,
  });

  return { controller, onSessionChange, fetchMock };
}

describe('session-controller', () => {
  afterEach(() => {
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
    const controller = createSessionController({
      endPoint: 'https://n.accountint1.post.ch',
      onSessionChange,
    });

    await expect(controller.start()).resolves.toBeUndefined();
    expect(controller.getSession()).toBeNull();
  });
});
