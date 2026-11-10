import type { DocsPage } from '../storybook';
import { FLAT_ROOTS, HOME_ROOT } from '../sidebar/config';
import { isListed } from '../sidebar/tree';

/** Tag prefix for the other names of a page, e.g. `alias:Text Field` on `Components/Form Input`. */
export const TAG_ALIAS_PREFIX = 'alias:';

/**
 * A page as the search sees it: one per docs page, never individual stories.
 */
export interface SearchEntry {
  page: DocsPage;
  /** The page name, the last title segment, e.g. "Form Input" */
  name: string;
  /** Where the page is, e.g. "Foundations / Layout"; empty for top-level pages */
  context: string;
  aliases: string[];
  /** The normalized texts the query is matched against */
  terms: { name: string; aliases: string[]; title: string };
}

export interface SearchResult {
  entry: SearchEntry;
  /** The alias that matched, when the page was found by another name than its own */
  alias?: string;
}

/**
 * Builds the search entries for the pages listed in the sidebar (same dev mode rules).
 */
export function buildSearchIndex(pages: DocsPage[], devMode: boolean): SearchEntry[] {
  return pages
    .filter(page => isListed(page, devMode))
    .map(page => {
      const name = page.segments.at(-1) ?? page.title;
      const aliases = page.tags
        .filter(tag => tag.startsWith(TAG_ALIAS_PREFIX))
        .map(tag => tag.slice(TAG_ALIAS_PREFIX.length).trim())
        .filter(Boolean);

      return {
        page,
        name,
        context: getContext(page),
        aliases,
        terms: {
          name: normalize(name),
          aliases: aliases.map(normalize),
          title: normalize(page.segments.join(' ')),
        },
      };
    });
}

/**
 * Finds the pages matching the query, best matches first, then by name.
 * Matches by name rank above matches by alias, whole matches above prefixes above substrings;
 * a query whose words all start words of the title (e.g. "layout grid") matches last.
 */
export function search(entries: SearchEntry[], query: string): SearchResult[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  const words = normalized.split(' ');

  return entries
    .map(entry => ({ entry, ...score(entry, normalized, words) }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
    .map(({ entry, alias }) => ({ entry, alias }));
}

function score(
  { terms, aliases }: SearchEntry,
  query: string,
  words: string[],
): { score: number; alias?: string } {
  const nameScore = scoreText(terms.name, query, 100);

  let aliasScore = 0;
  let alias: string | undefined;
  terms.aliases.forEach((text, i) => {
    const value = scoreText(text, query, 90);
    if (value > aliasScore) {
      aliasScore = value;
      alias = aliases[i];
    }
  });

  if (nameScore >= aliasScore && nameScore > 0) return { score: nameScore };
  if (aliasScore > 0) return { score: aliasScore, alias };

  const titleWords = [terms.title, ...terms.aliases].join(' ').split(' ');
  const allWordsMatch = words.every(word =>
    titleWords.some(titleWord => titleWord.startsWith(word)),
  );
  return { score: allWordsMatch ? 10 : 0 };
}

/**
 * Exact (`best`), prefix, word prefix and substring matches, in this order.
 */
function scoreText(text: string, query: string, best: number): number {
  if (text === query) return best;
  if (text.startsWith(query)) return best - 20;
  if (text.split(' ').some(word => word.startsWith(query))) return best - 40;
  if (text.includes(query)) return best - 60;
  return 0;
}

/**
 * Lower case, without diacritics and punctuation: "Button Back-to-Top" → "button back to top".
 */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function getContext(page: DocsPage): string {
  const [root, ...rest] = page.segments;
  if (root === HOME_ROOT) return 'Home';
  if (FLAT_ROOTS.includes(root)) return '';
  return [root, ...rest.slice(0, -1)].join(' / ');
}
