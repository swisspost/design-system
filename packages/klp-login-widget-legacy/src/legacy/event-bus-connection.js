/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The live half of the session: a vert.x event bus over SockJS, listening on the address the
 * subscription handed out.
 *
 * A socket can drop for two very different reasons. Either the session ended, in which case the
 * widget has already been told and nothing should happen, or the connection failed while the
 * session is still valid, in which case the widget has to subscribe again and get a new address.
 * The retry flag is set by whoever knows the difference, which is the message router.
 * ------------------------------------------------------------------------------------------------
 */

import { vertx } from './vertx-eventbus';

export function createEventBusConnection({
  url,
  getDebug,
  log = () => {},
  getAddress,
  onMessage,
  onReconnect,
}) {
  let eventBus;
  let retrySubscribeOnFail = false;

  function setRetryOnFail(value) {
    retrySubscribeOnFail = value;
  }

  function getRetryOnFail() {
    return retrySubscribeOnFail;
  }

  function registerEventsHandler() {
    if (eventBus) {
      eventBus.registerHandler(getAddress(), function (message, replyTo) {
        onMessage(message);
      });
    }
  }

  function openCommunication() {
    if (!eventBus) {
      eventBus = new vertx.EventBus(url, {
        debug: getDebug(),
        devel: getDebug(),
      });

      eventBus.onopen = function () {
        log('EventBus opened');
        registerEventsHandler();
        window.addEventListener('beforeunload', closeCommunication);
      };

      eventBus.onclose = function () {
        log('EventBus closed');
        log(
          'Communication closed with retrySubscribeOnFail=' +
            retrySubscribeOnFail +
            '. Retrying subscribe',
        );
        eventBus = null;
        window.removeEventListener('beforeunload', closeCommunication);

        if (retrySubscribeOnFail) {
          retrySubscribeOnFail = false;
          onReconnect();
        }
      };
    }
  }

  function closeCommunication() {
    if (eventBus) {
      eventBus.close();
    }
  }

  return {
    openCommunication,
    closeCommunication,
    registerEventsHandler,
    setRetryOnFail,
    getRetryOnFail,
  };
}
