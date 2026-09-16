/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The vert.x 2 event bus client, vendored verbatim from the v9 widget. It talks the vert.x bridge
 * protocol over SockJS: register/unregister for addresses, send/publish for messages, and a reply
 * address that turns a send into a request.
 * ------------------------------------------------------------------------------------------------
 */

import { SockJS } from './sockjs-websocket';

/** Reusing an already seeded window.vertx is what lets the page hand the suite this shim. */
export const vertx = window.vertx || {};

!(function (factory) {
  factory(SockJS);
})(function (SockJS) {
  vertx.EventBus = function (url, options) {
    const that = this;
    const sockJSConn = new SockJS(url, undefined, options);
    const handlerMap = {};
    const replyHandlers = {};
    let state = vertx.EventBus.CONNECTING;
    let pingTimerID = null;
    let pingInterval = null;
    if (options) {
      pingInterval = options.vertxbus_ping_interval;
    }
    if (!pingInterval) {
      pingInterval = 5000;
    }
    that.onopen = null;
    that.onclose = null;
    that.login = function (username, password, replyHandler) {
      sendOrPub(
        'send',
        'vertx.basicauthmanager.login',
        {
          username: username,
          password: password,
        },
        function (reply) {
          if (reply.status === 'ok') {
            that.sessionID = reply.sessionID;
          }
          if (replyHandler) {
            delete reply.sessionID;
            replyHandler(reply);
          }
        },
      );
    };
    that.send = function (address, message, replyHandler) {
      sendOrPub('send', address, message, replyHandler);
    };
    that.publish = function (address, message) {
      sendOrPub('publish', address, message, null);
    };
    that.registerHandler = function (address, handler) {
      checkSpecified('address', 'string', address);
      checkSpecified('handler', 'function', handler);
      checkOpen();
      let handlers = handlerMap[address];
      if (!handlers) {
        handlers = [handler];
        handlerMap[address] = handlers;
        const msg = {
          type: 'register',
          address: address,
        };
        sockJSConn.send(JSON.stringify(msg));
      } else {
        handlers[handlers.length] = handler;
      }
    };
    that.unregisterHandler = function (address, handler) {
      checkSpecified('address', 'string', address);
      checkSpecified('handler', 'function', handler);
      checkOpen();
      const handlers = handlerMap[address];
      if (handlers) {
        const idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
        if (handlers.length === 0) {
          const msg = {
            type: 'unregister',
            address: address,
          };
          sockJSConn.send(JSON.stringify(msg));
          delete handlerMap[address];
        }
      }
    };
    that.close = function () {
      checkOpen();
      state = vertx.EventBus.CLOSING;
      sockJSConn.close();
    };
    that.readyState = function () {
      return state;
    };
    sockJSConn.onopen = function () {
      sendPing();
      pingTimerID = setInterval(sendPing, pingInterval);
      state = vertx.EventBus.OPEN;
      if (that.onopen) {
        that.onopen();
      }
    };
    sockJSConn.onclose = function () {
      state = vertx.EventBus.CLOSED;
      if (pingTimerID) clearInterval(pingTimerID);
      if (that.onclose) {
        that.onclose();
      }
    };
    sockJSConn.onmessage = function (e) {
      const msg = e.data;
      const json = JSON.parse(msg);
      const body = json.body;
      const replyAddress = json.replyAddress;
      const address = json.address;
      let replyHandler;
      if (replyAddress) {
        replyHandler = function (reply, replyHandler) {
          that.send(replyAddress, reply, replyHandler);
        };
      }
      const handlers = handlerMap[address];
      if (handlers) {
        const copy = handlers.slice(0);
        for (const element of copy) {
          element(body, replyHandler);
        }
      } else {
        const handler = replyHandlers[address];
        if (handler) {
          delete replyHandlers[address];
          handler(body, replyHandler);
        }
      }
    };

    function sendPing() {
      const msg = {
        type: 'ping',
      };
      sockJSConn.send(JSON.stringify(msg));
    }

    function sendOrPub(sendOrPub, address, message, replyHandler) {
      checkSpecified('address', 'string', address);
      checkSpecified('replyHandler', 'function', replyHandler, true);
      checkOpen();
      const envelope = {
        type: sendOrPub,
        address: address,
        body: message,
      };
      if (that.sessionID) {
        envelope.sessionID = that.sessionID;
      }
      if (replyHandler) {
        const replyAddress = makeUUID();
        envelope.replyAddress = replyAddress;
        replyHandlers[replyAddress] = replyHandler;
      }
      const str = JSON.stringify(envelope);
      sockJSConn.send(str);
    }

    function checkOpen() {
      if (state !== vertx.EventBus.OPEN) {
        throw new Error('INVALID_STATE_ERR');
      }
    }

    function checkSpecified(paramName, paramType, param, optional) {
      if (!optional && !param) {
        throw new Error('Parameter ' + paramName + ' must be specified');
      }
      if (param && typeof param !== paramType) {
        throw new Error('Parameter ' + paramName + ' must be of type ' + paramType);
      }
    }

    function makeUUID() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
      );
    }
  };
  vertx.EventBus.CONNECTING = 0;
  vertx.EventBus.OPEN = 1;
  vertx.EventBus.CLOSING = 2;
  vertx.EventBus.CLOSED = 3;
  return vertx.EventBus;
});
