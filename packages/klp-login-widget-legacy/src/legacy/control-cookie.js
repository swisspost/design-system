/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The NCTRL cookie, lifted from the v9 widget. It is a cross-subdomain flag written on post.ch
 * that carries two colon-separated slots: a hash of the session, and the last keepalive stamp.
 * The widget uses its mere presence to decide whether subscribing is worth the round trip.
 * ------------------------------------------------------------------------------------------------
 */

export const CONTROL_COOKIE_NAME = 'NCTRL';
export const CONTROL_COOKIE_DOMAIN = 'post.ch';

const controlCookieDomainRegEx = new RegExp(CONTROL_COOKIE_DOMAIN + '$');
const controlCookieRegEx = new RegExp(CONTROL_COOKIE_NAME + '=([^;]+)');

/** The cookie is written for post.ch, so anywhere else the widget cannot read its own state. */
export function isCurrentLocationPostCh() {
  return controlCookieDomainRegEx.test(window.location.hostname);
}

export function hash(s) {
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

export function createControlCookie({ log = () => {} } = {}) {
  function getControlCookieVal(scope) {
    const cookieData = controlCookieRegEx.exec(document.cookie);
    if (cookieData != null) {
      const values = decodeURIComponent(cookieData[1]).split(':');
      switch (scope) {
        case 'hash':
          return values[0];
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
          CONTROL_COOKIE_NAME +
          '=' +
          val +
          ':' +
          getControlCookieVal('keepalive') +
          '; Path=/; domain=' +
          CONTROL_COOKIE_DOMAIN +
          sameSiteNoneSecure +
          '; Secure';
        break;
      case 'keepalive':
        document.cookie =
          CONTROL_COOKIE_NAME +
          '=' +
          getControlCookieVal('hash') +
          ':' +
          val +
          '; Path=/; domain=' +
          CONTROL_COOKIE_DOMAIN +
          sameSiteNoneSecure +
          '; Secure';
        break;
      default:
        document.cookie =
          CONTROL_COOKIE_NAME +
          '=' +
          val +
          '; Path=/; domain=' +
          CONTROL_COOKIE_DOMAIN +
          sameSiteNoneSecure +
          '; Secure';
        break;
    }
  }

  /** A pending resubscribe parks the marker on the cookie instead of expiring it. */
  function removeControlCookie({ keepForRetry }) {
    if (keepForRetry) {
      document.cookie =
        CONTROL_COOKIE_NAME + '=' + 'sub' + '; Path=/; domain=' + CONTROL_COOKIE_DOMAIN;
      log('Control cookie set to sub');
    } else {
      document.cookie =
        CONTROL_COOKIE_NAME +
        '=' +
        '' +
        '; Path=/; Expires=Wed, 01 Apr 2014 01:00:00 GMT; domain=' +
        CONTROL_COOKIE_DOMAIN +
        '; Secure';
      log('Control cookie removed');
    }
  }

  return { getControlCookieVal, setControlCookie, removeControlCookie };
}
