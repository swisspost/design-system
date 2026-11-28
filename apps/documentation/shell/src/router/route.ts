import type { Globals } from '@shared/globals';
import type { Page } from '../catalog/catalog';

export type Route = PageRoute | RedirectRoute | NotFoundRoute;

export interface PageRoute {
  type: 'page';
  page: Page;
  hash: string;
  params: Record<string, string>;
  /**
   * The globals of the URL, missing ones are the defaults (hidden ones are left
   * out). `null` if the URL has none.
   */
  globals: Partial<Globals> | null;
  canonical: string | null;
}

export interface RedirectRoute {
  type: 'redirect';
  href: string;
}

export interface NotFoundRoute {
  type: 'not-found';
}
