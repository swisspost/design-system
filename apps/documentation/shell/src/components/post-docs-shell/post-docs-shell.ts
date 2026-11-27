import { LitElement, type PropertyValues, html, nothing, type TemplateResult } from 'lit';
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
import type { PageRoute, Route } from '../../router/route';
import { type RouteChangeEvent, Router } from '../../router/router';
import { SearchIndex } from '../../catalog/search-index';
import '../post-docs-navigation-sheet/post-docs-navigation-sheet';
import '../post-docs-navigation-sidebar/post-docs-navigation-sidebar';
import type { PreviewLoading } from '../post-docs-preview/post-docs-preview';
import '../post-docs-preview/post-docs-preview';
import '../post-docs-toolbar/post-docs-toolbar';
import './post-docs-shell.scss';

/**
 * Owns the router, the globals store and the preview connection, and connects
 * them: a route change shows the page in the preview, a globals change is
 * applied to the preview and written into the URL.
 */
@customElement('post-docs-shell')
export class PostDocsShell extends LitElement {
  @state() private route: Route | null = null;
  @state() private hasFailed = false;
  @state() private previewSrc: string | null = null;
  @state() private catalog: Catalog | null = null;
  @state() private globals: Globals = DEFAULT_GLOBALS;
  // The sheet covers the page, which must not take the focus meanwhile.
  @state() private isSheetOpen = false;
  // The page is rendering, its scroll position is restored once it is rendered.
  @state() private previewLoading: PreviewLoading | null = null;

  private readonly previewConnection = new PreviewConnection(PREVIEW_ORIGIN);
  private readonly globalsStore = new GlobalsStore();
  private readonly analytics = new Analytics(ANALYTICS);
  private router: Router | null = null;
  private navigation: NavigationSection[] = [];
  private searchIndex: SearchIndex | null = null;
  private readonly sidebarQuery = matchMedia('(min-width: 780px)');
  private listeners: AbortController | null = null;

  private pageId: string | null = null;

  protected override createRenderRoot() {
    return this;
  }

  public override connectedCallback() {
    super.connectedCallback();
    void this.start();
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    this.router?.stop();
    this.listeners?.abort();
    this.listeners = null;
  }

  protected override willUpdate(changed: PropertyValues) {
    const previousGlobals: Globals | undefined = changed.get('globals');
    const isModeChanged = changed.has('globals') && previousGlobals?.mode !== this.globals.mode;

    if ((changed.has('catalog') || isModeChanged) && this.catalog) {
      const devMode = this.globals.mode === 'dev';

      this.navigation = buildNavigation(this.catalog, devMode);
      this.searchIndex = new SearchIndex(this.catalog, devMode);
    }
  }

  private async start() {
    this.listeners = new AbortController();
    const signal = this.listeners.signal;

    this.analytics.start();
    this.previewConnection.addEventListener('rendered', this.handleRendered, { signal });
    this.previewConnection.addEventListener('error', this.handlePreviewError, { signal });
    this.previewConnection.addEventListener('navigate', this.handleNavigate, { signal });
    this.previewConnection.addEventListener('shortcut', this.handlePreviewShortcut, { signal });
    document.addEventListener('keydown', this.handleKeydown, { signal });
    this.sidebarQuery.addEventListener('change', this.handleBreakpointChange, { signal });
    this.globalsStore.addEventListener('globals-change', this.handleGlobalsChange, { signal });
    this.globals = this.globalsStore.current;

    try {
      const catalog = await Catalog.load();

      this.catalog = catalog;
      this.router = new Router(catalog);
      this.router.addEventListener('route-change', this.handleRouteChange, { signal });
      this.router.start();
    } catch (error) {
      console.error(error);
      this.hasFailed = true;
    }
  }

  private readonly handleRouteChange = (event: RouteChangeEvent) => {
    const route = event.route;
    this.route = route;
    void this.querySelector('post-docs-navigation-sheet')?.close();

    const pageTitle = route.type === 'page' ? route.page.segments.at(-1) : 'Page not found';
    document.title = `${pageTitle} · ${SITE_TITLE}`;

    if (route.type === 'page') {
      this.syncGlobals(route, event.fromHistory);
      this.showPage(route);
    }

    this.trackPageView(route, event.previous);
  };

  // Back and Forward keep the current globals, as the history entry may hold
  // older ones.
  private syncGlobals(route: PageRoute, fromHistory: boolean) {
    if (route.globals && !fromHistory) this.globalsStore.set(route.globals);
    this.router?.replaceGlobals(this.globalsStore.current);
  }

  private showPage(route: PageRoute) {
    const globals = this.globalsStore.current;

    this.previewSrc ??= previewUrl(
      route.page.id,
      'docs',
      { ...route.params, globals: stringifyGlobals(globals) },
      PREVIEW_ORIGIN,
    );
    this.previewConnection.setGlobals(globals);
    this.previewConnection.showPage({ id: route.page.id, params: route.params });

    if (route.page.id === this.pageId) {
      if (!this.previewLoading) this.previewConnection.scrollTo(route.hash);
    } else {
      this.previewLoading = this.pageId === null ? 'first' : 'page';
      this.pageId = route.page.id;
    }
  }

