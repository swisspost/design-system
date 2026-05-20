import { state } from '@/data/store';
import { ActiveRouteProp } from '../models/general.model';
import { MainNavigationConfig } from '../models/header.model';
import { SimpleLinkConfig } from '../models/shared.model';

interface ScoredLink {
  link: SimpleLinkConfig;
  score: number;
}

/**
 * Determine the active link from the main navigation config and the activeRoute prop.
 * @param activeRouteProp Match mode or custom URL
 * @returns The best-matching link config object, or null
 */
export const getActiveLink = (activeRouteProp: ActiveRouteProp): SimpleLinkConfig | null => {
  const mainNavigationConfig = state.localizedConfig?.header?.localHeader?.mainNavigation;

  if (!mainNavigationConfig || activeRouteProp === 'none') {
    return null;
  }

  // If 'auto' or 'exact', check if any link is already marked active in the config
  if (activeRouteProp === 'auto' || activeRouteProp === 'exact') {
    const portalActiveLink = findPortalActiveLink(mainNavigationConfig);
    if (portalActiveLink) return portalActiveLink;
  }

  let compareUrl: URL;

  if (activeRouteProp === 'auto' || activeRouteProp === 'exact') {
    compareUrl = new URL(window.location.href);
  } else {
    try {
      compareUrl = new URL(activeRouteProp, document.location.origin);
    } catch {
      console.warn(
        `Active Route: ${activeRouteProp} is not a valid URL. Navigation highlighting has been disabled.`,
      );
      return null;
    }
  }

  const candidates = extractCandidateLinks(mainNavigationConfig);
  const matchMode = activeRouteProp === 'exact' ? 'exact' : 'auto';
  const scoreList = scoreCandidates(candidates, compareUrl, matchMode);

  if (scoreList.length === 0) {
    return null;
  }

  return scoreList[0].link;
};

/**
 * Find the first link marked as active in the portal config
 */
const findPortalActiveLink = (config: MainNavigationConfig): SimpleLinkConfig | null => {
  for (const item of config) {
    if ('url' in item && item.active) {
      return item;
    }

    if (!('sections' in item)) {
      continue;
    }

    const activeSectionLink = findFirstActiveSectionLink(item.sections);
    if (activeSectionLink) {
      return activeSectionLink;
    }
  }

  return null;
};

const findFirstActiveSectionLink = (
  sections: Extract<MainNavigationConfig[number], { sections: unknown }>['sections'],
): SimpleLinkConfig | null => {
  for (const section of sections) {
    for (const link of section.items) {
      if (link.active) {
        return link;
      }
    }
  }

  return null;
};

/**
 * Extract all candidate links from the main navigation config
 */
const extractCandidateLinks = (config: MainNavigationConfig): SimpleLinkConfig[] => {
  const links: SimpleLinkConfig[] = [];

  config.forEach(item => {
    if ('url' in item && isNavigableUrl(item.url)) {
      links.push(item);
    }

    if ('sections' in item) {
      if (item.overview && isNavigableUrl(item.overview.url)) {
        links.push(item.overview);
      }

      item.sections.forEach(section => {
        section.items.forEach(link => {
          if (isNavigableUrl(link.url)) links.push(link);
        });
      });
    }
  });

  return links;
};

const isNavigableUrl = (url: string): boolean => {
  return url !== '' && url !== '#';
};

/**
 * Score candidate links against the compare URL and return sorted results
 */
const scoreCandidates = (
  candidates: SimpleLinkConfig[],
  compareUrl: URL,
  matchMode: 'auto' | 'exact',
): ScoredLink[] => {
  const scoreList: ScoredLink[] = [];

  for (const candidate of candidates) {
    if (!candidate.url) continue;

    try {
      const candidateUrl = new URL(candidate.url, document.location.origin);
      const score = compareRoutes(compareUrl, candidateUrl, matchMode);

      if (score > 0) {
        scoreList.push({ link: candidate, score });
        if (score === Infinity) break;
      }
    } catch {
      // Not a valid URL, continue
    }
  }

  return scoreList.sort((a, b) => b.score - a.score);
};

/**
 * Compare two URLs for similarity based on a match mode
 * @param baseUrl Browser URL
 * @param compareUrl Navigation URL
 * @param matchMode exact or auto matching
 * @returns Score
 */
export const compareRoutes = (
  baseUrl: URL,
  compareUrl: URL,
  matchMode?: 'auto' | 'exact',
): number => {
  // One url is not defined or they don't share the same orign
  if (baseUrl === null || compareUrl === null || baseUrl.origin !== compareUrl.origin) {
    return 0;
  }

  const baseUrlPath = baseUrl.pathname.toLocaleLowerCase();
  const compareUrlPath = compareUrl.pathname.toLocaleLowerCase();

  // Exact match, origin and pathname are the same
  if (baseUrlPath === compareUrlPath) {
    return Infinity;
  }

  // The basepath is longer than the comparison, a match is impossible
  if (baseUrl.pathname.length < compareUrl.pathname.length) {
    return 0;
  }

  if (matchMode === 'auto') {
    const baseSegments = [
      baseUrl.origin.toLocaleLowerCase(),
      ...baseUrlPath.split('/').filter(x => x !== null && x !== ''),
    ];
    const compareSegments = [
      compareUrl.origin.toLocaleLowerCase(),
      ...compareUrlPath.split('/').filter(x => x !== null && x !== ''),
    ];

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
