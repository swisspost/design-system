/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * Putting the widget on the page: which of the two bars to draw, and what to hook up afterwards.
 *
 * There are only two states worth drawing, anonymous and authenticated, and the widget swaps
 * between them wholesale. That is why every listener has to be attached again after each render,
 * and why the anonymous bar starts by removing the handlers the authenticated one installed.
 * ------------------------------------------------------------------------------------------------
 */

import jQuery from 'jquery/dist/jquery.slim';
import * as markup from './markup';

const $ = jQuery;

/**
 * The widget lives two shadow roots deep, inside the internet header. Everything it draws is
 * looked up through here, because a plain document query would never see it.
 */
export function selectFromShadowDom() {
  return $(
    document
      .querySelector('swisspost-internet-header')
      .shadowRoot.querySelector('post-klp-login-widget')
      .shadowRoot.querySelector('.widget-wrapper'),
  );
}

export function createView({
  id,
  keepAliveID,
  labels,
  getSessionData,
  getLang,
  menuLinks,
  messagesUrl,
  environment,
  loginURL,
  logoutURL,
  doLogout,
  toggleDropdown,
  toggleNotificationsMenu,
  setChangeAccountDialog,
  setArrowKeysListeners,
  onRendered,
}) {
  function renderWidget() {
    if (typeof getSessionData() !== 'undefined') {
      renderAuthenticatedWidget();
    } else {
      renderAnonymousWidget();
    }

    document.dispatchEvent(new CustomEvent('wepploginwidget_widget_ready'));
    onRendered();
  }

  function renderHiddenContainer(parentContainerSelector, containerId) {
    selectFromShadowDom()
      .find(parentContainerSelector)
      .append('<div id="' + containerId + '" style="display:none;"></div>');
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

    // The whole bar is clickable, not just the link inside it.
    selectFromShadowDom()
      .find('#' + id)
      .on('click touch', function (e) {
        e.preventDefault();
        document.location.href = loginURL();
        return false;
      });
  }

  function renderAuthenticatedWidget() {
    const sessionData = getSessionData();

    // Drops the anonymous bar's click handler, which would otherwise send the user to login.
    selectFromShadowDom()
      .find('#' + id)
      .off('click touch');

    let info = '';
    let nameClass = '';
    if (sessionData.userType === 'B2C') {
      // Private customers have no company line, so the name is centred on its own.
      nameClass = 'klp-widget-authenticated-session-name u_var_centered';
    } else {
      info = sessionData.company;
      nameClass = 'klp-widget-authenticated-session-name';
    }

    let sectionClass = 'klp-widget-authenticated';
    if (sessionData.support) {
      sectionClass += ' klp-widget-support';
    }

    selectFromShadowDom()
      .find('#' + id)
      .html(
        markup.authenticatedWidget({
          labels: labels,
          sessionData: sessionData,
          sectionClass: sectionClass,
          nameClass: nameClass,
          menu: markup.authenticatedMenu({
            labels: labels,
            sessionData: sessionData,
            nameClass: nameClass,
            info: info,
            menuLinks: menuLinks,
            messagesUrl: messagesUrl,
            environment: environment,
            lang: getLang(),
          }),
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

    if (markup.isOldChangeCompany(sessionData) || markup.isChangeUserAndProfile(sessionData)) {
      setChangeAccountDialog();
    }

    setArrowKeysListeners();
  }

  function toggleMenu() {
    toggleDropdown(selectFromShadowDom().find('#' + id + ' .klp-widget-authenticated-menu'));
  }

  return { renderWidget };
}
