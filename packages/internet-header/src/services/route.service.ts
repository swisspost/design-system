import { ActiveRouteProp } from '../models/general.model';
import { NavMainEntity, MainNavScoreList } from '../models/header.model';

/**
 * Activate the current route based on the config and the match mode
 * @param config Main Navigation Config
 * @param activeRouteProp Match mode or custom URL to compare against
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

  // Set reference URL to compare nav items against
  let referenceUrl: URL;
  let isRelativeReference = false;
  config = resetOverrideConfig(config);

  if (activeRouteProp === 'auto' || activeRouteProp === 'exact') {
    // Check if an active route is already configured, set override to that and return
    if (hasActivePortalRoute(config)) {
      return resetActiveStateToPortalConfig(config);
    }

    referenceUrl = new URL(window.location.href);
  } else {
    try {
      isRelativeReference = activeRouteProp.startsWith('/') || activeRouteProp.startsWith('./');
      referenceUrl = new URL(activeRouteProp, window.location.href);
    } catch (error) {
      console.warn(
        `Active Route: ${activeRouteProp} is not a valid URL. Navigation highlighting has been disabled.`,
      );
      return config;
    }
  }

  const scoreList = compileScoreList(config, referenceUrl, activeRouteProp, isRelativeReference);

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
    flyout: nav.flyout?.map(flyout => ({
      ...flyout,
      linkList: flyout.linkList.map(link => ({ ...link, isActiveOverride: link.isActive })),
    })),
  }));
};

const resetOverrideConfig = (config: NavMainEntity[]): NavMainEntity[] => {
  return config.map(nav => ({
    ...nav,
    isActiveOverride: false,
    // Initialize flyout as an empty array if it's undefined
    flyout:
      nav.flyout?.map(flyout => ({
        ...flyout,
        linkList: flyout.linkList.map(link => ({ ...link, isActiveOverride: false })),
      })) || [], // Fallback to an empty array if nav.flyout is undefined
  }));
};

/**
 * Compile a list of scores based on how well nav items match the reference URL
 * @param config Main Nav Config
 * @param referenceUrl URL to compare nav items against (window.location or custom)
 * @param activeRouteProp Match mode
 * @returns A list of scored URLs if any matched
 */
export const compileScoreList = (
  config: NavMainEntity[],
  referenceUrl: URL,
  activeRouteProp: ActiveRouteProp,
  isRelativeReference: boolean,
): MainNavScoreList => {
  // Flag to check if the Portal set any active links or if there are any exact matches
  let hadAnyActiveLink = false;
  const scoreList: MainNavScoreList = [];

  config
    .filter(mainNav => !hadAnyActiveLink && mainNav)
    .forEach(mainNav => {
      try {
        const navItemUrl = new URL(mainNav.url);
        const score = compareRoutes(
          referenceUrl,
          navItemUrl,
          isRelativeReference,
          activeRouteProp as 'auto' | 'exact',
        );

        hadAnyActiveLink = updateScoreList(
          scoreList,
          score,
          { main: mainNav, score },
          hadAnyActiveLink,
        );
      } catch {
        // Not a valid url, continue
      }

      // Loop through flyout links 2nd level
      mainNav.flyout?.forEach(flyout => {
        flyout.linkList?.forEach(linklist => {
          // Don't override if any link is already active
          if (linklist.isActive && (activeRouteProp === 'auto' || activeRouteProp === 'exact')) {
            hadAnyActiveLink = true;
            return;
          }

          try {
            const flyoutNavUrl = new URL(linklist.url);
            const score = compareRoutes(
              referenceUrl,
              flyoutNavUrl,
              isRelativeReference,
              activeRouteProp as 'auto' | 'exact',
            );

            hadAnyActiveLink = updateScoreList(
              scoreList,
              score,
              { main: mainNav, sub: linklist, score },
              hadAnyActiveLink,
            );
          } catch {
            // Not a valid URL, continue
          }
        });
      });
    });

  return scoreList.sort((a, b) => b.score - a.score);
};

/**
 * Update score list
 */
function updateScoreList(
  scoreList: MainNavScoreList,
  score: number,
  scoreListItem: any,
  hadAnyActiveLink: boolean,
) {
  let hadActiveLink = hadAnyActiveLink;

  if (score > 0) {
    if (score === Infinity) hadActiveLink = true;
    // Push score
    scoreList.push(scoreListItem);
  }

  return hadActiveLink;
}

/**
 * Compare a nav item URL against the reference URL for similarity
 * @param referenceUrl URL we're comparing against (from window.location or custom)
 * @param navItemUrl URL from the navigation item
 * @param matchMode exact or auto matching
 * @returns Score indicating how well the URLs match
 */
export const compareRoutes = (
  referenceUrl: URL,
  navItemUrl: URL,
  isRelativeReference: boolean,
  matchMode?: 'auto' | 'exact',
): number => {
  if (referenceUrl === null || navItemUrl === null) {
    return 0;
  }

  // Only compare origins if reference URL is not relative
  if (!isRelativeReference && referenceUrl.origin !== navItemUrl.origin) {
    return 0;
  }

  const referenceUrlPath = referenceUrl.pathname.toLocaleLowerCase();
  const navItemUrlPath = navItemUrl.pathname.toLocaleLowerCase();

  // Exact match, pathname is the same
  if (referenceUrlPath === navItemUrlPath) {
    return Infinity;
  }

  // The reference path is shorter than nav item path, a match is impossible
  if (referenceUrl.pathname.length < navItemUrl.pathname.length) {
    return 0;
  }

  if (matchMode === 'auto') {
    const referenceSegments = [
      referenceUrl.origin.toLocaleLowerCase(),
      ...referenceUrlPath.split('/').filter(x => x !== null && x !== ''),
    ];
    const navItemSegments = [
      navItemUrl.origin.toLocaleLowerCase(),
      ...navItemUrlPath.split('/').filter(x => x !== null && x !== ''),
    ];
    const score = getSimilarityScore(referenceSegments, navItemSegments);

    return Math.min(referenceSegments.length, navItemSegments.length) === score ? score : 0;
  }

  return 0;
};

/**
 * Check how many items in an array match
 * @param a Reference array
 * @param b Nav item array to compare
 * @returns Score
 */
export const getSimilarityScore = (a: string[], b: string[]): number => {
  if (a == null || b == null || a.length === 0 || b.length === 0) {
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
