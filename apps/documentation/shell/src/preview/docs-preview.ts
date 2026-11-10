import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PREVIEW_IFRAME_ID } from '../storybook/bridge';

/**
 * While a page renders, the preview is covered, so it appears in one piece (see `shell.scss`).
 * - `first`: the first page; the spinner shows right away.
 * - `page`: another page; the spinner shows only if it takes a while, so quick changes show none.
 */
export type PreviewLoading = 'first' | 'page';

/**
 * The embedded Storybook preview.
 * `src` is only set for the first page; later pages are shown through the channel, without a reload.
 */
@customElement('docs-preview')
export class DocsPreview extends LitElement {
  @property() src = '';
  @property({ reflect: true }) loading?: PreviewLoading;

  createRenderRoot() {
    return this;
  }

  render() {
    // `data-is-storybook` and the id are required by Storybook's channel to accept the iframe's messages;
    // `clipboard-write` lets "Copy deep link" work when the preview runs on another origin (dev)
    return html`<iframe
        id=${PREVIEW_IFRAME_ID}
        class="preview-frame"
        title="Documentation page"
        data-is-storybook="true"
        allow="clipboard-write"
        src=${this.src}
        @load=${this.onLoad}
      ></iframe>
      <div class="preview-loading">
        <div>
          <div class="spinner spinner-40" role="status">
            ${this.loading ? html`<span class="visually-hidden">Loading the page…</span>` : nothing}
          </div>
        </div>
      </div>`;
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
