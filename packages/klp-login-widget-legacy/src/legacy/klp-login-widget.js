/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * $Id$
 * ------------------------------------------------------------------------------------------------
 */

import 'url-polyfill';
import jQuery from 'jquery/dist/jquery.slim';
import { vertx } from './vertx-eventbus';
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

    const controlCookie = createControlCookie({ log: message => log(message) });
    const storage = createStorage({ log: message => log(message) });
    const dropdown = createDropdown({ id, selectFromShadowDom: () => selectFromShadowDom() });
    const sessionClient = createSessionClient({
      endPoints: platformEndPoints,
      log: message => log(message),
      logPerformanceMetric: (name, time) => logPerformanceMetric(name, time),
    });
    const messageRouter = createMessageRouter({
      log: message => log(message),
      actions: {
        audit: message => audit(message),
        setRetrySubscribeOnFail: value => (retrySubscribeOnFail = value),
        setAddress: value => (address = value),
        login: (data, ttl, callback) => login(data, ttl, callback),
        logout: () => logout(),
        subscribe: () => subscribe(),
        openCommunication: () => openCommunication(),
        removeNotificationsFromCache: () => removeDocumentFromCache(documentUnreadNotifications),
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
      return urls.changeCompanyURL(platform.logoutURL, {
        app: app,
        lang: currentLang,
        logoutTargetURL: conf.logoutTargetURL,
      });
    }

    function setUserActive() {
      isUserActive = true;
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
      controlCookie.removeControlCookie({ keepForRetry: retrySubscribeOnFail });
    }

    function saveDocumentOnCache(document, documentType) {
      storage.saveDocumentOnCache(document, documentType);
    }

    function removeAllDocumentFromCache() {
      removeDocumentFromCache(documentUnreadNotifications);
    }

    function removeDocumentFromCache(documentType) {
      storage.removeDocumentFromCache(documentType);
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
        selectFromShadowDom()
          .find('#' + keepAliveID)
          .html(sessionClient.keepAliveMarkup(platform.keepAliveURL));
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
      subscribe();
      if (conf.keepAliveOnInit && isUserAuthenticated()) {
        keepAliveSessionsOnInit();
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
