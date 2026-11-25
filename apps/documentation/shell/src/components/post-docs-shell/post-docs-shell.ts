import { LitElement, type PropertyValues, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  DEFAULT_GLOBALS,
  type Globals,
  type GlobalsChangeEvent,
  stringifyGlobals,
} from '@shared/globals';
import { getShortcut } from '@shared/shortcuts';
import { previewUrl } from '@shared/urls';

import { ANALYTICS, PREVIEW_ORIGIN, SITE_TITLE } from '../../config';
import { Analytics } from '../../analytics/analytics';
import { type PreviewMessageEvent, PreviewConnection } from '../../bridge/preview-connection';
import { Catalog } from '../../catalog/catalog';
import { GlobalsStore } from '../../globals/globals-store';
import { buildNavigation, type NavigationSection } from '../../navigation/tree';
import type { Route } from '../../router/route';
import { type RouteChangeEvent, Router } from '../../router/router';
import { SearchIndex } from '../../catalog/search-index';
import '../post-docs-navigation-sheet/post-docs-navigation-sheet';
import '../post-docs-navigation-sidebar/post-docs-navigation-sidebar';
import type { PreviewLoading } from '../post-docs-preview/post-docs-preview';
import '../post-docs-preview/post-docs-preview';
import '../post-docs-toolbar/post-docs-toolbar';
import './post-docs-shell.scss';

@customElement('post-docs-shell')
export class PostDocsShell extends LitElement {
  @state() private route: Route | null = null;
  @state() private failed = false;
  @state() private previewSrc: string | null = null;
  @state() private catalog: Catalog | null = null;
  @state() private globals: Globals = DEFAULT_GLOBALS;
  // the sheet covers the page, which must not take the focus meanwhile
  @state() private isSheetOpen = false;
  // the page is rendering, its scroll position is restored once it is rendered
  @state() private previewLoading: PreviewLoading | null = null;

  private readonly previewConnection = new PreviewConnection(PREVIEW_ORIGIN);
  private readonly globalsStore = new GlobalsStore();
  private readonly analytics = new Analytics(ANALYTICS);
  private router: Router | null = null;
  private navigation: NavigationSection[] = [];
  private searchIndex: SearchIndex | null = null;
  private readonly sidebarQuery = matchMedia('(min-width: 780px)');

