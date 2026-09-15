/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * $Id$
 * ------------------------------------------------------------------------------------------------
 */

import 'url-polyfill';
import jQuery from 'jquery/dist/jquery.slim';
import { keys, texts } from './texts';
import * as urls from './urls';
import {
  CONTROL_COOKIE_NAME,
  createControlCookie,
  hash,
  isCurrentLocationPostCh,
} from './control-cookie';
import { createStorage } from './storage';
import { buildEndPoints, createSessionClient } from './session-client';
import { createMessageRouter } from './message-router';
import { createDropdown } from './dropdown';
import * as markup from './markup';
import { createChangeAccountDialog } from './change-account-dialog';
import { createKeepAlive } from './keep-alive';
import { createEventBusConnection } from './event-bus-connection';
import { createNotifications, UNREAD_NOTIFICATIONS } from './notifications';

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
      address,
      sessionData,
      loginCallback,
      keepAliveCallback,
      logoutCallback,
      documentCallbacks = {},
      currentLang = 'de',
      originUrl = '',
      startingTime = new Date().getTime(),
      version = '16.01.00.01',
      platformEndPoints = buildEndPoints(platform.endPoint),
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

    originUrl = platform.selfAdminOrigin ?? getLocation(logoutURL()).origin;
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

    const labels = {
      text: key => text(key),
      accessKey: key => accessKey(key),
      tabIndex: key => tabIndex(key),
    };
    const controlCookie = createControlCookie({ log: message => log(message) });
    const storage = createStorage({ log: message => log(message) });
    const notifications = createNotifications({
      log: message => log(message),
      selectFromShadowDom: () => selectFromShadowDom(),
      getDocumentCallbacks: () => documentCallbacks,
      saveDocumentOnCache: (document, documentType) => saveDocumentOnCache(document, documentType),
      removeDocumentFromCache: documentType => removeDocumentFromCache(documentType),
    });
    const connection = createEventBusConnection({
      url: platformEndPoints.eventbus,
      getDebug: () => conf.debug,
      log: message => log(message),
      getAddress: () => address,
      onMessage: message => handleMessage(message),
      onReconnect: () => {
        address = undefined;
        subscribe();
      },
    });
    const keepAlive = createKeepAlive({
      getConf: () => conf,
      log: message => log(message),
      isUserAuthenticated: () => isUserAuthenticated(),
      ping: () => pingKeepAliveEndpoints(),
      getControlCookieVal: scope => getControlCookieVal(scope),
      setControlCookie: (scope, val) => setControlCookie(scope, val),
    });
    const dropdown = createDropdown({ id, selectFromShadowDom: () => selectFromShadowDom() });
    const changeAccountDialogView = createChangeAccountDialog({
      id,
      selectFromShadowDom: () => selectFromShadowDom(),
      labels: labels,
      getSessionData: () => sessionData,
      isChangeUserAndProfile: () => isChangeUserAndProfile(),
      logoutURL: () => logoutURL(),
      changeCompanyURL: () => changeCompanyURL(),
      doLogout: logoutUrl => doLogout(logoutUrl),
    });
    const sessionClient = createSessionClient({
      endPoints: platformEndPoints,
      log: message => log(message),
      logPerformanceMetric: (name, time) => logPerformanceMetric(name, time),
    });
    const messageRouter = createMessageRouter({
      log: message => log(message),
      actions: {
        audit: message => audit(message),
        setRetrySubscribeOnFail: value => connection.setRetryOnFail(value),
        setAddress: value => (address = value),
        login: (data, ttl, callback) => login(data, ttl, callback),
        logout: () => logout(),
        subscribe: () => subscribe(),
        openCommunication: () => openCommunication(),
        removeNotificationsFromCache: () => removeDocumentFromCache(UNREAD_NOTIFICATIONS),
        showDocument: (document, documentType) => showDocument(document, documentType),
        removeDocument: documentType => removeDocument(documentType),
      },
    });

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
      sessionClient.audit(address, message);
    }

    function logPerformanceMetric(methodName, executionTime) {
      if (conf.debug && window.console && window.console.log) {
        log('Method ' + methodName + ' executed on ' + executionTime + ' ms');
      }
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

    function loginURL() {
      return urls.loginURL(appLoginURL, { app: app, service: service, lang: currentLang });
    }

    function logoutURL() {
      return urls.logoutURL(platform.logoutURL, {
        app: app,
        lang: currentLang,
        logoutTargetURL: conf.logoutTargetURL,
      });
    }

    function doLogout(logoutUrl) {
      log('Clearing cache and sessionData before starting the logout process');
      sessionData = undefined;
      removePersistedState();
      log('Proceeding to logoutUrl with following path ' + logoutUrl);
      window.location.href = logoutUrl;
    }

    function setChangeAccountDialog() {
      changeAccountDialogView.setChangeAccountDialog();
    }

    function changeCompanyURL() {
      return urls.changeCompanyURL(platform.logoutURL, {
        app: app,
        lang: currentLang,
        logoutTargetURL: conf.logoutTargetURL,
      });
    }

    function persistState(ttl) {
      if (storage.persistState(ttl)) {
        setControlCookie('hash', encodeURIComponent(hash(sessionData)));
      }
    }

    function removePersistedState() {
      if (storage.removePersistedState()) {
        removeControlCookie();
      }
    }

    function getControlCookieVal(scope) {
      return controlCookie.getControlCookieVal(scope);
    }

    function setControlCookie(scope, val) {
      controlCookie.setControlCookie(scope, val);
    }

    function removeControlCookie() {
      controlCookie.removeControlCookie({ keepForRetry: connection.getRetryOnFail() });
    }

    function saveDocumentOnCache(document, documentType) {
      storage.saveDocumentOnCache(document, documentType);
    }

    function removeAllDocumentFromCache() {
      removeDocumentFromCache(UNREAD_NOTIFICATIONS);
    }

    function removeDocumentFromCache(documentType) {
      storage.removeDocumentFromCache(documentType);
    }

    /** Refreshes the session on the portal and on the platform, then tells whoever asked. */
    function pingKeepAliveEndpoints() {
      selectFromShadowDom()
        .find('#' + keepAliveID)
        .html(sessionClient.keepAliveMarkup(platform.keepAliveURL));
      if (typeof keepAliveCallback == 'function') {
        keepAliveCallback();
      }
    }

    function keepAliveSessions() {
      keepAlive.keepAliveSessions();
    }

    function installKeepAliveTimerHandler() {
      keepAlive.installKeepAliveTimerHandler();
    }

    function uninstallKeepAliveTimerHandler() {
      keepAlive.uninstallKeepAliveTimerHandler();
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
        .html(markup.anonymousWidget({ labels: labels, loginUrl: loginURL() }));
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
          markup.authenticatedWidget({
            labels: labels,
            sessionData: sessionData,
            sectionClass: authenticatedSectionClass,
            nameClass: authenticatedSessionTailNameClass,
            menu: getAuthenticatedMenuLinks(authenticatedSessionTailNameClass, info, sessionData),
          }),
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
      return markup.isOldChangeCompany(sessionData);
    }

    function isChangeUserAndProfile() {
      return markup.isChangeUserAndProfile(sessionData);
    }

    function getAuthenticatedMenuLinks(authenticatedSessionTailNameClass, info, sessionData) {
      return markup.authenticatedMenu({
        labels: labels,
        sessionData: sessionData,
        nameClass: authenticatedSessionTailNameClass,
        info: info,
        menuLinks: menuLinks,
        messagesUrl: messagesUrl,
        environment: environment,
        lang: currentLang,
      });
    }

    function showDocument(document, documentType) {
      notifications.showDocument(document, documentType);
    }

    function removeDocument(documentType) {
      notifications.removeDocument(documentType);
    }

    function toggleMenu() {
      toggleDropdown(selectFromShadowDom().find('#' + id + ' .klp-widget-authenticated-menu'));
    }

    function toggleNotificationsMenu() {
      notifications.toggleNotificationsMenu();
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

    function handleMessage(message) {
      messageRouter(message);
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
          sessionClient
            .subscribe({ hasControlCookie: document.cookie.includes(CONTROL_COOKIE_NAME + '=') })
            .then(message => handleMessage(message))
            .catch(error => {
              log('Failed to subscribe: ' + error.message);
              if (globalThis.console && globalThis.console.warn) {
                console.warn('[klp-login-widget] subscribe failed', {
                  errorType: error.constructor ? error.constructor.name : typeof error,
                  errorMessage: error.message,
                  isTypeError: error instanceof TypeError,
                  hasNctrl: document.cookie.includes(CONTROL_COOKIE_NAME + '='),
                  userAgent: navigator.userAgent,
                  url: globalThis.location.href,
                });
              }
              if (error instanceof TypeError) {
                // Fetch cancelled by browser navigation, not an auth failure.
                // Do not call logout(): this would delete NCTRL and prevent recovery.
                log('Subscribe cancelled by navigation: preserving NCTRL, skipping logout.');
                renderWidget();
              } else {
                logout();
                renderWidget();
              }
            });
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
      connection.openCommunication();
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
      subscribe();
      if (conf.keepAliveOnInit && isUserAuthenticated()) {
        keepAlive.keepAliveSessionsOnInit();
      }
      initIFrameCommunication();
    }

    function toggleDropdown(dropdownToToggle) {
      dropdown.toggleDropdown(dropdownToToggle);
    }

    function setArrowKeysListeners() {
      dropdown.setArrowKeysListeners();
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
