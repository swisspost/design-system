import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { _templateAutoIcon } from './util/template.util';

@customElement('migration-version-6-7')
export class MigrationV56Component extends LitElement {
  @property({ type: String }) version?: string;
  @property({ type: String }) environment?: string;
  @property({ type: Boolean }) angular?: boolean;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  render() {
    if (this.version !== 'v6-to-v7') return nothing;

    return html`
      <h2 id="migration-from-v6-to-v7" class="docs-autolink">
        Migration from v6 to v7
        <a
          aria-hidden="true"
          tabindex="-1"
          href="http://localhost:9000/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v6-to-v7"
        >
          <post-icon name="2037"></post-icon>
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
                        <a href="https://update.angular.io/" target="_blank">
                          https://update.angular.io/
                        </a>
                        to update Angular to version 17
                      </p>
                    </li>
                  `
                : nothing}
              ${this.angular
                ? html`
                    <li>
                      <p>
                        Update ng-bootstrap to version
                        <a
                          href="https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md#1600-2023-11-22"
                          target="_blank"
                        >
                          16.x.x
                        </a>
                        :
                        <code languages="['bash']">
                          npm install @ng-bootstrap/ng-bootstrap@16
                        </code>
                      </p>
                    </li>
                  `
                : nothing}

              <li>
                <p>
                  Update Design System style package to version 7:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@7</code>
                </p>
              </li>
            </ol>
          </li>
          ${this.angular
            ? html`
                <li>
                  <h3>Automatic Migration ⚙️</h3>
                  <p>
                    For Angular application, you can take advantage of our migration schematics.
                  </p>
                  <ol>
                    <li>Commit all the changes you have made so far</li>
                    <li>Make sure you are running on a node version >= 16</li>
                    <li>
                      You should now be able to run the following command to apply all automatic
                      migrations to your application:
                      <code languages="['bash']">
                        npm install @swisspost/design-system-migrations<br />
                        npx ng update @swisspost/design-system-migrations --from=6 --to=7
                        --migrate-only --allow-dirty<br />
                        npm uninstall @swisspost/design-system-migrations
                      </code>
                    </li>
                  </ol>
                </li>
              `
            : nothing}
          <li>
            <h3>Component Migration 🤓</h3>
            ${this.angular
              ? html`
                  <p class="info">
                    Changes flagged with the ⚙️ symbol should be automatically migrated with our
                    migration tool.
                  </p>
                `
              : nothing}
            <ul>
              ${this.angular
                ? html`
                    <li>
                      <h5>
                        ngbAccordion
                        <span class="change-badge bg-danger">breaking</span>
                      </h5>
                      <p>
                        The
                        <em>ngb-accordion</em>
                        and
                        <em>ngb-panel</em>
                        component have been removed from ng-bootstrap.
                        <br />
                        Use the <em>post-accordion</em> component from the
                        <a href="/?path=/docs/833ef689-a573-40f5-a6a6-30a999b94733--docs"
                          >@swisspost/design-system-components-angular</a
                        >
                        package as a replacement.
                      </p>
                      <p class="info">
                        See the
                        <a href="/?path=/docs/4d1b4185-e04d-494a-ab38-2b56c1778b0b--docs"
                          >accordion component documentation</a
                        >
                        for more detailed information.
                      </p>
                    </li>
                  `
                : nothing}
            </ul>
          </li>
        </ol>
      </section>
    `;
  }

  private _templateAutoIconAngular() {
    return html` ${this.angular ? _templateAutoIcon() : nothing} `;
  }
}
