import { html, LitElement, nothing } from 'lit';
import { _templateAutoIcon } from '@/stories/getting-started/migration-guide/util/template.util';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-version-8-9')
export class MigrationV89Component extends LitElement {
  @property({ type: Number }) currentVersion?: number;
  @property({ type: String }) environment?: string;
  @property({ type: Boolean }) angular?: boolean;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  render() {
    if (!this.currentVersion || this.currentVersion > 8) return nothing;

    return html`
      <h2 id="migration-from-v8-to-v9" class="docs-autolink">
        Migration from v8 to v9
        <a
          aria-hidden="true"
          tabindex="-1"
          href="http://localhost:9000/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v8-to-v9"
        >
          <post-icon name="2037"></post-icon>
        </a>
      </h2>
      <section>
        <ol class="bubble-tea">
          <li>
            <h3>Component Migration 🤓</h3>

            <section>
              <h4>Styles</h4>

              <ul>
                <li class="mb-3">
                  <p>
                    Removed deprecated line-height variables
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$line-heights</code></li>
                    <li><code>$line-height-tiny</code></li>
                    <li><code>$line-height-small</code></li>
                    <li><code>$line-height-regular</code></li>
                    <li><code>$line-height-bigger-regular</code></li>
                    <li><code>$line-height-medium</code></li>
                    <li><code>$line-height-large</code></li>
                    <li><code>$line-height-small-big</code></li>
                    <li><code>$line-height-big</code></li>
                    <li><code>$line-height-bigger-big</code></li>
                    <li><code>$line-height-small-huge</code></li>
                    <li><code>$line-height-huge</code></li>
                  </ul>
                </li>
                <li class="mb-3">
                  <p>
                    Removed grid container helper classes
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.vertical-gutters</code></li>
                    <li><code>.row.border-gutters</code></li>
                    <li><code>.container-reset</code></li>
                    <li>
                      <code>.container-reset-left</code> and <code>.container-reset-right</code>
                    </li>
                    <li><code>.container-fluid-#{$breakpoint}</code></li>
                  </ul>
                </li>
              </ul>
            </section>
          </li>
        </ol>
      </section>
    `;
  }

  private _templateAutoIconAngular() {
    return html` ${this.angular ? _templateAutoIcon() : nothing} `;
  }
}
