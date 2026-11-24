import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { previewUrl } from '@shared/urls';

import { PREVIEW_ORIGIN, SITE_TITLE } from '../config';
import { type PreviewMessageEvent, PreviewConnection } from '../bridge/preview-connection';
import { Catalog } from '../catalog';
import type { Route } from '../router/route';
import { type RouteChangeEvent, Router } from '../router';
import './docs-preview';

@customElement('docs-shell')
export class DocsShell extends LitElement {
  @state() private route: Route | null = null;
  @state() private failed = false;
  @state() private previewSrc: string | null = null;

  private readonly previewConnection = new PreviewConnection(PREVIEW_ORIGIN);
  private router: Router | null = null;

  // the page shown in the preview, and whether it is still rendering
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
  }

  private async start() {
    this.previewConnection.addEventListener('rendered', this.onRendered);
    this.previewConnection.addEventListener('navigate', this.onNavigate);

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
    const { route } = event as RouteChangeEvent;
    this.route = route;

    const pageTitle = route.type === 'page' ? route.page.segments.at(-1) : 'Page not found';
    document.title = `${pageTitle} · ${SITE_TITLE}`;

    if (route.type !== 'page') return;

    const { page, params, hash } = route;
    this.previewSrc ??= previewUrl(page.id, 'docs', params, PREVIEW_ORIGIN);
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

  private readonly onNavigate = (event: Event) => {
    const { payload } = event as PreviewMessageEvent<'navigate'>;
    const url = new URL(payload.href, location.href);

    if (url.origin === location.origin) this.router?.navigate(url);
  };

  override render(): unknown {
    if (this.failed) {
      return html`
        <main class="container">
          <h1>Something went wrong</h1>
          <p>The documentation could not be loaded. Please try again later.</p>
        </main>
      `;
    }

    const notFound =
      this.route?.type === 'not-found'
        ? html`
            <main class="container">
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist or has been moved.</p>
              <a href="/">Go to the homepage</a>
            </main>
          `
        : nothing;

    // the preview stays loaded, so that it shows the next page without a reload
    const preview = this.previewSrc
      ? html`
          <docs-preview
            src=${this.previewSrc}
            .connection=${this.previewConnection}
            class=${classMap({ loaded: this.route?.type === 'page' })}
          ></docs-preview>
        `
      : nothing;

    return html`${notFound}${preview}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-shell': DocsShell;
  }
}