  // Tracked once the globals are in the URL. A new hash on the same page is not
  // a page view.
  private trackPageView(route: Route, previous: Route | null) {
    const isSamePage =
      route.type === 'page' && previous?.type === 'page' && previous.page.id === route.page.id;

    if (!isSamePage) this.analytics.trackPage();
  }

  private readonly handleRendered = (event: PreviewMessageEvent<'rendered'>) => {
    if (event.payload.pageId !== this.pageId || !this.previewLoading) return;

    this.previewLoading = null;
    if (this.route?.type === 'page') this.previewConnection.scrollTo(this.route.hash);
  };

  // The preview shows the error, e.g. the exception of a page that failed to
  // render.
  private readonly handlePreviewError = (event: PreviewMessageEvent<'error'>) => {
    if (event.payload.pageId === this.pageId) this.previewLoading = null;
  };

  private readonly handleGlobalsChange = (event: GlobalsChangeEvent) => {
    this.globals = event.globals;
    this.previewConnection.setGlobals(event.globals);
    this.router?.replaceGlobals(event.globals);
  };

  private readonly handleNavigate = (event: PreviewMessageEvent<'navigate'>) => {
    const url = new URL(event.payload.href, location.href);

    if (url.origin === location.origin) this.router?.navigate(url);
  };

  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (getShortcut(event) !== 'search') return;

    // Ctrl+K would otherwise focus the browser's own search field.
    event.preventDefault();
    this.openSearch();
  };

  private readonly handlePreviewShortcut = (event: PreviewMessageEvent<'shortcut'>) => {
    if (event.payload.name === 'search') this.openSearch();
  };

  private openSearch() {
    if (this.sidebarQuery.matches) {
      this.querySelector('post-docs-navigation-sidebar')?.focusSearch();
    } else {
      void this.querySelector('post-docs-navigation-sheet')?.openSearch();
    }
  }

  // The sidebar takes over from the sheet, which would otherwise stay open and
  // keep the page inert.
  private readonly handleBreakpointChange = (event: MediaQueryListEvent) => {
    if (event.matches) void this.querySelector('post-docs-navigation-sheet')?.close();
  };

  private readonly handleGlobalsSelect = (event: CustomEvent<Partial<Globals>>) => {
    this.globalsStore.set(event.detail);
  };

  private readonly handleSheetToggle = (event: CustomEvent<boolean>) => {
    this.isSheetOpen = event.detail;
  };

  // Back to the page, once the sheet no longer makes it inert.
  private readonly handleSearchExit = async () => {
    void this.querySelector('post-docs-navigation-sheet')?.close();
    await this.updateComplete;
    this.querySelector('post-docs-preview')?.focus();
  };

  private renderContent(): TemplateResult {
    if (this.hasFailed) return this.renderLoadError();

    const notFound = this.route?.type === 'not-found' ? this.renderNotFound() : nothing;

    // The preview stays loaded, so that it shows the next page without a
    // reload.
    return html`${notFound}${this.renderPreview()}`;
  }

  private renderLoadError(): TemplateResult {
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

  private renderNotFound(): TemplateResult {
    return this.renderErrorPage(
      '404',
      'This page could not be found.',
      'The page may have been moved or renamed, or the URL is incorrect. You may find it from the homepage or with the search.',
      html`
        <a class="btn btn-primary" href="/">
          <post-icon name="arrowleft" aria-hidden="true"></post-icon>
          Go to homepage
        </a>
      `,
    );
  }

  private renderPreview(): TemplateResult | typeof nothing {
    if (!this.previewSrc) return nothing;

    return html`
      <post-docs-preview
        src=${this.previewSrc}
        .connection=${this.previewConnection}
        class=${classMap({ loaded: this.route?.type === 'page' })}
        .loading=${this.previewLoading}
      ></post-docs-preview>
    `;
  }

  // The error page template of the design system, so that the error pages look
  // like the ones of other Post sites.
  private renderErrorPage(
    type: string,
    title: string,
    text: string,
    buttons: TemplateResult,
  ): TemplateResult {
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

  protected override render(): TemplateResult {
    const activePage = this.route?.type === 'page' ? this.route.page : null;

    return html`
      <post-docs-navigation-sidebar
        class="palette palette-default elevation-400"
        .sections=${this.navigation}
        .activePage=${activePage}
        .searchIndex=${this.searchIndex}
        @postDocsSearchExit=${this.handleSearchExit}
      ></post-docs-navigation-sidebar>
      <post-docs-toolbar
        class="palette palette-brand d-flex align-items-center gap-32 px-md-16"
        .globals=${this.globals}
        @postDocsGlobalsChange=${this.handleGlobalsSelect}
      ></post-docs-toolbar>
      <post-docs-navigation-sheet
        .sections=${this.navigation}
        .activePage=${activePage}
        .globals=${this.globals}
        .searchIndex=${this.searchIndex}
        @postDocsGlobalsChange=${this.handleGlobalsSelect}
        @postDocsSearchExit=${this.handleSearchExit}
        @postDocsToggle=${this.handleSheetToggle}
      ></post-docs-navigation-sheet>
      <main class="overflow-y-auto" ?inert=${this.isSheetOpen}>${this.renderContent()}</main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-shell': PostDocsShell;
  }
}
