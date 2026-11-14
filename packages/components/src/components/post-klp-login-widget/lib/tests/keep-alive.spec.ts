import { createKeepAlive, KLP_KEEP_ALIVE_DEFAULTS, type KlpKeepAliveConf } from '../keep-alive';

function setup(conf: Partial<KlpKeepAliveConf> = {}, authenticated = true) {
  const ping = jest.fn();
  const setControlCookie = jest.fn();
  const log = jest.fn();
  const keepAlive = createKeepAlive({
    getConf: () => ({ ...KLP_KEEP_ALIVE_DEFAULTS, ...conf }),
    log,
    isUserAuthenticated: () => authenticated,
    ping,
    setControlCookie,
  });

  return { keepAlive, ping, setControlCookie, log };
}

const INTERVAL_MS = KLP_KEEP_ALIVE_DEFAULTS.keepAliveInterval * 60 * 1000;

describe('keep-alive', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('keepAliveSessions', () => {
    it('refreshes the session and shares the timestamp with the other tabs', () => {
      const { keepAlive, ping, setControlCookie } = setup();

      keepAlive.keepAliveSessions();

      expect(ping).toHaveBeenCalledTimes(1);
      expect(setControlCookie).toHaveBeenCalledWith('keepalive', expect.any(Number));
    });

    it('does nothing at all for an anonymous user', () => {
      const { keepAlive, ping, setControlCookie } = setup({}, false);

      keepAlive.keepAliveSessions();

      expect(ping).not.toHaveBeenCalled();
      expect(setControlCookie).not.toHaveBeenCalled();
    });
  });

  describe('the timer', () => {
    it('refreshes on the first tick, because arriving on the page counts as activity', () => {
      const { keepAlive, ping } = setup();
      keepAlive.installKeepAliveTimerHandler();

      jest.advanceTimersByTime(INTERVAL_MS);

      expect(ping).toHaveBeenCalledTimes(1);
    });

    it('lets the session expire when the user did nothing since the last tick', () => {
      const { keepAlive, ping, log } = setup();
      keepAlive.installKeepAliveTimerHandler();

      jest.advanceTimersByTime(INTERVAL_MS * 2);

      expect(ping).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith('Keepalive call canceled due to user inactivity');
    });

    it('refreshes again once the user does something', () => {
      const { keepAlive, ping } = setup();
      keepAlive.installKeepAliveTimerHandler();
      jest.advanceTimersByTime(INTERVAL_MS * 2);

      document.dispatchEvent(new Event('click'));
      jest.advanceTimersByTime(INTERVAL_MS);

      expect(ping).toHaveBeenCalledTimes(2);
    });

    it('honours the configured interval', () => {
      const { keepAlive, ping } = setup({ keepAliveInterval: 1 });
      keepAlive.installKeepAliveTimerHandler();

      jest.advanceTimersByTime(60 * 1000);

      expect(ping).toHaveBeenCalledTimes(1);
    });

    it('does not install anything when keep-alive is switched off', () => {
      const { keepAlive, ping } = setup({ keepAlive: false });
      keepAlive.installKeepAliveTimerHandler();

      jest.advanceTimersByTime(INTERVAL_MS * 3);

      expect(ping).not.toHaveBeenCalled();
    });

    it('installs only one timer, however often it is asked', () => {
      const { keepAlive, ping } = setup();

      keepAlive.installKeepAliveTimerHandler();
      keepAlive.installKeepAliveTimerHandler();
      jest.advanceTimersByTime(INTERVAL_MS);

      expect(ping).toHaveBeenCalledTimes(1);
    });

    it('stops refreshing once uninstalled', () => {
      const { keepAlive, ping } = setup();
      keepAlive.installKeepAliveTimerHandler();

      keepAlive.uninstallKeepAliveTimerHandler();
      jest.advanceTimersByTime(INTERVAL_MS * 3);

      expect(ping).not.toHaveBeenCalled();
    });

    it('stops listening for activity once uninstalled', () => {
      const removeEventListener = jest.spyOn(document, 'removeEventListener');
      const { keepAlive } = setup();
      keepAlive.installKeepAliveTimerHandler();

      keepAlive.uninstallKeepAliveTimerHandler();

      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('can be installed again after being uninstalled', () => {
      const { keepAlive, ping } = setup();
      keepAlive.installKeepAliveTimerHandler();
      keepAlive.uninstallKeepAliveTimerHandler();

      keepAlive.installKeepAliveTimerHandler();
      jest.advanceTimersByTime(INTERVAL_MS);

      expect(ping).toHaveBeenCalledTimes(1);
    });
  });
});
