import { LitElement, type PropertyValues, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PreviewConnection } from '../../bridge/preview-connection';
import './post-docs-preview.scss';

// a page that takes longer is shown as it is
const LOADING_TIMEOUT = 10_000;

/**
 * - `first`: the first page, the spinner shows right away.
 * - `page`: another page, the spinner shows only if it takes a while, so that quick changes show none.
 */
export type PreviewLoading = 'first' | 'page';

/** The preview iframe, covered while a page renders, so that the page appears in one piece. */
@customElement('post-docs-preview')
export class PostDocsPreview extends LitElement {
  @property() public src = '';
  @property({ attribute: false }) public connection: PreviewConnection | null = null;
  @property({ attribute: 'data-loading', reflect: true }) public loading: PreviewLoading | null =
    null;

  @state() private isTimedOut = false;

  private timeout: number | null = null;

  override createRenderRoot() {
    return this;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.connection?.disconnect();
    this.clearTimeout();
  }

  /** Moves the focus into the page, e.g. to read it with the keyboard. */
  public override focus() {
    // after the current event: Firefox ignores a focus move into the frame during the key press that causes it
    const frame = this.querySelector('iframe');
    window.setTimeout(() => frame?.focus(), 0);
  }

  protected override willUpdate(changed: PropertyValues) {
    if (!changed.has('loading')) return;

    this.clearTimeout();
    this.isTimedOut = false;

    if (this.loading) {
      this.timeout = window.setTimeout(() => (this.isTimedOut = true), LOADING_TIMEOUT);
    }
  }

  override updated() {
    const frame = this.querySelector('iframe');
    if (frame) this.connection?.connect(frame);
  }

  override render() {
    const isCovered = this.loading !== null && !this.isTimedOut;

    return html`
      <iframe
        class="d-block w-full h-full border-0"
        title="Documentation page"
        allow="clipboard-write"
        src=${this.src}
      ></iframe>
      ${isCovered
        ? html`
            <div class="spinner-bg palette palette-default">
              <div class="spinner-modal">
                <div class="spinner spinner-40 m-auto" role="status" aria-live="polite">
                  <span class="visually-hidden">Loading the page…</span>
                </div>
              </div>
            </div>
          `
        : nothing}
    `;
  }

  private clearTimeout() {
    if (this.timeout !== null) window.clearTimeout(this.timeout);
    this.timeout = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-preview': PostDocsPreview;
  }
}
