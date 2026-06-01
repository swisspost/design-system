import {
  Environment,
  PortalConfig,
  LocalizedConfig,
  LocalizedConfigParameters,
} from '@/models/general.model';
import { state } from '@/data/store';
import { getUserLang } from './language.service';

// Prevent double requests
let request: Promise<PortalConfig> | null = null;

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
 * @param language [optional] Preferred language
 * @returns Localized config object
 */
export const getLocalizedConfig = async ({
  projectId,
  environment,
  language,
}: LocalizedConfigParameters): Promise<LocalizedConfig> => {
  const ppmConfig = getPPMConfig();
  let localizedConfig: LocalizedConfig;
  let config: PortalConfig | null = null;
  let lang: string | undefined;

  if (ppmConfig) {
    localizedConfig = ppmConfig;
    lang = document.documentElement.lang;
  } else {
    if (request == null) {
      request = fetchConfig(projectId, environment);
    }

    config = await request;
    lang = getUserLang(Object.keys(config), language);

    if (lang === undefined) {
      throw new Error('Internet Header: unable to determine current language');
    }

    // Clone config for more predictable state updates
    localizedConfig = { ...config[lang] };
  }

  // Set the new language choice
  state.currentLanguage = lang;

  return localizedConfig;
};

/**
 * Fetch the general config based on project id
 *
 * @returns Promise for Post Portal general config
 */
export const fetchConfig = async (
  projectId: string,
  environment: Environment,
): Promise<PortalConfig> => {
  // Check if project id is sanitized
  if (!isValidProjectId(projectId)) {
    throw new Error(`Internet Header: invalid project id "${projectId}"`);
  }

  if (projectId === 'test') {
    environment = 'int01';
  }

  const url = generateConfigUrl(projectId, environment);

  // Get the config if cache is invalid
  try {
    const res = await fetch(url);
    return (await res.json()) as PortalConfig;
  } catch (error) {
    throw new Error(`Internet Header: fetching config failed. ${error.message}`);
  }
};

/**
 * Generate a URL with all necessary query params to get the configuration.
 * Project id "test" will return a test configuration
 * @param projectId string
 * @param environment int01, int02 or prod
 * @returns URL pointing to the project config
 */
export const generateConfigUrl = (projectId: string, environment: Environment): string => {
  if (projectId === 'test') return 'assets/config/test-configuration.json';

  const parsedEnvironment = environment.toLowerCase();
  const isProd = parsedEnvironment === 'prod';
  const host = `https://${isProd ? 'www' : 'int'}.post.ch`;
  try {
    // Use URL to validate the generated URL
    return new URL(
      `${host}/api/headerjs/Json?serviceid=${encodeURIComponent(projectId)}${
        !isProd ? '&environment=' + parsedEnvironment : ''
      }`,
    ).toString();
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
