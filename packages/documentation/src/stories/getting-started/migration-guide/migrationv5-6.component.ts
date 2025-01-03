import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { _templateAutoIcon } from './util/template.util';

@customElement('migration-version-5-6')
export class MigrationV56Component extends LitElement {
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
    if (!this.currentVersion || this.currentVersion > 5) return nothing;

    return html`
      <h2 id="migration-from-v5-to-v6" class="docs-autolink">
        Migration from v5 to v6
        <a
          aria-hidden="true"
          tabindex="-1"
          href="#migration-from-v5-to-v6"
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
                        <a href="https://update.angular.io/"> https://update.angular.io/ </a>
                        to update Angular to version 16
                      </p>
                    </li>
                  `
                : nothing}

              <li>
                <p>
                  Update Bootstrap to version
                  <a href="https://getbootstrap.com/docs/5.3/migration">5.3.x</a>
                  ${this.angular
                    ? html`
                        and ng-bootstrap to version
                        <a
                          href="https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md#1500-2023-05-25"
                        >
                          15.x.x
                        </a>
                      `
                    : nothing}
                  :
                  <code languages="['bash']">
                    npm install bootstrap@5.3
                    ${this.angular ? html` @ng-bootstrap/ng-bootstrap@15 ` : nothing}
                  </code>
                </p>
              </li>
              <li>
                <p>
                  Update Design System style package to version 6:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@6</code>
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
                        npx ng update @swisspost/design-system-migrations --from=5 --to=6
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
            <h4>Accessibility</h4>
            <ul>
              <li>
                <h5>
                  Stepper
                  <span class="tag tag-sm tag-danger">breaking</span>
                </h5>
                <p>
                  The markup of the
                  <a href="https://archive.design-system.post.ch/#/post-samples/stepper">stepper</a>
                  component has been changed in order to be more accessible.
                </p>
                <ul>
                  <li>
                    ${this._templateAutoIconAngular()} The stepper container no longer has an
                    aria-label attribute but contains a hidden header instead
                  </li>
                  <li>
                    ${this._templateAutoIconAngular()} The progress bar is hidden and no longer
                    requires a type attribute
                  </li>
                  <li>${this._templateAutoIconAngular()} The stepper has a list role</li>
                  <li>Completed steps require an additional hidden "Completed: " text</li>
                  <li>Current and incomplete steps should not be links</li>
                </ul>
              </li>
            </ul>
            <h4>Deprecations</h4>
            <ul>
              ${this.angular
                ? html`
                    <li>
                      <h5>
                        ngbButton ⚙️
                        <span class="tag tag-sm tag-danger">breaking</span>
                      </h5>
                      <p>
                        The
                        <em>ngbButton</em>
                        and
                        <em>ngbButtonLabel</em>
                        directives are no longer a part of ng-bootstrap.
                        <br />
                        The markup and styles have changed and everything now works with CSS
                        Bootstrap classes only.
                      </p>
                      <p class="info">
                        See the
                        <a href="/?path=/docs/021d61aa-e039-4858-b4b9-b86a3e772811--docs"
                          >documentation</a
                        >
                        for more detailed information.
                      </p>
                    </li>
                  `
                : nothing}
              <li>
                <h5>
                  Removed variables
                  <span class="tag tag-sm tag-danger">breaking</span>
                </h5>
                <p>
                  The following Sass variables have been removed because they are not being used
                  anymore.
                </p>
                <ul>
                  <li><code>$table-head-bg</code></li>
                </ul>
              </li>
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
