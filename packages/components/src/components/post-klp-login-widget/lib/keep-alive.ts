/**
 * When to refresh the session, and when to let it expire. Ported from the v9 widget.
 *
 * The rule is deliberately conservative: a tick only refreshes the session if the user did
 * something since the last one, and every tick clears the activity flag again, so a tab left
 * open cannot keep a session alive forever.
 *
 * How the session is refreshed is the caller's business; this module only decides when.
 */

export interface KlpKeepAliveConf {
  keepAlive: boolean;
  /** In minutes, the way the v9 portal config expressed it. */
  keepAliveInterval: number;
  /** One space-separated string, the way jQuery took the events. */
  keepAliveListeningEvents: string;
}

export const KLP_KEEP_ALIVE_DEFAULTS: KlpKeepAliveConf = {
  keepAlive: true,
  keepAliveInterval: 9,
  keepAliveListeningEvents: 'click touchstart keydown',
};

export interface KlpKeepAliveOptions {
  getConf: () => KlpKeepAliveConf;
  log?: (message: string) => void;
  isUserAuthenticated: () => boolean;
  ping: () => void;
  setControlCookie: (slot: 'keepalive', value: number) => void;
}

const activityEvents = (conf: KlpKeepAliveConf): string[] =>
  conf.keepAliveListeningEvents.split(/\s+/).filter(Boolean);

export function createKeepAlive({
  getConf,
  log = () => {},
  isUserAuthenticated,
  ping,
  setControlCookie,
}: KlpKeepAliveOptions) {
  // Starts out true so the first tick always refreshes: arriving on the page is activity enough.
  let isUserActive = true;
  let keepAliveTimer: ReturnType<typeof setInterval> | undefined;

  function setUserActive() {
    isUserActive = true;
  }

  function installUserActivityHandler() {
    for (const event of activityEvents(getConf())) {
      document.addEventListener(event, setUserActive);
    }
  }

  function uninstallUserActivityHandler() {
    for (const event of activityEvents(getConf())) {
      document.removeEventListener(event, setUserActive);
    }
  }

  function keepAliveTimerFunction() {
    if (isUserActive) {
      isUserActive = false;
      keepAliveSessions();
    } else {
      log('Keepalive call canceled due to user inactivity');
    }
  }

  function installKeepAliveTimerHandler() {
    if (getConf().keepAlive && keepAliveTimer === undefined) {
      installUserActivityHandler();
      keepAliveTimer = globalThis.setInterval(
        keepAliveTimerFunction,
        getConf().keepAliveInterval * 60 * 1000,
      );
    }
  }

  function uninstallKeepAliveTimerHandler() {
    if (getConf().keepAlive) {
      uninstallUserActivityHandler();
      if (keepAliveTimer !== undefined) {
        globalThis.clearInterval(keepAliveTimer);
        keepAliveTimer = undefined;
      }
    }
  }

  function keepAliveSessions() {
    if (isUserAuthenticated()) {
      ping();
      // Shared with the other tabs, which read it to decide whether they still owe a refresh.
      setControlCookie('keepalive', Date.now());
    }
  }

  return {
    keepAliveSessions,
    installKeepAliveTimerHandler,
    uninstallKeepAliveTimerHandler,
  };
}
