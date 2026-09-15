/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The HTTP side of the KLP session, lifted from the v9 widget. Every call is credentialed and
 * cross-origin: the widget runs on a post.ch page while the session lives on the platform host.
 *
 * What it does not decide is what a response means. subscribe() hands back the parsed body and
 * lets the caller rule on it, because the failure policy is the widget's, not the transport's.
 * ------------------------------------------------------------------------------------------------
 */

export function buildEndPoints(endPoint) {
  return {
    audit: endPoint + '/v1/audit',
    keepalive: endPoint + '/v1/session/keepalive',
    subscribe: endPoint + '/v1/session/subscribe',
    eventbus: endPoint + '/eventbus',
  };
}

/** Cache buster for the keepalive pixels, which are plain GETs the browser would otherwise reuse. */
function random() {
  return Math.floor(Math.random() * 999999999 + 1);
}

export function createSessionClient({
  endPoints,
  log = () => {},
  logPerformanceMetric = () => {},
}) {
  /** Fire and forget: a failed audit must not disturb the session it is reporting on. */
  function audit(address, message) {
    const auditingEvent = JSON.stringify({
      adr: address,
      evt: message,
    });

    if (message.adt) {
      log('Sending auditing event: ' + auditingEvent);
      fetch(endPoints.audit, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: auditingEvent,
      }).catch(error => {
        if (error) console.error(error);
      });
    } else {
      log('Auditing disabled: ' + auditingEvent);
    }
  }

  function subscribe({ hasControlCookie }) {
    log('Subscribing to get an address');

    if (globalThis.console && globalThis.console.info) {
      console.info('[klp-login-widget] subscribe attempt', {
        hasNctrl: hasControlCookie,
        userAgent: navigator.userAgent,
      });
    }

    const startTime = new Date().getTime();
    const pending = fetch(endPoints.subscribe, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    }).then(message => message.json());

    // v9 measured how long issuing the request took, not how long it took to answer.
    logPerformanceMetric('subscribe()', new Date().getTime() - startTime);

    return pending;
  }

  /** Two pixels, because the session has to be refreshed on the portal and on the platform. */
  function keepAliveMarkup(keepAliveURL) {
    return (
      "<img src='" +
      keepAliveURL +
      '/?' +
      random() +
      "'><img src='" +
      endPoints.keepalive +
      '?' +
      random() +
      "'>"
    );
  }

  return { audit, subscribe, keepAliveMarkup };
}
