import {
  Environment,
  IPortalConfig,
  ILocalizedConfig,
  ICustomConfig,
  ILocalizedCustomConfig,
  LocalizedConfigParameters,
} from '../models/general.model';
import { NavMainEntity } from '../models/header.model';
import { getUserLang, persistLanguageChoice } from './language.service';
import { uniqueId } from '../utils/utils';
import { markActiveRoute } from './route.service';

// Prevent double requests
let request: Promise<IPortalConfig> | null = null;

// Cache the original os flyout to use it for updates
let osFlyoutCache: NavMainEntity | null = null;

const getPPMConfig = (): ILocalizedConfig | null => {
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
  cookieKey,
  localStorageKey,
  activeRouteProp,
  localizedCustomConfig,
  osFlyoutOverrides,
}: LocalizedConfigParameters): Promise<ILocalizedConfig> => {
  const ppmConfig = getPPMConfig();
  let localizedConfig: ILocalizedConfig;
  let config: IPortalConfig | null = null;
  let lang: string | undefined;

  if (ppmConfig) {
    localizedConfig = ppmConfig;
    lang = document.documentElement.lang;
  } else {
    if (request == null) {
      request = fetchConfig(projectId, environment);
    }

    config = await request;
    lang = getUserLang(Object.keys(config), language, localStorageKey, cookieKey);

    if (lang === undefined) {
      throw new Error('Internet Header: unable to determine current language');
    }

    // Clone config for more predictable state updates
    localizedConfig = { ...config[lang] };
  }

  // Merge custom config with portal config
  if (localizedCustomConfig) {
    const header = localizedCustomConfig?.header?.navMain
      ? {
          ...localizedConfig.header,
          navMain: [...localizedConfig.header.navMain, ...localizedCustomConfig.header.navMain],
        }
      : localizedConfig.header;
    localizedConfig = {
      ...localizedConfig,
      header,
    };
  }

  // Add entries to flyout_os
  if (osFlyoutOverrides)
    localizedConfig.header.navMain = mergeOsFlyoutOverrides(localizedConfig, osFlyoutOverrides);

  // Mark active route
  if (activeRouteProp != null)
    localizedConfig.header.navMain = markActiveRoute(
      localizedConfig.header.navMain,
      activeRouteProp,
    );

  setMainNavigationIds(localizedConfig?.header?.navMain);

  // Set the new language choice
  persistLanguageChoice(lang, cookieKey, localStorageKey);

  return localizedConfig;
};

/**
 * Merge portal config with custom os flyout overrides
 * @param config Localized config
 * @param osFlyoutOverrides Overrides for the flyout
 * @returns Merged localized config
 */
export const mergeOsFlyoutOverrides = (
  config: ILocalizedConfig,
  osFlyoutOverrides: NavMainEntity,
): NavMainEntity[] => {
  if (osFlyoutOverrides == null) return config.header.navMain;

  return config.header.navMain.map(mainNav => {
    if (mainNav.id !== 'flyout_os') return mainNav;

    if (osFlyoutCache === null) {
      osFlyoutCache = JSON.parse(JSON.stringify(mainNav)) as NavMainEntity;
    }

    const mainNavText = osFlyoutOverrides.text ?? osFlyoutCache.text;
    const mainNavTitle = osFlyoutOverrides.title ?? osFlyoutCache.title;

    if (
      osFlyoutCache.flyout == null ||
      osFlyoutCache.flyout.length === 0 ||
      osFlyoutOverrides.flyout == null ||
      osFlyoutOverrides.flyout.length === 0
    )
      return {
        ...mainNav,
        title: mainNavTitle,
        text: mainNavText,
      };

    // Add entries for os flyout columns without overriding existing config
    const mainNavFlyout = [
      ...osFlyoutCache.flyout.map((col, index) => {
        const overrides = osFlyoutOverrides.flyout?.[index]; // Check if overrides exist
        const title = overrides?.title ?? col.title;

        // Check if the linkList exists in the overrides and then use it
        const linkList = overrides?.linkList != null ? overrides.linkList : [];

        return {
          title,
          linkList: [...col.linkList, ...linkList],
        };
      }),
      ...(osFlyoutOverrides.flyout?.slice(osFlyoutCache.flyout.length) || []),
    ];

    return {
      ...mainNav,
      text: mainNavText,
      title: mainNavTitle,
      flyout: mainNavFlyout,
    } as NavMainEntity;
  });
};

/**
 * Fetch the general config based on project id
 *
 * @returns Promise for Post Portal general config
 */
export const fetchConfig = async (
  projectId: string,
  environment: Environment,
): Promise<IPortalConfig> => {
  // Check if project id is sanitized
  if (!isValidProjectId(projectId)) {
    throw new Error(`Internet Header: invalid project id "${projectId}"`);
  }

  if (projectId === 'test') {
    environment = 'int01';
  }

  let url = generateConfigUrl(projectId, environment);

  // Get the config if cache is invalid
  try {
    const res = await fetch(url);
    return (await res.json()) as IPortalConfig;
  } catch (error) {
    throw new Error(`Internet Header: fetching config failed. ${error.message}`);
  }
};

/**
 * Generate an URL with all necessary query params to get the configuration.
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
 * @param projectId Project Id string
 * @returns The valid project id
 */
export const isValidProjectId = (projectId: string): boolean => {
  return projectId !== '' && projectId.length > 0 && /^[a-zA-Z][\w-]*[a-zA-Z0-9]$/.test(projectId);
};

/**
 * Get the localized config object from a custom config
 *
 * @param config String or json object of the custom config
 * @param language Specific language
 * @returns Localized custom config object
 */
export const getLocalizedCustomConfig = (
  config: string | ICustomConfig,
  language: string,
): ILocalizedCustomConfig | undefined => {
  let customConfig: ICustomConfig;
  try {
    customConfig = typeof config === 'string' ? JSON.parse(config) : config;
  } catch (error) {
    throw new Error(
      `Internet Header: Custom config is invalid. Make sure your custom config contains valid JSON syntax and matches the definition. `,
    );
  }
  let localizedCustomConfig: ILocalizedCustomConfig | undefined = customConfig[language];
  if (localizedCustomConfig?.header?.navMain)
    setMainNavigationIds(localizedCustomConfig.header.navMain);
  return localizedCustomConfig;
};

/**
 * Check if mobile header styles are applied or not
 * @returns True if browser is smaller than 1024px
 */
export const isMobile = () => window.innerWidth < 1024;

/**
 * Set unique ID's on main navigation entities but conserve flyout_os to be able to
 * identify the online-service flyout, which can be configured by osFlyoutOverrides
 */
export const setMainNavigationIds = (navMainEntities: NavMainEntity[]): void => {
  navMainEntities.forEach(navMainEntity => {
    navMainEntity.id = navMainEntity.id === 'flyout_os' ? navMainEntity.id : uniqueId('main-nav-');
  });
};
