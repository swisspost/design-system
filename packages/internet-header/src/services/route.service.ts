import { ActiveRouteProp } from '../models/general.model';
import { NavMainEntity, MainNavScoreList } from '../models/header.model';

/**
 * Activate the current route based on the config and the match mode
 * @param config Main Navigation Config
 * @param activeRouteProp Match mode
 * @returns Modified Main Navigation Config
 */
export const markActiveRoute = (
  config: NavMainEntity[],
  activeRouteProp: ActiveRouteProp,
): NavMainEntity[] => {
  // Don't highlight any route
  if (activeRouteProp === false) {
    return config;
  }

  // Set compare URL and check if activeRouteProp is valid
  let compareUrl: URL;
  config = resetOverrideConfig(config);

  if (activeRouteProp === 'auto' || activeRouteProp === 'exact') {
    // Check if an active route is already configured, set override to that and return
    if (hasActivePortalRoute(config)) {
      return resetActiveStateToPortalConfig(config);
    }

    compareUrl = new URL(window.location.href);
  } else {
    try {
      compareUrl = new URL(activeRouteProp, document.location.origin);
    } catch (error) {
      console.warn(
        `Active Route: ${activeRouteProp} is not a valid URL. Navigation highlighting has been disabled.`,
      );
      return config;
    }
  }

  const scoreList = compileScoreList(config, compareUrl, activeRouteProp);

  if (scoreList.length === 0) {
    // No match found or already active links defined
    return config;
  }

  const winnerPair = scoreList[0];
  winnerPair.main.isActiveOverride = true;
  if (winnerPair.sub) winnerPair.sub.isActiveOverride = true;

  return config;
};

/**
 * Check if the portal config set any active route
 * @param config Main navigation config
 * @returns True if portal set any route as active
 */
export const hasActivePortalRoute = (config: NavMainEntity[]): boolean => {
  return config.filter(nav => nav.isActive).length > 0;
};

export const resetActiveStateToPortalConfig = (config: NavMainEntity[]): NavMainEntity[] => {
  return config.map(nav => ({
    ...nav,
    isActiveOverride: nav.isActive,
    flyout: nav.flyout.map(flyout => ({
      ...flyout,
      linkList: flyout.linkList.map(link => ({ ...link, isActiveOverride: link.isActive })),
    })),
  }));
};

const resetOverrideConfig = (config: NavMainEntity[]): NavMainEntity[] => {
  return config.map(nav => ({
    ...nav,
    isActiveOverride: false,
    flyout: nav.flyout.map(flyout => ({
      ...flyout,
      linkList: flyout.linkList.map(link => ({ ...link, isActiveOverride: false })),
    })),
  }));
};

/**
 * Compile a list of scores based on the map mode, sorted in descending order
 * @param config Main Nav Config
 * @param compareUrl Current Browser URL or a custom URL
 * @param activeRouteProp Match mode
 * @returns A list of scored URLs if any matched
 */
export const compileScoreList = (
  config: NavMainEntity[],
  compareUrl: URL,
  activeRouteProp: ActiveRouteProp,
): MainNavScoreList => {
  // Flag to check if the Portal set any active links or if there are any exact matches
  let hadAnyActiveLink = false;
  const scoreList: MainNavScoreList = [];

  config.forEach(mainNav => {
    if (hadAnyActiveLink || !mainNav) {
      return;
    }

    try {
      const score = compareRoutes(
        compareUrl,
        new URL(mainNav.url),
        activeRouteProp as 'auto' | 'exact',
      );
      if (score > 0) {
        if (score === Infinity) hadAnyActiveLink = true;
        scoreList.push({ main: mainNav, score });
      }
    } catch {
      // Not a valid url, continue
    }

    // Loop through flyout links 2nd level
    if (mainNav.flyout.length) {
      mainNav.flyout.forEach(flyout => {
        if (flyout.linkList) {
          flyout.linkList.forEach(linklist => {
            // Don't override if any link is already active
            if (linklist.isActive && (activeRouteProp === 'auto' || activeRouteProp === 'exact')) {
              hadAnyActiveLink = true;
              return;
            }

            try {
              const url = new URL(linklist.url);
              const score = compareRoutes(compareUrl, url, activeRouteProp as 'auto' | 'exact');
              if (score > 0) {
                if (score === Infinity) hadAnyActiveLink = true;

                // Push score
                scoreList.push({
                  main: mainNav,
                  sub: linklist,
                  score,
                });
              }
            } catch {
              // Not a valid URL, continue
            }
          });
        }
      });
    }
  });

  return scoreList.sort((a, b) => b.score - a.score);
};

/**
 * Compare two URLs for similarity based on a match mode
 * @param baseUrl Browser URL
 * @param compareUrl Navigatgion URL
 * @param matchMode exact or auto matching
 * @returns Score
 */
export const compareRoutes = (
  baseUrl: URL,
  compareUrl: URL,
  matchMode?: 'auto' | 'exact',
): number => {
  // One url is not defined or they don't share the same orign
  if (!baseUrl || !compareUrl || baseUrl.origin !== compareUrl.origin) {
    return 0;
  }

  // Exact match, origin and pathname are the same
  if (baseUrl.pathname === compareUrl.pathname) {
    return Infinity;
  }

  // The basepath is longer than the comparison, a match is impossible
  if (baseUrl.pathname.length < compareUrl.pathname.length) {
    return 0;
  }

  if (matchMode === 'auto') {
    const baseSegments = [baseUrl.origin, ...baseUrl.pathname.split('/').filter(x => !!x)];
    const compareSegments = [compareUrl.origin, ...compareUrl.pathname.split('/').filter(x => !!x)];

    const score = getSimilarityScore(baseSegments, compareSegments);

    // If only some segments match, but not the whole smaller array, it's not a match
    return Math.min(baseSegments.length, compareSegments.length) === score ? score : 0;
  }

  return 0;
};

/**
 * Check how many items in an array match
 * @param a Base array
 * @param b Compare array
 * @returns Score
 */
export const getSimilarityScore = (a: string[], b: string[]): number => {
  if (!a?.length || !b?.length) {
    return 0;
  }

  let i = 0;
  for (; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      return 0;
    }
  }

  return i;
};
