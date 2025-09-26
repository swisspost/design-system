import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-version-7-8')
export class MigrationV78Component extends LitElement {
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
    if (!this.currentVersion || this.currentVersion > 7) return nothing;

    return html`
      <h2 id="migration-from-v7-to-v8" class="docs-autolink">
        Migration from v7 to v8
        <a
          aria-hidden="true"
          tabindex="-1"
          href="/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v7-to-v8"
        >
          <post-icon name="link"></post-icon>
        </a>
      </h2>
      <section>
        <ol class="bubble-tea">
          <li>
            <h3>Package Update 🩺</h3>
            <ol>
              ${this.angular
                ? html`
                    <li>
                      <p>
                        Use
                        <a href="https://update.angular.io/">Angular Update Guide</a>
                        to update Angular to version 18
                      </p>
                    </li>
                  `
                : nothing}
              ${this.angular
                ? html`
                    <li>
                      <div>
                        Update ng-bootstrap to version 17.x.x:
                        <code languages="['bash']">
                          npm install @ng-bootstrap/ng-bootstrap@17
                        </code>
                      </div>
                      <div class="mt-2">
                        See the
                        <a
                          href="https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md#1700-2024-xx-xx"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ng-bootstrap 17.x.x changelog
                        </a>
                        for more details.
                      </div>
                    </li>
                  `
                : nothing}

              <li>
                <p>
                  Update Design System style package to version 8:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@8</code>
                </p>
              </li>
            </ol>
          </li>

          <li>
            <h3>🥮 Rejoice</h3>
            <p>For there are no other breaking changes in this version.</p>
          </li>
        </ol>
      </section>
    `;
  }
}
