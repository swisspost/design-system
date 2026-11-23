import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * The embedded Storybook preview (`iframe.html`).
 */
@customElement('docs-preview')
export class DocsPreview extends LitElement {
  @property() src = '';

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<iframe class="preview-frame" title="Documentation page" src=${this.src}></iframe>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-preview': DocsPreview;
  }
}
