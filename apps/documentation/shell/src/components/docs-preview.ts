import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('docs-preview')
export class DocsPreview extends LitElement {
  @property() src = '';

  override createRenderRoot() {
    return this;
  }

  override render() {
    return html`<iframe class="preview-frame" title="Documentation page" src=${this.src}></iframe>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-preview': DocsPreview;
  }
}
