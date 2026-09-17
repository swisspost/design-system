/**
 * URL assembly for the KLP session, ported from the v9 widget. Pure string work, no widget state.
 */

export interface KlpLogoutParams {
  app: string;
  lang: string;
  logoutTargetURL: string;
}

/** Appends a query string, picking the separator from whatever the base already carries. */
export function join(base: string, query?: string): string {
  if (query === undefined) {
    return base;
  }

  return base.includes('?') ? `${base}&${query}` : `${base}?${query}`;
}

/** Query parameter names already present in the url, lowercased for a case-insensitive compare. */
function existingParamNames(appLoginURL: string): string[] {
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
export function buildLoginParameters(
  appLoginURL: string,
  params: Record<string, string>,
): string | undefined {
  const present = existingParamNames(appLoginURL);

  const parameters = Object.entries(params)
    .filter(([key]) => !present.includes(key.toLowerCase()))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return parameters.length > 0 ? parameters : undefined;
}

export function loginURL(appLoginURL: string, params: Record<string, string>): string {
  return join(appLoginURL, buildLoginParameters(appLoginURL, params));
}

export function logoutURL(base: string, { app, lang, logoutTargetURL }: KlpLogoutParams): string {
  const serviceForLogout = 'klp';
  const inIframe = false;

  return join(
    base,
    `app=${app}&lang=${lang}&service=${serviceForLogout}&inIframe=${inIframe}&logoutTargetURL=${logoutTargetURL}`,
  );
}

export function changeCompanyURL(base: string, params: KlpLogoutParams): string {
  return `${logoutURL(base, params)}&changecompany=true`;
}
