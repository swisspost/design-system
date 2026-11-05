import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * The yellow band at the top of the content column. Below the `md` breakpoint, where the sidebar
 * is hidden, it also holds the logo.
 */
@customElement('docs-topbar')
export class DocsTopbar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <post-logo class="topbar-logo" url="/"
        >Swiss Post Design System, go to the homepage</post-logo
      >
      <div class="topbar-controls"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-topbar': DocsTopbar;
  }
}
