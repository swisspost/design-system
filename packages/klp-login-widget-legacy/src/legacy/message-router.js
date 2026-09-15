/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The KLP session protocol: one message type, one decision. Every effect arrives as an injected
 * action, so the routing table can be exercised without a browser, a socket or a session.
 *
 * The message types are the wire contract of the v9 platform and cannot be renamed:
 *   ukn  the platform does not know us. With sub set it also wants us to subscribe again.
 *   sub  the answer to a subscription: carries our address and, if any, an existing session.
 *   hi   somebody logged in, in this tab or another one.
 *   bye  somebody logged out.
 *   doc  a document was pushed to us.
 *   rem  a document was withdrawn.
 * ------------------------------------------------------------------------------------------------
 */

export function createMessageRouter({ log = () => {}, actions }) {
  return function handleMessage(message) {
    log('Message received: ' + JSON.stringify(message));

    // Audited before anything else, so the audit of a 'sub' still reports the old address.
    actions.audit(message);
    actions.setRetrySubscribeOnFail(false);

    switch (message.typ) {
      case 'ukn':
        if (message.sub) {
          // Ask again, but remember that a dropped socket should not be the end of it.
          actions.setRetrySubscribeOnFail(true);
          actions.logout();
          actions.subscribe();
        } else {
          actions.logout();
        }
        break;
      case 'sub':
        actions.setAddress(message.adr);
        actions.login(message.data, message.ttl, false);
        actions.openCommunication();
        break;
      case 'hi':
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
        log('Unknown event received: ' + message.typ);
        actions.logout();
        break;
    }
  };
}
