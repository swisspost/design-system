import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { stringifyGlobals } from '@shared/globals';
import { previewUrl } from '@shared/urls';

import { PREVIEW_ORIGIN, SITE_TITLE } from '../../config';
import { type PreviewMessageEvent, PreviewConnection } from '../../bridge/preview-connection';
import { Catalog } from '../../catalog';
import { type GlobalsChangeEvent, GlobalsStore } from '../../globals/globals-store';
import type { Route } from '../../router/route';
import { type RouteChangeEvent, Router } from '../../router';
import '../post-docs-preview/post-docs-preview';
import '../post-docs-topbar/post-docs-topbar';
import './post-docs-shell.scss';

@customElement('post-docs-shell')
export class PostDocsShell extends LitElement {
  @state() private route: Route | null = null;
  @state() private failed = false;
  @state() private previewSrc: string | null = null;

  private readonly previewConnection = new PreviewConnection(PREVIEW_ORIGIN);
  private readonly globalsStore = new GlobalsStore();
  private router: Router | null = null;

  private pageId: string | null = null;
  private isRendering = false;

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
    this.previewConnection.removeEventListener('navigate', this.onNavigate);
    this.globalsStore.removeEventListener('globals-change', this.onGlobalsChange);
  }

  private async start() {
    this.previewConnection.addEventListener('rendered', this.onRendered);
    this.previewConnection.addEventListener('navigate', this.onNavigate);
    this.globalsStore.addEventListener('globals-change', this.onGlobalsChange);

    try {
      this.router = new Router(await Catalog.load());
      this.router.addEventListener('route-change', this.onRouteChange);
      this.router.start();
    } catch (error) {
      console.error(error);
      this.failed = true;
    }
  }

  private readonly onRouteChange = (event: Event) => {
    const { route, fromHistory } = event as RouteChangeEvent;
    this.route = route;

    const pageTitle = route.type === 'page' ? route.page.segments.at(-1) : 'Page not found';
    document.title = `${pageTitle} · ${SITE_TITLE}`;

    if (route.type !== 'page') return;

    // Back and Forward keep the current globals, the history entry may hold older ones
    if (route.globals && !fromHistory) this.globalsStore.set(route.globals);
    this.router?.replaceGlobals(this.globalsStore.current);

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
      if (!this.isRendering) this.previewConnection.scrollTo(hash);
    } else {
      this.pageId = page.id;
      this.isRendering = true;
    }
  };

  private readonly onRendered = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'rendered'>;
    if (payload.pageId !== this.pageId || !this.isRendering) return;

    this.isRendering = false;
    if (this.route?.type === 'page') this.previewConnection.scrollTo(this.route.hash);
  };

  private readonly onGlobalsChange = (event: Event) => {
    const { globals } = event as GlobalsChangeEvent;

    this.previewConnection.setGlobals(globals);
    this.router?.replaceGlobals(globals);
  };

  private readonly onNavigate = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'navigate'>;
    const url = new URL(payload.href, location.href);

    if (url.origin === location.origin) this.router?.navigate(url);
  };

  override render(): unknown {
    return html`
      <post-docs-topbar></post-docs-topbar>
      <main>${this.renderContent()}</main>
    `;
  }

  private renderContent(): unknown {
    if (this.failed) {
      return html`
        <div class="message py-40 px-16">
          <h1>Something went wrong</h1>
          <p>The documentation could not be loaded. Please try again later.</p>
        </div>
      `;
    }

    const notFound =
      this.route?.type === 'not-found'
        ? html`
            <div class="message py-40 px-16">
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist or has been moved.</p>
              <a href="/">Go to the homepage</a>
            </div>
          `
        : nothing;

    // the preview stays loaded, so that it shows the next page without a reload
    const preview = this.previewSrc
      ? html`
          <post-docs-preview
            src=${this.previewSrc}
            .connection=${this.previewConnection}
            class=${classMap({ loaded: this.route?.type === 'page' })}
          ></post-docs-preview>
        `
      : nothing;

    return html`${notFound}${preview}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-shell': PostDocsShell;
  }
}