  private pageId: string | null = null;

  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    void this.start();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.router?.stop();
    this.previewConnection.removeEventListener('rendered', this.onRendered);
    this.previewConnection.removeEventListener('error', this.onPreviewError);
    this.previewConnection.removeEventListener('navigate', this.onNavigate);
    this.previewConnection.removeEventListener('shortcut', this.onPreviewShortcut);
    document.removeEventListener('keydown', this.onKeydown);
    this.globalsStore.removeEventListener('globals-change', this.onGlobalsChange);
  }

  private async start() {
    this.analytics.start();
    this.previewConnection.addEventListener('rendered', this.onRendered);
    this.previewConnection.addEventListener('error', this.onPreviewError);
    this.previewConnection.addEventListener('navigate', this.onNavigate);
    this.previewConnection.addEventListener('shortcut', this.onPreviewShortcut);
    document.addEventListener('keydown', this.onKeydown);
    this.globalsStore.addEventListener('globals-change', this.onGlobalsChange);
    this.globals = this.globalsStore.current;

    try {
      const catalog = await Catalog.load();

      this.catalog = catalog;
      this.router = new Router(catalog);
      this.router.addEventListener('route-change', this.onRouteChange);
      this.router.start();
    } catch (error) {
      console.error(error);
      this.failed = true;
    }
  }

  private readonly onRouteChange = (event: Event) => {
    const { route, previous, fromHistory } = event as RouteChangeEvent;
    this.route = route;
    void this.querySelector('post-docs-navigation-sheet')?.close();

    const pageTitle = route.type === 'page' ? route.page.segments.at(-1) : 'Page not found';
    document.title = `${pageTitle} · ${SITE_TITLE}`;

    if (route.type !== 'page') {
      this.analytics.trackPage();
      return;
    }

    // Back and Forward keep the current globals, the history entry may hold older ones
    if (route.globals && !fromHistory) this.globalsStore.set(route.globals);
    this.router?.replaceGlobals(this.globalsStore.current);

    // tracked with the globals in the URL, a new hash on the same page is not a page view
    if (previous?.type !== 'page' || previous.page.id !== route.page.id) this.analytics.trackPage();

    const { page, params, hash } = route;
    const globals = this.globalsStore.current;

    this.previewSrc ??= previewUrl(
      page.id,
      'docs',
      { ...params, globals: stringifyGlobals(globals) },
      PREVIEW_ORIGIN,
    );
    this.previewConnection.setGlobals(globals);
    this.previewConnection.showPage({ id: page.id, params });

    if (page.id === this.pageId) {
      if (!this.previewLoading) this.previewConnection.scrollTo(hash);
    } else {
      this.previewLoading = this.pageId === null ? 'first' : 'page';
      this.pageId = page.id;
    }
  };

  private readonly onRendered = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'rendered'>;
    if (payload.pageId !== this.pageId || !this.previewLoading) return;

    this.previewLoading = null;
    if (this.route?.type === 'page') this.previewConnection.scrollTo(this.route.hash);
  };

  // the preview shows the error, e.g. the exception of a page that failed to render
  private readonly onPreviewError = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'error'>;
    if (payload.pageId === this.pageId) this.previewLoading = null;
  };

  private readonly onGlobalsChange = (event: Event) => {
    const { globals } = event as GlobalsChangeEvent;

    this.globals = globals;
    this.previewConnection.setGlobals(globals);
    this.router?.replaceGlobals(globals);
  };

  private readonly onNavigate = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'navigate'>;
    const url = new URL(payload.href, location.href);

    if (url.origin === location.origin) this.router?.navigate(url);
  };

  private readonly onKeydown = (event: KeyboardEvent) => {
    if (getShortcut(event) !== 'search') return;

    // not the search field of the browser
    event.preventDefault();
    this.openSearch();
  };

  private readonly onPreviewShortcut = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'shortcut'>;
    if (payload.name === 'search') this.openSearch();
  };

  private openSearch() {
    if (this.sidebarQuery.matches)
      this.querySelector('post-docs-navigation-sidebar')?.focusSearch();
    else void this.querySelector('post-docs-navigation-sheet')?.openSearch();
  }

  private readonly onGlobalsSelect = (event: CustomEvent<Partial<Globals>>) => {
    this.globalsStore.set(event.detail);
  };

  private readonly onSheetToggle = (event: CustomEvent<boolean>) => {
    this.isSheetOpen = event.detail;
  };

  // back to the page, once the sheet no longer makes it inert
  private readonly onSearchExit = async () => {
    void this.querySelector('post-docs-navigation-sheet')?.close();
    await this.updateComplete;
    this.querySelector('post-docs-preview')?.focus();
  };

  override willUpdate(changed: PropertyValues) {
    const previousGlobals = changed.get('globals') as Globals | undefined;
    const isModeChanged = changed.has('globals') && previousGlobals?.mode !== this.globals.mode;

    if ((changed.has('catalog') || isModeChanged) && this.catalog) {
      const devMode = this.globals.mode === 'dev';

      this.navigation = buildNavigation(this.catalog, devMode);
      this.searchIndex = new SearchIndex(this.catalog, devMode);
    }
  }

  override render(): unknown {
    const activePage = this.route?.type === 'page' ? this.route.page : null;

    return html`
      <post-docs-navigation-sidebar
        class="palette palette-default elevation-400"
        .sections=${this.navigation}
        .activePage=${activePage}
        .searchIndex=${this.searchIndex}
        @postDocsSearchExit=${this.onSearchExit}
      ></post-docs-navigation-sidebar>
      <post-docs-toolbar
        class="palette palette-brand"
        .globals=${this.globals}
        @postDocsGlobalsChange=${this.onGlobalsSelect}
      ></post-docs-toolbar>
      <post-docs-navigation-sheet
        .sections=${this.navigation}
        .activePage=${activePage}
        .globals=${this.globals}
        .searchIndex=${this.searchIndex}
        @postDocsGlobalsChange=${this.onGlobalsSelect}
        @postDocsSearchExit=${this.onSearchExit}
        @postDocsToggle=${this.onSheetToggle}
      ></post-docs-navigation-sheet>
      <main class="overflow-y-auto" ?inert=${this.isSheetOpen}>${this.renderContent()}</main>
    `;
  }

  private renderContent(): unknown {
    if (this.failed) {
      return this.renderErrorPage(
        '500',
        'The documentation could not be loaded.',
        'Please reload the page. If the error persists, try again later.',
        html`
          <button type="button" class="btn btn-primary" @click=${() => location.reload()}>
            Reload the page
          </button>
        `,
      );
    }

    const notFound =
      this.route?.type === 'not-found'
        ? this.renderErrorPage(
            '404',
            'This page could not be found.',
            'The page may have been moved or renamed, or the URL is incorrect. You may find it from the homepage or with the search.',
            html`
              <a class="btn btn-primary" href="/">
                <post-icon name="arrowleft" aria-hidden="true"></post-icon>
                Go to homepage
              </a>
            `,
          )
        : nothing;

    // the preview stays loaded, so that it shows the next page without a reload
    const preview = this.previewSrc
      ? html`
          <post-docs-preview
            src=${this.previewSrc}
            .connection=${this.previewConnection}
            class=${classMap({ loaded: this.route?.type === 'page' })}
            .loading=${this.previewLoading}
          ></post-docs-preview>
        `
      : nothing;

    return html`${notFound}${preview}`;
  }

  // the error page template of the design system
  private renderErrorPage(type: string, title: string, text: string, buttons: unknown): unknown {
    return html`
      <div class="palette palette-alternate error error-${type} min-h-full">
        <div class="container">
          <div class="error-content">
            <h1 class="error-title">Error ${type}</h1>
            <h2 class="error-subtitle">${title}</h2>
            <p>${text}</p>
            <div class="error-buttons">${buttons}</div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-shell': PostDocsShell;
  }
}
