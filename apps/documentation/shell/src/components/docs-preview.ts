import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PreviewConnection } from '../bridge/preview-connection';

@customElement('docs-preview')
export class DocsPreview extends LitElement {
  @property() src = '';
  @property({ attribute: false }) connection: PreviewConnection | null = null;

  override createRenderRoot() {
    return this;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.connection?.disconnect();
  }

  override updated() {
    const frame = this.querySelector('iframe');
    if (frame) this.connection?.connect(frame);
  }

  override render() {
    return html`
      <iframe
        class="preview-frame"
        title="Documentation page"
        allow="clipboard-write"
        src=${this.src}
      ></iframe>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-preview': DocsPreview;
  }
}
