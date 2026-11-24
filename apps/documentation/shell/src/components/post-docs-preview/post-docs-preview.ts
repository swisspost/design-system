import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PreviewConnection } from '../../bridge/preview-connection';
import './post-docs-preview.scss';

@customElement('post-docs-preview')
export class PostDocsPreview extends LitElement {
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
        class="d-block w-full h-full border-0"
        title="Documentation page"
        allow="clipboard-write"
        src=${this.src}
      ></iframe>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-preview': PostDocsPreview;
  }
}
