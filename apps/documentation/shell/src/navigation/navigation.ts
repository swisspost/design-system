import { NAVIGATION } from '../config';

export interface NavigationConfig {
  /** The `post-icon` shown after the headings of the collapsible roots. */
  collapsibleRootIcon: string;
  /** The definition of the roots that are not in `roots`. */
  defaultRoot: RootDefinition;
  /**
   * The roots of the navigation, by name (the first segment of the page
   * titles). Their order comes from `storySort` in
   * `preview/.storybook/preview.ts`.
   */
  roots: Record<string, RootDefinition>;
}

/**
 * How a root, the first segment of the page titles, appears in the navigation.
 */
export interface RootDefinition {
  /**
   * - `home`: the pages are listed under the "Home" heading
   * - `collapsible`: the pages are listed under a collapsible heading with the
   *   root name
   * - `flat`: the pages are listed as top-level rows, without a heading
   * - `hidden`: the pages are not listed, they stay reachable by URL (e.g. from
   *   PR preview comments)
   */
  layout: 'home' | 'collapsible' | 'flat' | 'hidden';
  /** The `post-icon` shown before the page rows. */
  icon: string;
  weight: 'bold' | 'regular';
}

export function getRootDefinition(root: string): RootDefinition {
  return NAVIGATION.roots[root] ?? NAVIGATION.defaultRoot;
}
