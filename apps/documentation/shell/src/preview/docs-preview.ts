import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PREVIEW_IFRAME_ID } from '../storybook/bridge';

/**
 * The embedded Storybook preview.
 * `src` is only set for the first page; later pages are shown through the channel, without a reload.
 */
@customElement('docs-preview')
export class DocsPreview extends LitElement {
  @property() src = '';

  createRenderRoot() {
    return this;
  }

  render() {
    // `data-is-storybook` and the id are required by Storybook's channel to accept the iframe's messages
    return html`<iframe
      id=${PREVIEW_IFRAME_ID}
      class="preview-frame"
      title="Documentation page"
      data-is-storybook="true"
      src=${this.src}
      @load=${this.onLoad}
    ></iframe>`;
  }

  private onLoad(event: Event) {
    (event.target as HTMLIFrameElement).setAttribute('data-is-loaded', 'true');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-preview': DocsPreview;
  }
}
