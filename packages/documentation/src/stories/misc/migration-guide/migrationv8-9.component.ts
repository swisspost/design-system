import { html, LitElement, nothing } from 'lit';
import { _templateAutoIcon } from './util/template.util';
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
                <li class="mb-16">
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
                <li class="mb-3">
                  <p>
                    Removed tooltip validation classes
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.valid-tooltip</code></li>
                    <li><code>.invalid-tooltip</code></li>
                  </ul>
                  <p class="info">
                    Instead use the classes <code>.valid-feedback</code> and
                    <code>.invalid-feedback</code>.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Changed the percentage sizing utility classes (<code>w-*</code>,
                    <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>) naming.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>*-25</code> is now <code>*-quarter</code></li>
                    <li><code>*-50</code> is now <code>*-half</code></li>
                    <li><code>*-75</code> is now <code>*-three-quarters</code></li>
                    <li><code>*-100</code> is now <code>*-full</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Changed the pixel sizing utility classes (<code>w-*</code>, <code>h-*</code>,
                    <code>mh-*</code>, <code>mw-*</code>) to pixel-based names.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>*-hair</code> is now <code>*-1</code></li>
                    <li><code>*-line</code> is now <code>*-2</code></li>
                    <li><code>*-micro</code> is now <code>*-4</code></li>
                    <li><code>*-mini</code> is now <code>*-8</code></li>
                    <li><code>*-small-regular</code> is now <code>*-12</code></li>
                    <li><code>*-regular</code> is now <code>*-16</code></li>
                    <li><code>*-small-large</code> is now <code>*-20</code></li>
                    <li><code>*-large</code> is now <code>*-24</code></li>
                    <li><code>*-big</code> is now <code>*-32</code></li>
                    <li><code>*-bigger-big</code> is now <code>*-40</code></li>
                    <li><code>*-small-huge</code> is now <code>*-48</code></li>
                    <li><code>*-huge</code> is now <code>*-56</code></li>
                    <li><code>*-small-giant</code> is now <code>*-72</code></li>
                    <li><code>*-giant</code> is now <code>*-80</code></li>
                    <li><code>*-bigger-giant</code> is now <code>*-112</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Changed the sizing utility classes max-height and max-width naming.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>mh-*</code> is now <code>max-h-*</code></li>
                    <li><code>mw-*</code> is now <code>max-w-*</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    The following bootstrap helper classes have been removed:
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li>
                      Figures: <code>.figure</code>, <code>.figure-img</code> and
                      <code>.figure-caption</code>
                    </li>
                    <li>Vertical rule: <code>.vr</code></li>
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
