/**
 * How the root categories of the Storybook index appear in the sidebar.
 * Root names are the first segment of the story titles; their order comes from `storySort` in `.storybook/preview.ts`.
 */

/** Root listed under the "Home" heading. */
export const HOME_ROOT = 'Introduction';

/** Roots whose pages are listed as top-level rows, without a category heading. */
export const FLAT_ROOTS = ['Misc'];

/** Roots never listed in the sidebar. Their pages stay reachable by URL (e.g. from PR preview comments). */
export const HIDDEN_ROOTS = ['Health'];

/** Roots whose page rows use the regular font weight instead of bold. */
export const REGULAR_WEIGHT_ROOTS = ['Packages'];

/** `post-icon` shown after every category heading. */
export const CATEGORY_ICON = 'parcel';

/** `post-icon` shown before the page rows of a root. */
const PAGE_ICONS: Record<string, string> = {
  'Introduction': 'document',
  'Getting Started': 'arrowright',
  'Packages': 'parcel',
  'Foundations': 'portal',
  'Raw Components': 'component',
  'Components': 'component',
  'Utilities': 'component',
  'Templates': 'webpage',
  'Guidelines': 'document',
  'Accessibility Practices': 'document',
  'Misc': 'document',
};

export function getPageIcon(root: string): string {
  return PAGE_ICONS[root] ?? 'document';
}

/** Tags read by the sidebar. */
export const TAG_DEV_ONLY = 'devOnly';
export const TAG_NEW = 'status:New';
export const TAG_DEPRECATED = 'status:Deprecated';
