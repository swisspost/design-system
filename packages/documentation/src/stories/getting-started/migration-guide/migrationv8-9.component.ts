import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { _templateAutoIcon } from './util/template.util';

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
            ${this.angular
                ? html`
                    <p class="info">
                      Changes flagged with the ⚙️ symbol should be automatically migrated with our
                      migration tool.
                    </p>
                  `
                : nothing
            }

            <section>
              <h4>Web Components</h4>
              <ul>
                <li class="mb-3">
                  <p>
                    Removed the heading-level property from the <em>post-accordion-item</em>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">
                    Instead use the heading-level property of the 
                    <a href="/?path=/docs/4d1b4185-e04d-494a-ab38-2b56c1778b0b--docs">post-accordion</a
                    > component to specify the heading size.
                  </p>
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
