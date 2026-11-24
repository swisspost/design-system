import { DEFAULT_ROOT, ROOTS } from '../config';

/** How a root, the first segment of the page titles, appears in the navigation. */
export interface RootDefinition {
  /**
   * - `home`: the pages are listed under the "Home" heading
   * - `category`: the pages are listed under a collapsible heading with the root name
   * - `flat`: the pages are listed as top-level rows, without a heading
   * - `hidden`: the pages are not listed, they stay reachable by URL (e.g. from PR preview comments)
   */
  layout: 'home' | 'category' | 'flat' | 'hidden';
  /** The `post-icon` shown before the page rows. */
  icon: string;
  weight: 'bold' | 'regular';
}

export function getRootDefinition(root: string): RootDefinition {
  return ROOTS[root] ?? DEFAULT_ROOT;
}
