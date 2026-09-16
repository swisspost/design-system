/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * When to refresh the session, and when to let it expire.
 *
 * The rule is deliberately conservative: a tick only refreshes the session if the user did
 * something since the last one. Leaving a tab open must not keep a session alive forever, so
 * every interval starts by clearing the activity flag again.
 *
 * How the session is refreshed is the caller's business; this module only decides when.
 * ------------------------------------------------------------------------------------------------
 */

/** The config carries the activity events as one space-separated string, the way jQuery took them. */
const activityEvents = conf => conf.keepAliveListeningEvents.split(/\s+/).filter(Boolean);

export function createKeepAlive({
  getConf,
  log = () => {},
  isUserAuthenticated,
  ping,
  getControlCookieVal,
  setControlCookie,
}) {
  // Starts out true so the first tick always refreshes: arriving on the page is activity enough.
  let isUserActive = true;
  let keepAliveTimer;

  function setUserActive() {
    isUserActive = true;
  }

  function installUserActivityHandler() {
    activityEvents(getConf()).forEach(event => document.addEventListener(event, setUserActive));
  }

  function uninstallUserActivityHandler() {
    activityEvents(getConf()).forEach(event => document.removeEventListener(event, setUserActive));
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
      keepAliveTimer = window.setInterval(
        keepAliveTimerFunction,
        getConf().keepAliveInterval * 60 * 1000,
      );
    }
  }

  function uninstallKeepAliveTimerHandler() {
    if (getConf().keepAlive) {
      uninstallUserActivityHandler();
      if (keepAliveTimer) {
        window.clearInterval(keepAliveTimer);
        keepAliveTimer = undefined;
      }
    }
  }

  function keepAliveSessions() {
    if (isUserAuthenticated()) {
      ping();
      // Shared with the other tabs, which read it to decide whether they still owe a refresh.
      setControlCookie('keepalive', new Date().getTime());
    }
  }

  function keepAliveSessionsOnInit() {
    const now = new Date().getTime();
    const lastKeepAlive = getControlCookieVal('keepalive');
    if (
      isNaN(lastKeepAlive) ||
      now - parseInt(lastKeepAlive) > getConf().keepAliveInterval * 60 * 1000
    ) {
      log('Running keepAliveSessionsOnInit');
      keepAliveSessions();
      return;
    }
    log(
      'keepAliveSessionsOnInit not running due to [now=' +
        now +
        ',last=' +
        lastKeepAlive +
        ',interval=' +
        getConf().keepAliveInterval * 60 * 1000,
    );
  }

  return {
    keepAliveSessions,
    keepAliveSessionsOnInit,
    installKeepAliveTimerHandler,
    uninstallKeepAliveTimerHandler,
  };
}
