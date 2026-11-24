import type { Page } from '../catalog';

export type Route = PageRoute | RedirectRoute | NotFoundRoute;

export interface PageRoute {
  type: 'page';
  page: Page;
  hash: string;
  params: Record<string, string>;
  canonical: string | null;
}

export interface RedirectRoute {
  type: 'redirect';
  href: string;
}

export interface NotFoundRoute {
  type: 'not-found';
}
