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

/**
 * Skips any parameter whose name already occurs in the login URL. Note that it searches the whole
 * URL, not its query keys, so a host or path containing "app" or "lang" suppresses that parameter.
 */
export function buildLoginParameters(appLoginURL, params) {
  let parameters = '';

  for (const [key, value] of Object.entries(params)) {
    if (appLoginURL.toLowerCase().indexOf(key.toLowerCase()) === -1) {
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
