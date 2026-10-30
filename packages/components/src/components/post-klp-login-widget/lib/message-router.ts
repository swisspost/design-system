import type { KlpMessage, KlpRouterActions } from './klp-session.model';

/**
 * The KLP session protocol: one message type, one decision. Every effect arrives as an injected
 * action, so the routing table can be exercised without a browser, a socket or a session.
 */

export interface KlpMessageRouterOptions {
  log?: (message: string) => void;
  actions: KlpRouterActions;
}

/**
 * The platform answers a register with 'ukn' + 'sub' when the address is not the session's: a stale
 * address after a login elsewhere, which one more subscription fixes. A platform that never keeps
 * the address (INT2 in 2026-10 handed out a new one on every subscribe) would make that a loop.
 */
const MAX_RESUBSCRIBES = 1;

export function createMessageRouter({ log = () => {}, actions }: KlpMessageRouterOptions) {
  // Resubscriptions since the platform last accepted our address with a 'hi'.
  let resubscribes = 0;

  return function handleMessage(message: KlpMessage): void {
    log(`Message received: ${JSON.stringify(message)}`);

    // A 'sub' carries the address the platform just assigned us. Adopting it first is what makes
    // the audit of that very message correlatable.
    if (message.typ === 'sub') {
      actions.setAddress(message.adr);
    }

    actions.audit(message);
    actions.setRetrySubscribeOnFail(false);

    switch (message.typ) {
      case 'ukn':
        if (message.sub && resubscribes < MAX_RESUBSCRIBES) {
          resubscribes++;
          // Ask again, but remember that a dropped socket should not be the end of it.
          actions.setRetrySubscribeOnFail(true);
          actions.logout();
          actions.subscribe();
        } else if (message.sub) {
          // The session is valid, only its address is not. Stay signed in, without live updates.
          log('Address still unknown after resubscribing, no live updates for this session');
        } else {
          actions.logout();
        }
        break;
      case 'sub':
        actions.login(message.data, message.ttl, false);
        actions.openCommunication();
        break;
      case 'hi':
        resubscribes = 0;
        actions.login(message.data, message.ttl, true);
        actions.removeNotificationsFromCache();
        break;
      case 'bye':
        actions.logout();
        break;
      case 'doc':
        actions.showDocument(message.doc, message.doctyp);
        break;
      case 'rem':
        actions.removeDocument(message.doctyp);
        break;
      default:
        log(`Unknown event received: ${(message as KlpMessage).typ}`);
        actions.logout();
        break;
    }
  };
}
