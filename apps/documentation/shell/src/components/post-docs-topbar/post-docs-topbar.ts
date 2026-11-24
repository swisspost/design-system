import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../post-docs-version-menu/post-docs-version-menu';
import './post-docs-topbar.scss';

@customElement('post-docs-topbar')
export class PostDocsTopbar extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`
      <post-logo class="flex-shrink-0 h-40" url="/">
        Swiss Post Design System, go to the homepage
      </post-logo>
      <post-docs-version-menu
        class="d-flex flex-shrink-0 ms-auto pe-16 pe-md-0"
      ></post-docs-version-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-topbar': PostDocsTopbar;
  }
}
