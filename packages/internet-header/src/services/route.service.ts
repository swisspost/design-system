import { state } from '@/data/store';
import { ActiveRouteProp } from '../models/general.model';
import { HeaderConfig } from '../models/header.model';
import { RouteLink } from '../models/shared.model';

/**
 * Determine the active link from the header config and the activeRoute prop.
 * @param activeRouteProp Match mode or custom URL
 * @returns The best-matching link config object, or null
 */
export const getActiveLink = (activeRouteProp: ActiveRouteProp): RouteLink | null => {
  const headerLinks = getHeaderLinks(state.localizedConfig?.header);

  if (headerLinks.length === 0 || activeRouteProp === 'none') {
    return null;
  }

  // If 'auto' or 'exact', check if any link is already marked active in the config
  if (activeRouteProp === 'auto' || activeRouteProp === 'exact') {
    const activeLink = findActiveLink(headerLinks);
    if (activeLink) return activeLink;
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

  const candidates = extractCandidateLinks(headerLinks);
  const matchMode = activeRouteProp === 'exact' ? 'exact' : 'auto';
  return findBestMatch(candidates, compareUrl, matchMode);
};

/**
 * Find the first link marked as active in the header config
 */
const findActiveLink = (headerLinks: RouteLink[]): RouteLink | undefined => {
  return headerLinks.find(link => link.active);
};

/**
 * Extract all candidate links from the header config.
 */
const extractCandidateLinks = (headerLinks: RouteLink[]): RouteLink[] => {
  return headerLinks.filter(link => link.url !== '' && link.url !== '#' && link.url !== '/');
};

/**
 * Recursively walks the header config and returns every item with a `url` property.
 */
const getHeaderLinks = (headerConfig: HeaderConfig | undefined): RouteLink[] => {
  const links: RouteLink[] = [];

  if (!headerConfig) {
    return links;
  }

  const walk = (value: unknown): void => {
    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (typeof value !== 'object' || value === null) {
      return;
    }

    if ('url' in value && typeof value.url === 'string') {
      links.push(value as RouteLink);
    }

    Object.values(value).forEach(walk);
  };

  walk(headerConfig);

  return links;
};

/**
 * Find the best matching link against the compare URL and return it
 */
const findBestMatch = (
  candidates: RouteLink[],
  compareUrl: URL,
  matchMode: 'auto' | 'exact',
): RouteLink | null => {
  let bestMatch: { link: RouteLink; score: number } | null = null;

  for (const candidate of candidates) {
    try {
      const candidateUrl = new URL(candidate.url, document.location.origin);
      const score = compareRoutes(compareUrl, candidateUrl, matchMode);

      if (score > 0) {
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { link: candidate, score };
        }

        if (score === Infinity) break;
      }
    } catch {
      // Not a valid URL, continue
    }
  }

  return bestMatch ? bestMatch.link : null;
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
