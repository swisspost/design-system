/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * Every string of HTML the widget writes into its shadow root.
 *
 * Nothing here touches the DOM or the session: the markup is a function of the session data and
 * of the label helpers, and the caller decides where to put it. The interpolated values come from
 * the platform's own session payload, not from user input.
 * ------------------------------------------------------------------------------------------------
 */

/** The account settings app is deployed per stage and the widget has to guess which one it faces. */
const SETTINGS_URLS = {
  dev01: 'https://serviceint1.post.ch/kvm/app/ui',
  dev02: 'https://serviceint1.post.ch/kvm/app/ui',
  devs1: 'https://serviceint1.post.ch/kvm/app/ui',
  test: 'https://serviceint1.post.ch/kvm/app/ui',
  int01: 'https://serviceint1.post.ch/kvm/app/ui',
  int02: 'https://serviceint2.post.ch/kvm/app/ui',
  prod: 'https://service.post.ch/kvm/app/ui',
};

export function settingsURL(environment, lang) {
  return `${SETTINGS_URLS[environment]}/settings?lang=${lang}`;
}

/**
 * B2B users who may switch company, plus the legacy profile switch. Kept as two predicates
 * because the menu entry they produce carries a different label and tab index.
 */
export function isOldChangeCompany(sessionData) {
  return (
    (sessionData.userType === 'B2B' &&
      sessionData.canChangeCompany &&
      sessionData.changeUserAndProfile == null) ||
    (sessionData.changeUserAndProfile != null && sessionData.changeUserAndProfile === 'profile')
  );
}

export function isChangeUserAndProfile(sessionData) {
  return (
    sessionData.changeUserAndProfile != null &&
    sessionData.changeUserAndProfile === 'userAndProfile'
  );
}

export function anonymousWidget({ labels, loginUrl }) {
  return (
    '<div class="klp-widget-anonymous"><div class="klp-widget-anonymous__wrapper">' +
    '<a ' +
    labels.accessKey('sign-in') +
    ' title="' +
    labels.text('sign-in') +
    '" href="' +
    loginUrl +
    '" data-custom-focus-target="klp-widget" data-custom-focus-direction="parent" role="button"><span class="klp-widget-anonymous__text">' +
    labels.text('sign-in') +
    '</span><svg class="ppm-svg-icon ppm-main-navigation__login-icon" focusable="false"><use xlink:href="#2064_arrow-enter"></use></svg></a>' +
    '</div></div>'
  );
}

export function authenticatedWidget({ labels, sessionData, sectionClass, nameClass, menu }) {
  return (
    '<div class="' +
    sectionClass +
    '">' +
    '<div class="klp-widget-authenticated-session klp-widget-menu-close">' +
    '<a href="about:blank" role="button" class="klp-widget-authenticated-session-link klp-widget__user" title="' +
    labels.text('title-text-menu') +
    '" tabindex="' +
    labels.tabIndex('toggle-menu') +
    '" ' +
    labels.accessKey('toggle-menu') +
    ' data-dropdown="klp-widget-authenticated-menu" aria-expanded="false" aria-controls="authenticated-menu">' +
    '<div class="' +
    nameClass +
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
    menu +
    '</div>' +
    '</div>'
  );
}

export function authenticatedMenu({
  labels,
  sessionData,
  nameClass: authenticatedSessionTailNameClass,
  info,
  menuLinks,
  messagesUrl,
  environment,
  lang,
}) {
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

    menuLinks.forEach(item => {
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
      labels.text('title-text-notifications') +
      '" href="' +
      messagesUrl +
      '"><div class="widget_icon_notification" aria-hidden></div><div class="linkContainer">' +
      '<span class="klp-widget-notification-link-text">' +
      labels.text('title-text-notifications') +
      '</span><span class="notification-number-detail"></span></div></a>' +
      '</li>';
  }

  menuList += `
          <li>
            <a class="notification-link" href="${settingsURL(environment, lang)}">
              <div class="widget_icon_settings" aria-hidden></div>
              <div class="linkContainer">
                <span class="klp-widget-notification-link-text">${labels.text('settings')}</span>
              </div>
            </a>
          </li>
        `;

  let changeCompanyEntry = '';
  if (isOldChangeCompany(sessionData)) {
    changeCompanyEntry = changeAccountEntry({
      labels,
      tabIndexKey: 'change-company',
      labelKey: 'change-company',
    });
  } else if (isChangeUserAndProfile(sessionData)) {
    changeCompanyEntry = changeAccountEntry({
      labels,
      tabIndexKey: 'change-account',
      labelKey: 'change-account',
    });
  }

  return (
    '<div class="klp-widget-authenticated-menu" id="authenticated-menu" data-dropdown-toggler="klp-widget__user" style="display: none">' +
    '<ul>' +
    menuList +
    changeCompanyEntry +
    '<li>' +
    '<a id="klp-widget-authenticated-menu-logout" class="notification-link" tabindex="' +
    labels.tabIndex('sign-out') +
    '" ' +
    labels.accessKey('sign-out') +
    ' title="' +
    labels.text('sign-out') +
    '" href="about:blank" role="button"><div class="widget_icon_logout"></div><div class="linkContainer">' +
    '<span class="klp-widget-notification-link-text">' +
    labels.text('sign-out') +
    '</span></div></a>' +
    '</li>' +
    '</ul>' +
    '</div>'
  );
}

/** Both flavours of the switch entry differ only in which label and tab index they pick up. */
function changeAccountEntry({ labels, tabIndexKey, labelKey }) {
  return (
    '<li>' +
    '<a id="klp-widget-authenticated-menu-changecompany" class="notification-link" tabindex="' +
    labels.tabIndex(tabIndexKey) +
    '" ' +
    labels.accessKey('change-company') +
    ' href="about:blank" role="button" title="' +
    labels.text(labelKey) +
    '"><div class="widget_icon_changecompany"></div><div class="linkContainer">' +
    '<span class="klp-widget-notification-link-text">' +
    labels.text(labelKey) +
    '</span></div></a>' +
    '</li>'
  );
}
