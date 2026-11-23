import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HOME_PAGE_ID, PREVIEW_ORIGIN } from './config';
import './preview/docs-preview';

/**
 * The documentation shell, which replaces Storybook's manager UI.
 */
@customElement('docs-shell')
export class DocsShell extends LitElement {
  // light DOM, so the design-system styles and `shell.scss` apply
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
