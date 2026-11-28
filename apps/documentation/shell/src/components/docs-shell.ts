import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HOME_PAGE_ID, PREVIEW_ORIGIN } from '../config';
import './docs-preview';

@customElement('docs-shell')
export class DocsShell extends LitElement {
  override createRenderRoot() {
    return this;
  }

  override render() {
    const src = `${PREVIEW_ORIGIN}/iframe.html?id=${HOME_PAGE_ID}&viewMode=docs`;

    return html`<docs-preview src=${src}></docs-preview>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-shell': DocsShell;
  }
}
