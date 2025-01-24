/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * $Id$
 * ------------------------------------------------------------------------------------------------
 */

import './sockjs-client';
import 'url-polyfill';
import jQuery from 'jquery/dist/jquery.slim';

const vertx = window.vertx || {};
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
(function ($) {
  window.klpWidgetDev = function (
    id,
    app,
    service,
    appLoginURL,
    _menuLinks,
    lang,
    platform,
    options,
    environment,
  ) {
    const headerNode = document.getElementsByTagName('header')[0];
    const config = { attributes: true, childList: false, subtree: false };
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          if ($('header').hasClass('h-fixed-position') && !$('header').hasClass('h-visible')) {
            selectFromShadowDom().find('.klp-widget-authenticated-menu').css('display', 'none');
            selectFromShadowDom()
              .find('#' + id)
              .removeClass('bubble');
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    if (headerNode) {
      observer.observe(headerNode, config);
    }

    let keepAliveID = 'klp-widget-keepalive',
      persistedStateKey = 'klp.widget.state',
      persistedDocumentPrefix = 'klp.widget.document.',
      controlCookieName = 'NCTRL',
      controlCookieDomain = 'post.ch',
      controlCookieDomainRegEx = new RegExp(controlCookieDomain + '$'),
      controlCookieRegEx = new RegExp(controlCookieName + '=([^;]+)'),
      eventBus,
      address,
      retrySubscribeOnFail = false,
      sessionData,
      loginCallback,
      keepAliveCallback,
      logoutCallback,
      documentCallbacks = {},
      documentUnreadNotifications = 'UNREAD_NOTIFICATIONS',
      isUserActive = true,
      keepAliveTimer,
      currentLang = 'de',
      originUrl = '',
      startingTime = new Date().getTime(),
      version = '16.01.00.01',
      unreadNotifications = 0,
      texts = {
        de: {
          'sign-in': 'Login',
          'sign-out': 'Logout',
          'change-company': 'Firma w\u00E4hlen',
          'change-company-confirm-dialog':
            'M\u00F6chten Sie die aktuelle Firma wechseln? </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Firma w\u00E4hlen</button>',
          'change-company-support-dialog':
            'Im Kunden-Supportlogin steht die Funktion "Firma wechseln" nicht zur Verf\u00FCgung. F\u00FChren Sie stattdessen ein Logout durch und starten Sie das Kunden-Supportlogin auf einem neuen Benutzer oder einer neuen Firma. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'change-account': 'Benutzerkonto wechseln',
          'change-account-confirm-dialog':
            'M\u00F6chten Sie in ein anderes Benutzerkonto wechseln? </p></div></div><div class="modal-button-container row"><div class="item-centered d-flex justify-content-center col-lg-12 col-12 pe-0 me-0"><div class="col-lg-4 col-12 me-0 pe-0"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary w-100">Weiter</button>',
          'change-account-support-dialog':
            'Im Kunden-Supportlogin steht die Funktion "Benutzerkonto wechseln" nicht zur Verf\u00FCgung. F\u00FChren Sie stattdessen ein Logout durch und starten Sie das Kunden-Supportlogin auf einem neuen Benutzer oder einer neuen Firma. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'links': 'Meine Onlinedienste',
          'notifications': 'Meldungen',
          'toggle-menu': 'toggle-menu',
          'no-links': 'Keine Favoriten bei Onlinedienste',
          'no-notifications': 'Keine ungelesenen Meldungen',
          'more-notifications': 'Alle Meldungen',
          'title-text-menu': 'Meine \u00DCbersicht',
          'title-text-links': 'Meine Onlinedienste',
          'title-text-notifications': 'Nachrichten',
          'userProfile': 'Mein Profil',
          'settings': 'Einstellungen',
        },
        fr: {
          'sign-in': 'Login',
          'sign-out': 'Logout',
          'change-company': 'Changer entreprise',
          'change-company-confirm-dialog':
            'Voulez-vous quitter l\'entreprise actuelle? </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Changer enterprise</button>.',
          'change-company-support-dialog':
            'Dans le Login-Support, la fonction changer entreprise n\'est pas disponible. Il faut quitter la session et puis d\u00E9marrer un nouveau Login-Support avec un autre compte ou une soci\u00E9t\u00E9 diff\u00E9rente. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">D\u00E9connexion</button>',
          'change-account': 'Changer de compte',
          'change-account-confirm-dialog':
            'Vous souhaitez changer de compte utilisateur? </p></div></div><div class="modal-button-container row"><div class="item-centered d-flex justify-content-center col-lg-12 col-12 pe-0 me-0"><div class="col-lg-4 col-12 me-0 pe-0"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary w-100">Continuer</button>',
          'change-account-support-dialog':
            'La fonction "Changer de compte" n\'est pas disponible dans le login de support client. D\u00E9connectez-vous et d\u00E9marrez le login de support client sur un autre compte utilisateur ou d\'entreprise. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">D\u00E9connexion</button>',
          'links': 'Mes services en ligne',
          'notifications': 'notifications',
          'toggle-menu': 'toggle-menu',
          'no-links': 'Pas de favoris',
          'no-notifications': 'Pas de notifications non lues',
          'more-notifications': 'Toutes les notifications',
          'title-text-menu': 'Mon compte',
          'title-text-links': 'Mes services en ligne',
          'title-text-notifications': 'Messages',
          'userProfile': 'Mon profil',
          'settings': 'Paramètres',
        },
        it: {
          'sign-in': 'Login',
          'sign-out': 'Logout',
          'change-company': 'Cambia la ditta',
          'change-company-confirm-dialog':
            '\u00C8 sicuro di voler uscire dall\'attuale ditta? </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Cambia la ditta</button>',
          'change-company-support-dialog':
            'Nell\'Assistenza clienti, il cambiamento di ditta non \u00E8 disponibile. Bisogna prima eseguire un Logout, quindi avviare nuovamente l\'Assistenza clienti selezionando un utente o una ditta differente. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'change-account': 'Cambia account utente',
          'change-account-confirm-dialog':
            'Desidera accedere con un altro account utente? </p></div></div><div class="modal-button-container row"><div class="item-centered d-flex justify-content-center col-lg-12 col-12 pe-0 me-0"><div class="col-lg-4 col-12 me-0 pe-0"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary w-100">Avanti</button>',
          'change-account-support-dialog':
            'Nel login assistenza clienti non \u00E8 disponibile la funzione "Modifica account utente". Si consiglia di effettuare il logout, quindi di riaccedere al login assistenza clienti tramite un nuovo account utente o una nuova ditta. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'links': 'I miei servizi online',
          'notifications': 'notifiche',
          'toggle-menu': 'toggle-menu',
          'no-links': 'Nessun preferito',
          'no-notifications': 'Nessuna notifica non letta',
          'more-notifications': 'Tutte le notifiche',
          'title-text-menu': 'Il mio riepilogo',
          'title-text-links': 'I miei servizi online',
          'title-text-notifications': 'Messaggi',
          'userProfile': 'Il mio profilo',
          'settings': 'Impostazioni',
        },
        en: {
          'sign-in': 'Login',
          'sign-out': 'Logout',
          'change-company': 'Change company',
          'change-company-confirm-dialog':
            'Would you like to sign-out from the current company? </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Next</button>.',
          'change-company-support-dialog':
            'On Kunden-Supportlogin, the function Change company is not available. You have to SignOut and then start again a new Kunden-Supportlogin selecting a different account or company. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'change-account': 'Change user account',
          'change-account-confirm-dialog':
            'Do you want to change to another user account? </p></div></div><div class="modal-button-container row"><div class="item-centered d-flex justify-content-center col-lg-12 col-12 pe-0 me-0"><div class="col-lg-4 col-12 me-0 pe-0"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary w-100">Next</button>',
          'change-account-support-dialog':
            'The "Change user account" function is not available in the customer support login. Instead, log out and start the customer support login using a new user or new company. </p></div></div><div class="modal-button-container row"><div class="col-6"></div><div class="col-6 item-centered"><button id="klp-widget-authenticated-dochangecompany" class="ppm-button btn btn-primary col-11">Logout</button>',
          'links': 'My online services',
          'notifications': 'notifications',
          'toggle-menu': 'toggle-menu',
          'no-links': 'No favorites',
          'no-notifications': 'No unread notifications',
          'more-notifications': 'All notifications',
          'title-text-menu': 'My overview',
          'title-text-links': 'My online services',
          'title-text-notifications': 'Inbox',
          'userProfile': 'My Profile',
          'settings': 'Settings',
        },
      },
      keys = {
        'sign-in': {
          'access-key': 'i',
          'tab-index': 0,
        },
        'sign-out': {
          'access-key': 'o',
          'tab-index': 3,
        },
        'toggle-menu': {
          'access-key': 'm',
          'tab-index': 0,
        },
        'change-company': {
          'access-key': 'c',
          'tab-index': 2,
        },
        'change-account': {
          'access-key': 'c',
          'tab-index': 2,
        },
        'notifications': {
          'access-key': 'n',
          'tab-index': 1,
        },
        'links': {
          'access-key': 'l',
          'tab-index': 4,
        },
      },
      platformEndPoints = {
        audit: platform.endPoint + '/v1/audit',
        keepalive: platform.endPoint + '/v1/session/keepalive',
        subscribe: platform.endPoint + '/v1/session/subscribe',
        eventbus: platform.endPoint + '/eventbus',
      },
      conf = {
        logoutTargetURL: '',
        keepAlive: true,
        keepAliveListeningEvents: 'click touchstart keydown',
        keepAliveOnInit: true,
        keepAliveInterval: 9,
        showLinks: true,
        tabIndex: -1,
        accessKeys: false,
        notificationsNrToLoad: 5,
        debug: false,
      };
    if (lang !== undefined) {
      currentLang = lang.toLowerCase();
    }
    const getLocation = function (url) {
      return new URL(url);
    };
    const url = getLocation(logoutURL());
    originUrl = url.origin;
    const menuLinks = [
      {
        description: texts[currentLang].userProfile,
        url: originUrl + '/selfadmin/?lang=' + currentLang,
        iconclass: 'widget_icon_profile',
      },
    ];

    const messagesUrl = originUrl + '/selfadmin/messages/?lang=' + currentLang;

    if (options !== undefined) {
      conf = { ...conf, ...options };
    }

    function isHTML5StorageSupported() {
      try {
        return 'sessionStorage' in window && window.sessionStorage !== null;
      } catch (e) {
        log('No local storage available');
        return false;
      }
    }

    function now() {
      const n = new Date();
      return (
        n.getFullYear() +
        '-' +
        n.getMonth() +
        1 +
        '-' +
        n.getDate() +
        ' ' +
        n.getHours() +
        ':' +
        n.getMinutes() +
        ':' +
        n.getSeconds() +
        ',' +
        n.getMilliseconds()
      );
    }

    function log(message) {
      if (conf.debug && window.console && window.console.log) {
        console.log('[' + now() + '] - KLP.WIDGET - ' + message);
      }
    }

    function audit(message) {
      const auditingEvent = JSON.stringify({
        adr: address,
        evt: message,
      });
      if (message.adt) {
        log('Sending auditing event: ' + auditingEvent);
        fetch(platformEndPoints.audit, {
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

    function logPerformanceMetric(methodName, executionTime) {
      if (conf.debug && window.console && window.console.log) {
        log('Method ' + methodName + ' executed on ' + executionTime + ' ms');
      }
    }

    function random() {
      return Math.floor(Math.random() * 999999999 + 1);
    }

    function text(key) {
      return texts[currentLang][key];
    }

    function accessKey(key) {
      if (conf.accessKeys === false || keys[key]['access-key'] == null) {
        return '';
      }
      return 'accesskey="' + keys[key]['access-key'] + '"';
    }

    function tabIndex(key) {
      if (conf.tabIndex < 0) {
        return 0;
      }
      return keys[key]['tab-index'] + conf.tabIndex;
    }

    function join(base, query) {
      if (query === undefined) {
        return base;
      }
      if (base.indexOf('?') === -1) {
        return base + '?' + query;
      } else {
        return base + '&' + query;
      }
    }

    function loginURL() {
      return join(appLoginURL, buildLoginParameters());
    }

    function buildLoginParameters() {
      let parameters = '';
      $.each(
        {
          app: app,
          service: service,
          lang: currentLang,
        },
        function (key, value) {
          if (appLoginURL.toLowerCase().indexOf(key.toLowerCase()) === -1) {
            if (parameters.length > 0) {
              parameters += '&';
            }
            parameters += key + '=' + value;
          }
        },
      );
      return parameters.length > 0 ? parameters : undefined;
    }

    function logoutURL() {
      const serviceForLogout = 'klp';
      const inIframe = false;
      return join(
        platform.logoutURL,
        'app=' +
          app +
          '&lang=' +
          currentLang +
          '&service=' +
          serviceForLogout +
          '&inIframe=' +
          inIframe +
          '&logoutTargetURL=' +
          conf.logoutTargetURL,
      );
    }

    function doLogout(logoutUrl) {
      log('Clearing cache and sessionData before starting the logout process');
      sessionData = undefined;
      removePersistedState();
      log('Proceeding to logoutUrl with following path ' + logoutUrl);
      window.location.href = logoutUrl;
    }

    function setChangeAccountDialog() {
      selectFromShadowDom()
        .find('#' + id + ' #klp-widget-authenticated-menu-changecompany')
        .on('click touch', function (e) {
          e.preventDefault();
          selectFromShadowDom()
            .find('#' + id + ' #klp-widget-authenticated-menu-changecompany')
            .focus();
          changeAccountDialog();
          return false;
        });
    }

    function changeAccountDialog() {
      let body;
      let logoutUrl;
      if (sessionData?.support) {
        if (isChangeUserAndProfile()) {
          body = text('change-account-support-dialog');
        } else {
          body = text('change-company-support-dialog');
        }
        logoutUrl = logoutURL();
      } else {
        if (isChangeUserAndProfile()) {
          body = text('change-account-confirm-dialog');
        } else {
          body = text('change-company-confirm-dialog');
        }
        logoutUrl = changeCompanyURL();
      }
      if (
        selectFromShadowDom().find('#' + id + ' #klp-widget-authenticated-changecompanydialog')
          .length === 0
      ) {
        const changecompanyDialog =
          '<div id="changeAccountModal" class="modal"><div class="modal-content"><div class="modal-text-container row"><div class="col-12 text-align-center"><i class="pi pi-2086"></i></div><span class="close">&times;</span><div class="col-1"></div><div class="col-10 text-align-center"><p class="modal-text">' +
          body +
          '</div></div></div>';
        selectFromShadowDom()
          .find('#' + id + ' .klp-widget-authenticated')
          .append(changecompanyDialog);

        // Get the modal
        let modal = selectFromShadowDom().find('#changeAccountModal');
        if (modal.length && modal.length >= 1) {
          modal = modal[0];
        }
        modal.style.display = 'table';
        // Get the <span> element that closes the modal
        const span = selectFromShadowDom().find('#changeAccountModal .close')[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
          modal.parentElement.removeChild(modal);
        };

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target === modal) {
            modal.parentElement.removeChild(modal);
          }
        };

        selectFromShadowDom()
          .find('#klp-widget-authenticated-dochangecompany')
          .on('click touch', function (e) {
            e.preventDefault();
            selectFromShadowDom()
              .find('#' + id + ' #klp-widget-authenticated-dochangecompany')
              .focus();
            doLogout(logoutUrl);
            return false;
          });
      }
    }

    function changeCompanyURL() {
      return logoutURL() + '&changecompany=true';
    }

    function setUserActive() {
      isUserActive = true;
    }

    function restoreState() {
      const state = loadPersistedState();
      if (state) {
        address = state.address;
        retrySubscribeOnFail = true;
        sessionData = state.sessionData;
        renderWidget();
        if (isCurrentLocationPostCh()) {
          renderNotificationsWidget(loadDocumentFromCache(documentUnreadNotifications));
        }
      }
    }

    function loadPersistedState() {
      if (isHTML5StorageSupported()) {
        const persistedState = sessionStorage.getItem(persistedStateKey);
        if (persistedState) {
          try {
            const state = JSON.parse(persistedState);
            if (state.ttl > new Date().getTime() && isPersistedStateValid(state.sessionData)) {
              log('Valid persisted state loaded: ' + persistedState);
              return state;
            } else {
              log('Persisted state expired or invalid');
              removePersistedState();
              setControlCookie('all', 'sub');
            }
          } catch (err) {
            log("Persisted state was invalid due to error '" + err + "'");
            removePersistedState();
            setControlCookie('all', 'sub');
          }
        } else {
          log('No persisted state found');
          removePersistedState();
          setControlCookie('all', 'sub');
        }
      } else {
        log('State not loaded because HTML storage not supported');
      }
      return null;
    }

    function persistState(ttl) {
      if (isHTML5StorageSupported()) {
        sessionStorage.setItem(
          persistedStateKey,
          JSON.stringify({
            ttl: new Date().getTime() + ttl,
            sessionData:
              "If you're looking for this info, contact the Swiss Post Design System Team!",
            address: "If you're looking for this info, contact the Swiss Post Design System Team!",
          }),
        );
        log('State persisted');
        setControlCookie('hash', encodeURIComponent(hash(sessionData)));
      } else {
        log('State not persisted because HTML storage not supported');
      }
    }

    function removePersistedState() {
      if (isHTML5StorageSupported()) {
        sessionStorage.removeItem(persistedStateKey);
        log('Persisted state removed');
        removeControlCookie();
      } else {
        log('Persisted state not removed because HTML storage not supported');
      }
    }

    function isPersistedStateValid(persistedData) {
      const hashPersistedData = hash(persistedData).toString();
      const hashCookie = getControlCookieVal('hash');
      if (hashPersistedData === hashCookie) {
        return true;
      }
      if (hashCookie === undefined && !isCurrentLocationPostCh()) {
        log(
          'Cache validated because on a different host=[' +
            window.location.hostname +
            '] than control cookie domain=[' +
            controlCookieDomain +
            ']',
        );
        return true;
      }
      log(
        'PersistedData are invalid [hashPersistedData=' +
          hashPersistedData +
          ',control cookie=' +
          hashCookie +
          ']',
      );
      return false;
    }

    function isCurrentLocationPostCh() {
      return controlCookieDomainRegEx.test(window.location.hostname);
    }

    function hash(s) {
      s = JSON.stringify(s);
      let hash = 0,
        i,
        chr,
        len;
      if (s.length === 0) return hash;
      for (i = 0, len = s.length; i < len; i++) {
        chr = s.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return hash;
    }

    function getControlCookieVal(scope) {
      const cookieData = controlCookieRegEx.exec(document.cookie);
      if (cookieData != null) {
        const values = decodeURIComponent(cookieData[1]).split(':');
        switch (scope) {
          case 'hash':
            if (values[0] != null) return values[0];
            break;
          case 'keepalive':
            if (values[1] != null) return values[1];
            break;
          default:
            return decodeURIComponent(cookieData[1]);
        }
        return null;
      } else {
        log('Control cookie not found');
        return null;
      }
    }

    function setControlCookie(scope, val) {
      const sameSiteNoneSecure = '; SameSite=None; Secure';
      switch (scope) {
        case 'hash':
          document.cookie =
            controlCookieName +
            '=' +
            val +
            ':' +
            getControlCookieVal('keepalive') +
            '; Path=/; domain=' +
            controlCookieDomain +
            sameSiteNoneSecure +
            '; Secure';
          break;
        case 'keepalive':
          document.cookie =
            controlCookieName +
            '=' +
            getControlCookieVal('hash') +
            ':' +
            val +
            '; Path=/; domain=' +
            controlCookieDomain +
            sameSiteNoneSecure +
            '; Secure';
          break;
        default:
          document.cookie =
            controlCookieName +
            '=' +
            val +
            '; Path=/; domain=' +
            controlCookieDomain +
            sameSiteNoneSecure +
            '; Secure';
          break;
      }
    }

    function removeControlCookie() {
      if (retrySubscribeOnFail) {
        document.cookie =
          controlCookieName + '=' + 'sub' + '; Path=/; domain=' + controlCookieDomain;
        log('Control cookie set to sub');
      } else {
        document.cookie =
          controlCookieName +
          '=' +
          '' +
          '; Path=/; Expires=Wed, 01 Apr 2014 01:00:00 GMT; domain=' +
          controlCookieDomain +
          '; Secure';
        log('Control cookie removed');
      }
    }

    function loadDocumentFromCache(documentType) {
      const persistedKey = persistedDocumentPrefix + documentType;
      if (isHTML5StorageSupported()) {
        const persistedDocument = sessionStorage.getItem(persistedKey);
        if (persistedDocument) {
          const document = $.parseJSON(persistedDocument);
          log('Document ' + documentType + ' has been read from cache with value ' + document);
          return document;
        }
      }
      return null;
    }

    function saveDocumentOnCache(document, documentType) {
      const key = persistedDocumentPrefix + documentType;
      if (isHTML5StorageSupported()) {
        sessionStorage.setItem(key, JSON.stringify(document));
        log(
          'Document ' +
            documentType +
            ' has been persisted on cached with value ' +
            JSON.stringify(document),
        );
      }
    }

    function removeAllDocumentFromCache() {
      removeDocumentFromCache(documentUnreadNotifications);
    }

    function removeDocumentFromCache(documentType) {
      const key = persistedDocumentPrefix + documentType;
      if (isHTML5StorageSupported()) {
        sessionStorage.removeItem(key);
        log('Document ' + documentType + ' has been removed from cache');
      }
    }

    function installUserActivityHandler() {
      if (conf.keepAliveListeningEvents.length > 0) {
        $(document).on(conf.keepAliveListeningEvents, setUserActive);
      }
    }

    function uninstallUserActivityHandler() {
      if (conf.keepAliveListeningEvents.length > 0) {
        $(document).off(conf.keepAliveListeningEvents, setUserActive);
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
      if (conf.keepAlive && keepAliveTimer === undefined) {
        installUserActivityHandler();
        keepAliveTimer = window.setInterval(
          keepAliveTimerFunction,
          conf.keepAliveInterval * 60 * 1000,
        );
      }
    }

    function uninstallKeepAliveTimerHandler() {
      if (conf.keepAlive) {
        uninstallUserActivityHandler();
        if (keepAliveTimer) {
          window.clearInterval(keepAliveTimer);
          keepAliveTimer = undefined;
        }
      }
    }

    function keepAliveSessions() {
      if (isUserAuthenticated()) {
        const html =
          "<img src='" +
          platform.keepAliveURL +
          '/?' +
          random() +
          "'><img src='" +
          platformEndPoints.keepalive +
          '?' +
          random() +
          "'>";
        selectFromShadowDom()
          .find('#' + keepAliveID)
          .html(html);
        if (typeof keepAliveCallback == 'function') {
          keepAliveCallback();
        }
        setControlCookie('keepalive', new Date().getTime());
      }
    }

    function keepAliveSessionsOnInit() {
      const now = new Date().getTime();
      const lastKeepAlive = getControlCookieVal('keepalive');
      if (
        isNaN(lastKeepAlive) ||
        now - parseInt(lastKeepAlive) > conf.keepAliveInterval * 60 * 1000
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
          conf.keepAliveInterval * 60 * 1000,
      );
    }

    function initIFrameCommunication() {
      log('Preparing for communication with iframe content');

      function receiveMessage(e) {
        const allowedOrigins = ['post.ch', 'postauto.ch', 'postfinance.ch'];
        const originUrl = new URL(e.origin);
        if (allowedOrigins.includes(originUrl.host) && e.data === 'syncWidget') {
          log('PostMessage syncWidget received');
          subscribe();
        }
      }
      if (window.addEventListener) {
        window.addEventListener('message', receiveMessage);
      } else {
        window.attachEvent('onmessage', receiveMessage);
      }
    }

    function measureWidgetShowsUp() {
      if (startingTime) {
        log('Widget shows up in ' + (new Date().getTime() - startingTime) + ' [msec]');
        startingTime = undefined;
      }
    }

    function renderHiddenContainer(parentContainerSelector, containerId) {
      selectFromShadowDom()
        .find(parentContainerSelector)
        .append('<div id="' + containerId + '" style="display:none;"></div>');
    }

    function selectFromShadowDom() {
      return $(
        document
          .querySelector('swisspost-internet-header')
          .shadowRoot.querySelector('post-klp-login-widget')
          .shadowRoot.querySelector('.widget-wrapper'),
      );
    }

    function renderAnonymousWidget() {
      selectFromShadowDom()
        .find('#' + id)
        .addClass('anonymous');
      selectFromShadowDom()
        .find('#' + id)
        .attr('data-custom-focus-id', 'klp-widget');
      selectFromShadowDom()
        .find('#' + id)
        .html(
          '<div class="klp-widget-anonymous"><div class="klp-widget-anonymous__wrapper">' +
            '<a ' +
            accessKey('sign-in') +
            ' title="' +
            text('sign-in') +
            '" href="' +
            loginURL() +
            '" data-custom-focus-target="klp-widget" data-custom-focus-direction="parent" role="button"><span class="klp-widget-anonymous__text">' +
            text('sign-in') +
            '</span><svg class="ppm-svg-icon ppm-main-navigation__login-icon" focusable="false"><use xlink:href="#2064_arrow-enter"></use></svg></a>' +
            '</div></div>',
        );
      selectFromShadowDom()
        .find('#' + id)
        .on('click touch', function (e) {
          e.preventDefault();
          document.location.href = loginURL();
          return false;
        });
    }

    function renderAuthenticatedWidget() {
      selectFromShadowDom()
        .find('#' + id)
        .off('click touch');
      let info = '',
        authenticatedSessionTailNameClass = '';
      if (sessionData.userType === 'B2C') {
        authenticatedSessionTailNameClass = 'klp-widget-authenticated-session-name u_var_centered';
      } else {
        info = sessionData.company;
        authenticatedSessionTailNameClass = 'klp-widget-authenticated-session-name';
      }
      let authenticatedSectionClass = 'klp-widget-authenticated';
      if (sessionData.support) {
        authenticatedSectionClass += ' klp-widget-support';
      }
      selectFromShadowDom()
        .find('#' + id)
        .html(
          '<div class="' +
            authenticatedSectionClass +
            '">' +
            '<div class="klp-widget-authenticated-session klp-widget-menu-close">' +
            '<a href="about:blank" role="button" class="klp-widget-authenticated-session-link klp-widget__user" title="' +
            text('title-text-menu') +
            '" tabindex="' +
            tabIndex('toggle-menu') +
            '" ' +
            accessKey('toggle-menu') +
            ' data-dropdown="klp-widget-authenticated-menu" aria-expanded="false" aria-controls="authenticated-menu">' +
            '<div class="' +
            authenticatedSessionTailNameClass +
            '">' +
            sessionData.name +
            '&nbsp;' +
            sessionData.surname +
            '</div>' +
            '<span class="initials-mobile">' +
            sessionData.name.substring(0, 1) +
            sessionData.surname.substring(0, 1) +
            '</span>' +
            '<span class="notification-number"></span>' +
            '</a>' +
            getAuthenticatedMenuLinks(authenticatedSessionTailNameClass, info, sessionData) +
            '</div>' +
            '</div>',
        );
      selectFromShadowDom().find('.notification-number').css('visibility', 'hidden');
      selectFromShadowDom().find('.notification-number-detail').css('visibility', 'hidden');
      renderHiddenContainer('#' + id, keepAliveID);
      selectFromShadowDom()
        .find('#' + id + ' .klp-widget__user')
        .on('click touch', function (e) {
          e.preventDefault();
          selectFromShadowDom()
            .find('#' + id + ' .klp-widget__user')
            .focus();
          toggleMenu();
          toggleNotificationsMenu();
          return false;
        });
      selectFromShadowDom()
        .find('#' + id + ' #klp-widget-authenticated-menu-logout')
        .on('click touch', function (e) {
          e.preventDefault();
          selectFromShadowDom()
            .find('#' + id + ' #klp-widget-authenticated-menu-logout')
            .focus();
          doLogout(logoutURL());
          return false;
        });
      if (isOldChangeCompany() || isChangeUserAndProfile()) {
        setChangeAccountDialog();
      }
      setArrowKeysListeners();
    }

    function isOldChangeCompany() {
      return (
        (sessionData.userType === 'B2B' &&
          sessionData.canChangeCompany &&
          sessionData.changeUserAndProfile == null) ||
        (sessionData.changeUserAndProfile != null && sessionData.changeUserAndProfile === 'profile')
      );
    }

    function isChangeUserAndProfile() {
      return (
        sessionData.changeUserAndProfile != null &&
        sessionData.changeUserAndProfile === 'userAndProfile'
      );
    }

    function getAuthenticatedMenuLinks(authenticatedSessionTailNameClass, info, sessionData) {
      let menuList = '';
      let nameClass = 'name';
      let infoClass = 'info';
      if (menuLinks !== undefined) {
        if (authenticatedSessionTailNameClass.indexOf('centered') !== -1) {
          nameClass = 'nameCentered';
        }
        if (info.length === 0) {
          infoClass = 'infoHidden';
        }
        menuList +=
          '<li class="name-and-surname">' +
          '<div class="initials-circle">' +
          '<div class="initials-container">' +
          '<div>' +
          sessionData.name.substring(0, 1) +
          sessionData.surname.substring(0, 1) +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="nameAndInfoWrapper"><span class="' +
          nameClass +
          '">' +
          sessionData.name +
          '&nbsp;' +
          sessionData.surname +
          '</span>' +
          '<span class="' +
          infoClass +
          '">' +
          info +
          '</span></div>' +
          '</li>';

        $.each(menuLinks, function (index, item) {
          menuList +=
            '<li>' +
            '<a class="notification-link" title="' +
            item.description +
            '" href="' +
            item.url +
            '"><div class="' +
            item.iconclass +
            '"></div><div class="linkContainer">' +
            '<span class="klp-widget-notification-link-text">' +
            item.description +
            '</span></div></a>' +
            '</li>';
        });
        menuList +=
          '<li>' +
          '<a class="notification-link" title="' +
          text('title-text-notifications') +
          '" href="' +
          messagesUrl +
          '"><div class="widget_icon_notification" aria-hidden></div><div class="linkContainer">' +
          '<span class="klp-widget-notification-link-text">' +
          text('title-text-notifications') +
          '</span><span class="notification-number-detail"></span></div></a>' +
          '</li>';
      }

      const settingEnvLinks = {
        dev01: 'https://serviceint1.post.ch/kvm/app/ui',
        dev02: 'https://serviceint1.post.ch/kvm/app/ui',
        devs1: 'https://serviceint1.post.ch/kvm/app/ui',
        test: 'https://serviceint1.post.ch/kvm/app/ui',
        int01: 'https://serviceint1.post.ch/kvm/app/ui',
        int02: 'https://serviceint2.post.ch/kvm/app/ui',
        prod: 'https://service.post.ch/kvm/app/ui',
      };
      const settingsLink = `${settingEnvLinks[environment]}/settings?lang=${currentLang}`;

      menuList += `
          <li>
            <a class="notification-link" href="${settingsLink}">
              <div class="widget_icon_settings" aria-hidden></div>
              <div class="linkContainer">
                <span class="klp-widget-notification-link-text">${texts[currentLang].settings}</span>
              </div>
            </a>
          </li>
        `;

      let changeCompanyEntry = '';
      if (isOldChangeCompany()) {
        changeCompanyEntry =
          '<li>' +
          '<a id="klp-widget-authenticated-menu-changecompany" class="notification-link" tabindex="' +
          tabIndex('change-company') +
          '" ' +
          accessKey('change-company') +
          ' href="about:blank" role="button" title="' +
          text('change-company') +
          '"><div class="widget_icon_changecompany"></div><div class="linkContainer">' +
          '<span class="klp-widget-notification-link-text">' +
          text('change-company') +
          '</span></div></a>' +
          '</li>';
      } else if (isChangeUserAndProfile()) {
        changeCompanyEntry =
          '<li>' +
          '<a id="klp-widget-authenticated-menu-changecompany" class="notification-link" tabindex="' +
          tabIndex('change-account') +
          '" ' +
          accessKey('change-company') +
          ' href="about:blank" role="button" title="' +
          text('change-account') +
          '"><div class="widget_icon_changecompany"></div><div class="linkContainer">' +
          '<span class="klp-widget-notification-link-text">' +
          text('change-account') +
          '</span></div></a>' +
          '</li>';
      }
      return (
        '<div class="klp-widget-authenticated-menu" id="authenticated-menu" data-dropdown-toggler="klp-widget__user" style="display: none">' +
        '<ul>' +
        menuList +
        changeCompanyEntry +
        '<li>' +
        '<a id="klp-widget-authenticated-menu-logout" class="notification-link" tabindex="' +
        tabIndex('sign-out') +
        '" ' +
        accessKey('sign-out') +
        ' title="' +
        text('sign-out') +
        '" href="about:blank" role="button"><div class="widget_icon_logout"></div><div class="linkContainer">' +
        '<span class="klp-widget-notification-link-text">' +
        text('sign-out') +
        '</span></div></a>' +
        '</li>' +
        '</ul>' +
        '</div>'
      );
    }

    function showDocument(document, documentType) {
      switch (documentType) {
        case documentUnreadNotifications:
          renderNotificationsWidget(document);
          saveDocumentOnCache(document, documentUnreadNotifications);
          break;
        default:
          log('Unknown documentType received: ' + documentType);
      }
      if (typeof documentCallbacks[documentType] == 'function') {
        documentCallbacks[documentType](document);
      }
    }

    function removeDocument(documentType) {
      switch (documentType) {
        case documentUnreadNotifications:
          removeDocumentFromCache(documentUnreadNotifications);
          break;
        default:
          log('Unknown documentType received: ' + documentType);
      }
      if (typeof documentCallbacks[documentType] == 'function') {
        documentCallbacks[documentType](undefined);
      }
    }

    function renderNotificationsWidget(notifications) {
      if (
        notifications != null &&
        $('.notification-number').text() !== notifications.unreadNotifications
      ) {
        unreadNotifications = notifications.unreadNotifications;
        if (unreadNotifications === 0) {
          $('.notification-number').css('visibility', 'hidden');
        } else {
          $('.notification-number').css('visibility', 'visible');
        }
      }
    }

    function toggleMenu() {
      toggleDropdown(selectFromShadowDom().find('#' + id + ' .klp-widget-authenticated-menu'));
    }

    function toggleNotificationsMenu() {
      if (unreadNotifications !== 0) {
        if (unreadNotifications > 99) {
          selectFromShadowDom()
            .find('.notification-number-detail')
            .css('visibility', 'visible')
            .text('99+');
        } else {
          selectFromShadowDom()
            .find('.notification-number-detail')
            .css('visibility', 'visible')
            .text(unreadNotifications);
        }
      } else {
        selectFromShadowDom().find('.notification-number-detail').css('visibility', 'hidden');
      }
    }

    function isUserAuthenticated() {
      return typeof sessionData !== 'undefined';
    }

    function getUserType() {
      if (!isUserAuthenticated()) {
        return 'NONE';
      }
      return sessionData.userType;
    }

    function getCurrentAuthLevel() {
      if (!isUserAuthenticated()) {
        return 'NONE';
      }
      return sessionData.authLevel;
    }

    function changeLoginURL(loginURL) {
      if (loginURL !== undefined) {
        appLoginURL = loginURL;
        renderWidget();
        log('Widget appLoginURL has been replaced with ' + appLoginURL);
      }
    }

    function updateWidget(options) {
      if (options !== undefined) {
        conf = $.extend(conf, options);
        renderWidget();
      }
      log('Widget has been updated');
    }

    function login(data, ttl, callback) {
      sessionData = data;
      renderWidget();
      installKeepAliveTimerHandler();
      persistState(ttl);
      if (callback && typeof loginCallback == 'function') {
        loginCallback();
        log('loginCallback has been called: ' + loginCallback);
      }
    }

    function logout() {
      sessionData = undefined;
      address = undefined;
      removePersistedState();
      removeAllDocumentFromCache();
      renderWidget();
      uninstallKeepAliveTimerHandler();
      if (typeof logoutCallback == 'function') {
        logoutCallback();
      }
    }

    function registerEventsHandler() {
      if (eventBus) {
        eventBus.registerHandler(address, function (message, replyTo) {
          handleMessage(message);
        });
      }
    }

    function handleMessage(message) {
      log('Message received: ' + JSON.stringify(message));
      audit(message);
      retrySubscribeOnFail = false;
      switch (message.typ) {
        case 'ukn':
          if (message.sub) {
            retrySubscribeOnFail = true;
            logout();
            subscribe();
          } else {
            logout();
          }
          break;
        case 'sub':
          address = message.adr;
          login(message.data, message.ttl, false);
          openCommunication();
          break;
        case 'hi':
          login(message.data, message.ttl, true);
          removeDocumentFromCache(documentUnreadNotifications);
          break;
        case 'bye':
          logout();
          break;
        case 'doc':
          showDocument(message.doc, message.doctyp);
          break;
        case 'rem':
          removeDocument(message.doctyp);
          break;
        default:
          log('Unknown event received: ' + message.typ);
          logout();
          break;
      }
    }

    function trySubscription() {
      if (isCurrentLocationPostCh()) {
        return null != getControlCookieVal();
      } else {
        return true;
      }
    }

    function subscribe() {
      if (!address) {
        if (trySubscription()) {
          log('Subscribing to get an address');
          const startTime = new Date().getTime();
          fetch(platformEndPoints.subscribe, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
          })
            .then(message => message.json())
            .then(message => handleMessage(message))
            .catch(error => {
              log('Failed to subscribe: ' + error.message);
              logout();
              renderWidget();
            });
          logPerformanceMetric('subscribe()', new Date().getTime() - startTime);
        } else {
          log('Control cookie not found, skipping subscription');
          renderWidget();
        }
      } else {
        log('Address available, skipping subscription');
        openCommunication();
      }
    }

    function openCommunication() {
      if (!eventBus) {
        eventBus = new vertx.EventBus(platformEndPoints.eventbus, {
          debug: conf.debug,
          devel: conf.debug,
        });
        eventBus.onopen = function () {
          log('EventBus opened');
          registerEventsHandler();
          $(window).on('beforeunload', closeCommunication);
        };
        eventBus.onclose = function () {
          log('EventBus closed');
          log(
            'Communication closed with retrySubscribeOnFail=' +
              retrySubscribeOnFail +
              '. Retrying subscribe',
          );
          eventBus = null;
          $(window).off('beforeunload', closeCommunication);
          if (retrySubscribeOnFail) {
            retrySubscribeOnFail = false;
            address = undefined;
            subscribe();
          }
        };
      }
    }

    function closeCommunication() {
      if (eventBus) {
        eventBus.close();
      }
    }

    function renderWidget() {
      if (typeof sessionData !== 'undefined') {
        renderAuthenticatedWidget();
      } else {
        renderAnonymousWidget();
      }
      document.dispatchEvent(new CustomEvent('wepploginwidget_widget_ready'));
      measureWidgetShowsUp();
    }

    function init() {
      restoreState();
      subscribe();
      if (conf.keepAliveOnInit && isUserAuthenticated()) {
        keepAliveSessionsOnInit();
      }
      initIFrameCommunication();
    }

    function toggleDropdown(dropdownToToggle) {
      if (dropdownToToggle.is(':visible')) {
        selectFromShadowDom()
          .find('#' + id)
          .removeClass('bubble');
        closeDropdowns();
        return;
      }
      closeDropdowns();
      selectFromShadowDom()
        .find('.' + dropdownToToggle.attr('data-dropdown-toggler'))
        .attr('aria-expanded', true);
      selectFromShadowDom()
        .find('#' + id)
        .addClass('bubble');
      dropdownToToggle.show();
      $(document).on('click', closeDropdowns);
      if (dropdownToToggle.hasClass('klp-widget-authenticated-menu')) {
        dropdownToToggle
          .parent()
          .removeClass('klp-widget-menu-close')
          .addClass('klp-widget-menu-open');
      }
    }

    function closeDropdowns(e) {
      if (e != null) {
        if (
          selectFromShadowDom()
            .find(e.target)
            .parents('#' + id).length > 0
        ) {
          return;
        }
      }
      selectFromShadowDom().find(document).off('click', closeDropdowns);
      selectFromShadowDom()
        .find('#' + id)
        .removeClass('bubble');
      selectFromShadowDom()
        .find('#' + id + ' .klp-widget-authenticated-menu')
        .hide()
        .parent()
        .removeClass('klp-widget-menu-open')
        .addClass('klp-widget-menu-close');
      selectFromShadowDom()
        .find(
          '.' +
            selectFromShadowDom()
              .find('#' + id + ' .klp-widget-authenticated-menu')
              .attr('data-dropdown-toggler'),
        )
        .attr('aria-expanded', false);
    }

    function setArrowKeysListeners() {
      selectFromShadowDom()
        .find('.klp-widget__user')
        .on('keydown', function (event) {
          if (event.which < 37 || event.which > 40) {
            return;
          }
          event.preventDefault();
          const parent = selectFromShadowDom().find(this).parent();
          const dropdown = selectFromShadowDom().find(
            '.' + selectFromShadowDom().find(this).attr('data-dropdown'),
          );
          switch (event.which) {
            case 37:
              if (parent.prev().length) {
                parent.prev().find('a').focus();
              }
              if (dropdown.is(':visible')) {
                selectFromShadowDom().find(this).click();
              }
              break;
            case 38:
              if (dropdown.is(':visible')) {
                selectFromShadowDom().find(this).click();
              }
              break;
            case 39:
              if (parent.next().length) {
                parent.next().find('a').focus();
              }
              if (dropdown.is(':visible')) {
                selectFromShadowDom().find(this).click();
              }
              break;
            case 40:
              if (!dropdown.is(':visible')) {
                selectFromShadowDom().find(this).click();
              }
              dropdown.find('li:first a').focus();
              break;
          }
        });
      selectFromShadowDom()
        .find('.klp-widget-authenticated-menu')
        .on('keydown', 'a', function (event) {
          if (event.which < 37 || event.which > 40) {
            return;
          }
          event.preventDefault();
          const parent = selectFromShadowDom().find(this).parent();
          const dropdownToggler = selectFromShadowDom().find(
            '.' +
              selectFromShadowDom().find(this).parents('div').first().attr('data-dropdown-toggler'),
          );
          switch (event.which) {
            case 37:
            case 38:
              if (parent.prev('li').length > 0) {
                parent.prev('li').find('a').focus();
              } else {
                dropdownToggler.click().focus();
              }
              break;
            case 39:
            case 40:
              if (parent.next('li').length > 0) {
                parent.next('li').find('a').focus();
              }
              break;
          }
        });
      $('body').on('keydown', function (event) {
        if (event.which !== 27) {
          return;
        }
        closeDropdowns();
      });
    }
    init();
    return {
      keepAliveSessions: function () {
        keepAliveSessions();
      },
      isUserAuthenticated: function () {
        return isUserAuthenticated();
      },
      getUserType: function () {
        return getUserType();
      },
      getCurrentAuthLevel: function () {
        return getCurrentAuthLevel();
      },
      changeAppLoginURL: function (appLoginURL) {
        changeLoginURL(appLoginURL);
      },
      updateWidget: function (options) {
        updateWidget(options);
      },
      registerLoginCallback: function (callback) {
        log('Login callback has been registered');
        loginCallback = callback;
      },
      unregisterLoginCallback: function () {
        log('Login callback has been un-registered');
        loginCallback = undefined;
      },
      registerKeepAliveCallback: function (callback) {
        log('KeepAlive callback has been registered');
        keepAliveCallback = callback;
      },
      unregisterKeepAliveCallback: function () {
        log('KeepAlive callback has been un-registered');
        keepAliveCallback = undefined;
      },
      registerLogoutCallback: function (callback) {
        log('Logout callback has been registered');
        logoutCallback = callback;
      },
      unregisterLogoutCallback: function () {
        log('Logout callback has been un-registered');
        logoutCallback = undefined;
      },
      registerDocumentCallback: function (documentType, callback) {
        log('Document callback for documentType ' + documentType + ' has been registered');
        documentCallbacks[documentType] = callback;
      },
      unregisterDocumentCallback: function (documentType) {
        log('Document callback for documentType ' + documentType + ' has been un-registered');
        documentCallbacks[documentType] = undefined;
      },
      version: function () {
        return version;
      },
      setDebug: function (debug) {
        conf.debug = debug;
      },
    };
  };
})(jQuery);
