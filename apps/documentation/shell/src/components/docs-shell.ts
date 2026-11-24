import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { previewUrl } from '@shared/urls';

import { PREVIEW_ORIGIN, SITE_TITLE } from '../config';
import { Catalog } from '../catalog';
import type { Route } from '../router/route';
import { type RouteChangeEvent, Router } from '../router';
import './docs-preview';

@customElement('docs-shell')
export class DocsShell extends LitElement {
  @state() private route: Route | null = null;
  @state() private failed = false;

  private router: Router | null = null;

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
  }

  private async start() {
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

    if (this.route?.type === 'not-found') {
      return html`
        <main class="container">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <a href="/">Go to the homepage</a>
        </main>
      `;
    }

    if (this.route?.type !== 'page') return nothing;

    // a new iframe per page, so that its navigation adds no history entry (until the bridge is in place)
    const { page, params } = this.route;
    const src = previewUrl(page.id, 'docs', params, PREVIEW_ORIGIN);

    return keyed(src, html`<docs-preview src=${src}></docs-preview>`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-shell': DocsShell;
  }
}
