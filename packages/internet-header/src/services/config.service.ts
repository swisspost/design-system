import { Environment, LocalizedConfig, LocalizedConfigParameters } from '@/models/general.model';
import { state } from '@/data/store';
import { getUserLang } from './language.service';

// Dedupes concurrent requests for the same projectId + environment + language.
// Entries are removed once settled, so a new language switch always fetches fresh.
const inFlightRequests = new Map<string, Promise<LocalizedConfig>>();

const getPPMConfig = (): LocalizedConfig | null => {
  const ppmConfigScript = document.querySelector('#PPM_HEADER_DATA');

  if (ppmConfigScript?.textContent != null) {
    return JSON.parse(ppmConfigScript.textContent);
  }

  return null;
};

/**
 * Get a localized config object
 *
 * @param projectId String identifying the project
 * @param environment Target environment
 * @param language [optional] Preferred language
 * @returns Localized config object
 */
export const getLocalizedConfig = async ({
  projectId,
  environment,
  language,
}: LocalizedConfigParameters): Promise<LocalizedConfig> => {
  const ppmConfig = getPPMConfig();

  if (ppmConfig) {
    const lang = document.documentElement.lang;
    state.currentLanguage = lang;
    return ppmConfig;
  }

  const lang = getUserLang(language);
  const cacheKey = `${projectId}-${environment}-${lang}`;

  let configPromise = inFlightRequests.get(cacheKey);

  if (configPromise == null) {
    configPromise = fetchConfig(projectId, environment, lang).finally(() => {
      inFlightRequests.delete(cacheKey);
    });
    inFlightRequests.set(cacheKey, configPromise);
  }

  // Clone config for more predictable state updates
  const localizedConfig = { ...(await configPromise) };

  // Set the new language choice
  state.currentLanguage = lang;

  return localizedConfig;
};

/**
 * Fetch the config for a project, in a given language
 *
 * @param projectId String identifying the project
 * @param environment Target environment
 * @param lang Currently selected language
 * @returns Promise for a single-language config object
 */
export const fetchConfig = async (
  projectId: string,
  environment: Environment,
  lang: string,
): Promise<LocalizedConfig> => {
  // Check if project id is sanitized
  if (!isValidProjectId(projectId)) {
    throw new Error(`Internet Header: invalid project id "${projectId}"`);
  }

  if (projectId === 'test') {
    environment = 'int01';
  }

  let lastError: unknown;

  for (const host of getConfigHosts(environment)) {
    const url = generateConfigUrl(projectId, environment, lang, host);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return (await res.json()) as LocalizedConfig;
    } catch (error) {
      lastError = error;
      console.warn(
        `Warning: Internet Header: API origin "${host}" not yet available! Falling back to the temporary origin until main origin is up and running.`,
      );
    }
  }

  throw new Error(`Internet Header: fetching config failed. ${(lastError as Error)?.message}`);
};

/**
 * Hosts to try, in order of preference.
 * On prod, site.post.ch is a temporary fallback until www.post.ch serves the config.
 */
const getConfigHosts = (environment: Environment): string[] => {
  const isProd = environment.toUpperCase() === 'PROD';

  return isProd
    ? ['https://www.post.ch', 'https://site.post.ch']
    : ['https://int.post.ch', 'https://int.site.post.ch'];
};

/**
 * Generate a URL with all necessary query params to get the configuration.
 * Project id "test" will return a test configuration
 * @param projectId string
 * @param environment int01, int02 or prod
 * @param lang currently selected language
 * @param host base host to request the config from
 * @returns URL pointing to the project config
 */
export const generateConfigUrl = (
  projectId: string,
  environment: Environment,
  lang: string,
  host: string = getConfigHosts(environment)[0],
): string => {
  if (projectId === 'test') return 'assets/config/test-configuration.json';

  const parsedEnvironment = environment.toUpperCase();
  const parsedLang = lang.toLowerCase();

  try {
    const query = new URLSearchParams({
      serviceId: projectId,
      environment: parsedEnvironment,
      lang: parsedLang,
    }).toString();

    // Use URL to validate the generated URL
    return new URL(`${host}/api/header?${query}`).toString();
  } catch (error) {
    throw new Error(`Internet Header: Config URL is invalid.`);
  }
};

/**
 * Check if project id contains only URL safe characters
 *
 * @param projectId Project ID string
 * @returns The valid project id
 */
export const isValidProjectId = (projectId: string): boolean => {
  return projectId !== '' && projectId.length > 0 && /^[a-zA-Z][\w-]*[a-zA-Z0-9]$/.test(projectId);
};
