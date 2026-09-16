/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * URL assembly, lifted from the v9 widget. Pure string work, no widget state.
 * ------------------------------------------------------------------------------------------------
 */

/** Appends a query string, picking the separator from whatever the base already carries. */
export function join(base, query) {
  if (query === undefined) {
    return base;
  }
  if (base.indexOf('?') === -1) {
    return base + '?' + query;
  } else {
    return base + '&' + query;
  }
}

/** Query parameter names already present in the url, lowercased for a case-insensitive compare. */
function existingParamNames(appLoginURL) {
  const query = appLoginURL.split('#')[0].split('?')[1];
  if (!query) {
    return [];
  }
  return query
    .split('&')
    .map(pair => pair.split('=')[0].toLowerCase())
    .filter(Boolean);
}

/** Skips any parameter the login URL already carries, so an explicit value is never overridden. */
export function buildLoginParameters(appLoginURL, params) {
  const present = existingParamNames(appLoginURL);
  let parameters = '';

  for (const [key, value] of Object.entries(params)) {
    if (present.indexOf(key.toLowerCase()) === -1) {
      if (parameters.length > 0) {
        parameters += '&';
      }
      parameters += key + '=' + value;
    }
  }

  return parameters.length > 0 ? parameters : undefined;
}

export function loginURL(appLoginURL, params) {
  return join(appLoginURL, buildLoginParameters(appLoginURL, params));
}

export function logoutURL(base, { app, lang, logoutTargetURL }) {
  const serviceForLogout = 'klp';
  const inIframe = false;

  return join(
    base,
    'app=' +
      app +
      '&lang=' +
      lang +
      '&service=' +
      serviceForLogout +
      '&inIframe=' +
      inIframe +
      '&logoutTargetURL=' +
      logoutTargetURL,
  );
}

export function changeCompanyURL(base, params) {
  return logoutURL(base, params) + '&changecompany=true';
}
