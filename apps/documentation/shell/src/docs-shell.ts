import { LitElement, html, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { trackPage } from './analytics';
import { SIDEBAR_QUERY } from './config';
import { SearchEntry, buildSearchIndex } from './search/search-index';
import { Catalog } from './state/catalog';
import { readDevMode } from './state/dev-mode';
import {
  loadStoredGlobals,
  readGlobalsFromUrl,
  storeGlobals,
  writeGlobalsToUrl,
} from './state/globals';
import { Resolution, buildPreviewUrl, getPageParams, resolveUrl } from './state/url';
import { KeyPress, PreviewBridge, PreviewPage, SelectStoryPayload } from './storybook/bridge';
import type { DocsPage } from './storybook';
import { DocsGlobals, sameGlobals, stringifyGlobalsParam } from './storybook/docs-globals';
import { FLAT_ROOTS, HOME_ROOT } from './sidebar/config';
import { SidebarSection, buildSidebar } from './sidebar/tree';
import type { DocsNavMobile } from './sidebar/docs-nav-mobile';
import type { DocsSidebar } from './sidebar/docs-sidebar';
import './sidebar/docs-sidebar';
import './sidebar/docs-nav-mobile';
import './topbar/docs-topbar';
import type { PreviewLoading } from './preview/docs-preview';
import './preview/docs-preview';

const SITE_TITLE = 'Swiss Post Design System';

/** The preview is shown even if it never reports the page as rendered */
const LOADING_TIMEOUT = 10_000;

type ShownRoute = Exclude<Resolution, { type: 'redirect' }>;

/**
 * The documentation shell: layout, routing and the connection to the Storybook preview.
 * The URL is the source of truth for the current page; every navigation goes through `navigate`.
 */
@customElement('docs-shell')
export class DocsShell extends LitElement {
  @state() private catalog?: Catalog;
  @state() private devMode = false;
  @state() private globals: DocsGlobals = loadStoredGlobals();
  @state() private route?: ShownRoute;
  @state() private previewSrc = '';
  @state() private loadError = false;
  @state() private previewLoading?: PreviewLoading;
  /** The mobile navigation panel covers the page; the page must not take focus meanwhile */
  @state() private mobileNavOpen = false;

  @query('docs-nav-mobile') private mobileNav?: DocsNavMobile;
  @query('docs-sidebar') private sidebar?: DocsSidebar;

  private sections: SidebarSection[] = [];
  private searchEntries: SearchEntry[] = [];
  /** Hash to scroll to once the preview has rendered the page that is being opened */
  private pendingHash: string | null = null;
  private loadingTimeout?: ReturnType<typeof setTimeout>;

  private readonly bridge = new PreviewBridge({
    onPageRendered: id => this.onPageRendered(id),
    onPreviewError: () => this.setPreviewLoading(undefined),
    onNavigateUrl: url => this.navigate(new URL(url, location.href)),
    onSelectStory: payload => this.onSelectStory(payload),
    onPreviewKeydown: key => this.onShortcut(key),
  });

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener('popstate', this.onPopState);
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeydown);
    this.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    globalThis.removeEventListener('popstate', this.onPopState);
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if ((changed.has('catalog') || changed.has('devMode')) && this.catalog) {
      this.sections = buildSidebar(this.catalog.pages, this.devMode);
      this.searchEntries = buildSearchIndex(this.catalog.pages, this.devMode);
    }
  }

  render() {
    const page = this.route?.type === 'page' ? this.route.page : undefined;
    const notFound = this.route?.type === 'not-found';

    return html`
      <docs-sidebar
        class="shell-sidebar"
        .sections=${this.sections}
        .activeId=${page?.id}
        .searchEntries=${this.searchEntries}
      ></docs-sidebar>
      <docs-topbar
        class="shell-topbar"
        .globals=${this.globals}
        @globals-change=${this.onGlobalsChange}
      ></docs-topbar>
      <docs-nav-mobile
        class="shell-nav-mobile"
        .sections=${this.sections}
        .activeId=${page?.id}
        location=${page ? getLocationLabel(page) : ''}
        .globals=${this.globals}
        .searchEntries=${this.searchEntries}
        @globals-change=${this.onGlobalsChange}
        @nav-mobile-toggle=${(event: CustomEvent<boolean>) => (this.mobileNavOpen = event.detail)}
      ></docs-nav-mobile>
      <main class="shell-main" ?inert=${this.mobileNavOpen}>
        ${this.loadError
          ? this.renderMessage(
              'The documentation could not be loaded',
              'Please reload the page. If the problem persists, the Storybook index is not available.',
            )
          : nothing}
        ${notFound
          ? this.renderMessage(
              'Page not found',
              'The page you are looking for does not exist or has been moved.',
            )
          : nothing}
        ${this.previewSrc
          ? html`<docs-preview
              .src=${this.previewSrc}
              .loading=${this.previewLoading}
              ?hidden=${notFound}
            ></docs-preview>`
          : nothing}
      </main>
    `;
  }

  private renderMessage(title: string, text: string) {
    return html`<div class="shell-message">
      <h1>${title}</h1>
      <p>${text}</p>
      <p><a href="/">Go to the homepage</a></p>
    </div>`;
  }

  private async init() {
    try {
      this.catalog = await Catalog.load();
    } catch (error) {
      console.error(error);
      this.loadError = true;
      return;
    }

    this.navigate(new URL(location.href), { replace: true });
  }

  /**
   * Shows the page for the given URL and updates the address bar.
   * A URL without globals keeps the current ones (on the first load: the stored ones).
   */
  private navigate(target: URL, { replace = false, fromHistory = false } = {}) {
    if (!this.catalog) return;

    const { devMode, url: withoutDevMode } = readDevMode(target);
    this.devMode = devMode;
    this.setGlobals(readGlobalsFromUrl(withoutDevMode) ?? this.globals);
    const url = writeGlobalsToUrl(withoutDevMode, this.globals);

    const resolution = resolveUrl(url, this.catalog, this.globals);
    if (resolution.type === 'redirect') {
      location.replace(resolution.url);
      return;
    }

    const address =
      resolution.type === 'page' && resolution.canonical
        ? resolution.canonical
        : `${url.pathname}${url.search}${url.hash}`;
    const isCurrent = address === `${location.pathname}${location.search}${location.hash}`;
    if (fromHistory || replace || isCurrent) history.replaceState(null, '', address);
    else history.pushState(null, '', address);

    const previous = this.route;
    this.route = resolution;
    this.mobileNav?.close();

    if (resolution.type !== 'page') {
      document.title = SITE_TITLE;
      return;
    }

    const { page, hash } = resolution;
    document.title = `${page.segments.at(-1)} · ${SITE_TITLE}`;

    const previewPage: PreviewPage = {
      id: page.id,
      url: `${location.origin}${page.path}`,
      params: getPageParams(new URL(address, location.href).searchParams),
    };
    const previousPage = previous?.type === 'page' ? previous : undefined;
    const samePage = previousPage?.page.id === page.id;
    if (!samePage) trackPage();

    if (!this.previewSrc) {
      this.pendingHash = hash;
      this.setPreviewLoading('first');
      this.bridge.setInitialState(previewPage, this.globals);
      const globalsParam = stringifyGlobalsParam(this.globals);
      this.previewSrc = buildPreviewUrl(
        page.id,
        'docs',
        new URLSearchParams({
          ...(globalsParam ? { globals: globalsParam } : {}),
          ...previewPage.params,
        }),
      );
    } else if (samePage) {
      this.bridge.updatePage(previewPage);
      if (hash !== previousPage?.hash || !fromHistory) this.bridge.scrollToHash(hash);
    } else {
      this.pendingHash = hash;
      this.setPreviewLoading('page');
      this.bridge.showPage(previewPage);
    }
  }

  /**
   * Covers the preview while a page is being rendered; see `docs-preview`.
   */
  private setPreviewLoading(loading: PreviewLoading | undefined) {
    clearTimeout(this.loadingTimeout);
    this.previewLoading = loading;
    if (loading) {
      this.loadingTimeout = setTimeout(() => (this.previewLoading = undefined), LOADING_TIMEOUT);
    }
  }

  /**
   * Makes the globals current: in the preview and in storage. The caller updates the URL.
   */
  private setGlobals(globals: DocsGlobals) {
    if (!sameGlobals(globals, this.globals)) {
      this.globals = globals;
      storeGlobals(globals);
    }
    this.bridge.updateGlobals(globals);
  }

  /**
   * A toolbar choice: the URL is rewritten in place, so it does not add a history entry.
   */
  private readonly onGlobalsChange = (event: CustomEvent<DocsGlobals>) => {
    this.setGlobals(event.detail);
    const url = writeGlobalsToUrl(new URL(location.href), this.globals);
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  };

  private onPageRendered(id: string) {
    if (this.route?.type !== 'page' || this.route.page.id !== id) return;

    this.setPreviewLoading(undefined);
    if (this.pendingHash === null) return;

    this.bridge.scrollToHash(this.pendingHash);
    this.pendingHash = null;
  }

  private onSelectStory(payload: SelectStoryPayload) {
    const page =
      'storyId' in payload
        ? this.catalog?.getById(payload.storyId)
        : this.catalog?.getByTitle(payload.title);

    if (page) this.navigate(new URL(page.path, location.href));
  }

  /**
   * ⌘K / Ctrl+K focuses the search: in the sidebar, or in the mobile navigation, which it opens.
   * Key presses in the preview arrive through the bridge; they return whether they were handled.
   */
  private onShortcut(key: KeyPress): boolean {
    if (!(key.metaKey || key.ctrlKey) || key.altKey || key.shiftKey) return false;
    if (key.key.toLowerCase() !== 'k') return false;

    if (globalThis.matchMedia(SIDEBAR_QUERY).matches) this.sidebar?.focusSearch();
    else this.mobileNav?.openSearch();
    return true;
  }

  private readonly onDocumentKeydown = (event: KeyboardEvent) => {
    if (this.onShortcut(event)) event.preventDefault();
  };

  private readonly onPopState = () => {
    this.navigate(new URL(location.href), { fromHistory: true });
  };

  /**
   * Opens internal links (sidebar, logo, messages) without reloading the shell.
   */
  private readonly onDocumentClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = event
      .composedPath()
      .find(
        (el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && el.hasAttribute('href'),
      );
    if (
      !anchor ||
      (anchor.target && anchor.target !== '_self') ||
      anchor.hasAttribute('download')
    ) {
      return;
    }

    const url = new URL(anchor.href);
    // files (iframe.html, assets) are not shell routes
    if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;

    event.preventDefault();
    this.navigate(url);
  };
}

/**
 * The location shown in the mobile navigation bar, e.g. "Components/Button".
 */
function getLocationLabel(page: DocsPage): string {
  const [root] = page.segments;
  const name = page.segments.at(-1);

  if (root === HOME_ROOT) return `Home/${name}`;
  if (FLAT_ROOTS.includes(root)) return name ?? '';
  return `${root}/${name}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-shell': DocsShell;
  }
}
