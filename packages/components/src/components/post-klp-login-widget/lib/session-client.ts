import type { KlpEndPoints, KlpMessage } from './klp-session.model';

/**
 * The HTTP side of the KLP session, ported from the v9 widget. Every call is credentialed and
 * cross-origin: the widget runs on a post.ch page while the session lives on the platform host.
 *
 * What it does not decide is what a response means. `subscribe()` hands back the parsed body and
 * lets the caller rule on it, because the failure policy is the widget's, not the transport's.
 */

export interface KlpSessionClientOptions {
  endPoints: KlpEndPoints;
  log?: (message: string) => void;
  logPerformanceMetric?: (name: string, duration: number) => void;
}

export function buildEndPoints(endPoint: string): KlpEndPoints {
  return {
    audit: `${endPoint}/v1/audit`,
    keepalive: `${endPoint}/v1/session/keepalive`,
    subscribe: `${endPoint}/v1/session/subscribe`,
    eventbus: `${endPoint}/eventbus`,
  };
}

/** Cache buster for the keepalive pixels, which are plain GETs the browser would otherwise reuse. */
let keepAliveCount = 0;
const cacheBuster = () => `${Date.now()}${++keepAliveCount}`;

export function createSessionClient({
  endPoints,
  log = () => {},
  logPerformanceMetric = () => {},
}: KlpSessionClientOptions) {
  /** Fire and forget: a failed audit must not disturb the session it is reporting on. */
  function audit(address: string, message: KlpMessage): void {
    const auditingEvent = JSON.stringify({ adr: address, evt: message });

    if (!message.adt) {
      log(`Auditing disabled: ${auditingEvent}`);
      return;
    }

    log(`Sending auditing event: ${auditingEvent}`);
    fetch(endPoints.audit, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: auditingEvent,
    }).catch(error => {
      if (error) console.error(error);
    });
  }

  function subscribe(): Promise<KlpMessage> {
    log('Subscribing to get an address');

    const startTime = Date.now();

    return (
      fetch(endPoints.subscribe, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
        // Timed on settlement, so a failed subscribe is measured too rather than silently missing.
        .finally(() => logPerformanceMetric('subscribe()', Date.now() - startTime))
        .then(response => response.json())
    );
  }

  /** Two urls, because the session has to be refreshed on the portal and on the platform. */
  function keepAliveUrls(keepAliveURL?: string): string[] {
    const platform = `${endPoints.keepalive}?${cacheBuster()}`;

    return keepAliveURL ? [`${keepAliveURL}/?${cacheBuster()}`, platform] : [platform];
  }

  return { audit, subscribe, keepAliveUrls };
}
