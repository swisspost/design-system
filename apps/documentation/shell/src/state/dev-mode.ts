import { DEV_MODE_DEFAULT } from '../config';

/** Same param and storage key as the old manager, so existing links and stored choices keep working. */
const DEV_MODE_KEY = 'devModeEnabled';

/**
 * Reads dev mode from the `?devModeEnabled=true|false` param (and stores it) or from local storage.
 * Returns the URL without the param, so it does not stick to every page.
 */
export function readDevMode(url: URL): { devMode: boolean; url: URL } {
  const param = url.searchParams.get(DEV_MODE_KEY);
  const cleanUrl = new URL(url);
  let value: string | null;

  if (param === null) {
    value = load();
  } else {
    value = param === 'true' ? 'true' : 'false';
    store(value);
    cleanUrl.searchParams.delete(DEV_MODE_KEY);
  }

  // 'development' and 'production' are legacy values written by older versions of the manager
  const devMode = value === null ? DEV_MODE_DEFAULT : value === 'true' || value === 'development';

  return { devMode, url: cleanUrl };
}

function load(): string | null {
  try {
    return localStorage.getItem(DEV_MODE_KEY);
  } catch {
    return null;
  }
}

function store(value: string) {
  try {
    localStorage.setItem(DEV_MODE_KEY, value);
  } catch {
    // storage may be unavailable (e.g. privacy mode); dev mode then only lasts for this page load
  }
}
