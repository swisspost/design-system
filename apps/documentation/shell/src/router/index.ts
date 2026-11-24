import type { Globals } from '@shared/globals';
import type { Catalog } from '../catalog';
import { resolve } from './resolve';
import type { Route } from './route';

export interface NavigationOptions {
  /** Replaces the current history entry instead of adding one. */
  replace?: boolean;
}

export class RouteChangeEvent extends Event {
  constructor(
    readonly route: Route,
    readonly previous: Route | null,
  ) {
    super('route-change');
  }
}

export class Router extends EventTarget {
  private route: Route | null = null;

  constructor(private readonly catalog: Catalog) {
    super();
  }

  get current(): Route | null {
    return this.route;
  }

  public start() {
    window.addEventListener('popstate', this.onPopState);
    document.addEventListener('click', this.onClick);

    this.go(new URL(location.href), { replace: true });
  }

  public stop() {
    window.removeEventListener('popstate', this.onPopState);
    document.removeEventListener('click', this.onClick);
  }

  public navigate(href: string | URL, options: NavigationOptions = {}) {
    this.go(new URL(href, location.href), options);
  }

  /** Writes the globals into the URL, without a history entry or route change. */
  public replaceGlobals(globals: Globals) {
    if (this.route?.type !== 'page') return;

    const { page, params, hash } = this.route;

    history.replaceState(
      history.state,
      '',
      this.catalog.canonicalURL(page, { params, globals, hash }),
    );
  }

  private go(url: URL, options: NavigationOptions) {
    const route = resolve(url, this.catalog);

    if (route.type === 'redirect') {
      location.replace(route.href);
      return;
    }

    const target = route.type === 'page' && route.canonical ? new URL(route.canonical, url) : url;
    if (options.replace || target.href === location.href) history.replaceState(null, '', target);
    else history.pushState(null, '', target);

    const previous = this.route;

    this.route = route;
    this.dispatchEvent(new RouteChangeEvent(route, previous));
  }

  private readonly onPopState = () => {
    this.go(new URL(location.href), { replace: true });
  };

  private readonly onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event
      .composedPath()
      .find(
        (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && el.hasAttribute('href'),
      );

    // Do not intercept links that open in a new tab or download a file.
    if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download'))
      return;

    const url = new URL(anchor.href);

    // Do not intercept assets.
    if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;

    event.preventDefault();
    this.go(url, { replace: false });
  };
}
