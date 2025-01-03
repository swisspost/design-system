import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './migrationv4-5-manual-list.component';

@customElement('migration-version-4-5')
export class MigrationV45Component extends LitElement {
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
    if (!this.currentVersion || this.currentVersion > 4) return nothing;

    return html`
      <h2 id="migration-from-v4-to-v5" class="docs-autolink">
        Migration from v4 to v5
        <a
          aria-hidden="true"
          tabindex="-1"
          href="#migration-from-v4-to-v5"
        >
          <post-icon name="2037"></post-icon>
        </a>
      </h2>
      <section>
        <ol class="bubble-tea">
          <li>
            <h3>Clean Start 🧹</h3>
            <p>
              Create a branch and commit all changes to have a clean, reversible starting point. If
              you like to upgrade from a Design System version lower than 4.0.0, it might be
              necessary to upgrade to v4 first.
            </p>
          </li>
          <li>
            <h3>Old Package Uninstallation 🗑️</h3>
            <p>
              Uninstall the old styles
              ${this._isIntranet() ? html`<span>and the old intranet header</span>` : nothing}
              package${this._isIntranet() ? html`<span>s</span>` : nothing}.
            </p>
            <code languages="['bash']">
              npm uninstall @******/common-web-frontend
              ${this._isIntranet() ? html` @******/common-web-frontend-intranet-header ` : nothing}
            </code>
          </li>
          <li>
            <h3>New Package Installation 📦</h3>
            <code languages="['bash']">
              npm install @swisspost/design-system-styles@5
              ${this._isIntranet() ? html` @swisspost/design-system-intranet-header@3 ` : nothing}
            </code>
          </li>
          <li>
            <h3>Package Update 🩺</h3>
            ${this.angular
              ? html`
                  <ol>
                    <li>
                      If your Angular version is lower than 13, use
                      <a href="https://update.angular.io/"> https://update.angular.io/ </a>
                      to update Angular step by step to version 13.
                    </li>
                    <li>${this._templateBootstrapInstructions()}</li>
                  </ol>
                `
              : nothing}
            ${!this.angular ? html` <p>${this._templateBootstrapInstructions()}</p> ` : nothing}
          </li>
          ${this.angular
            ? html`
                <li>
                  <h3>Automatic Migration ⚙️</h3>
                  <p>
                    If you are migrating an Angular application, you can take advantage of our
                    migration schematics.
                  </p>
                  <ol>
                    <li>Commit all the changes you have made so far</li>
                    <li>Make sure you are running on a node version >= 16</li>
                    <li>
                      You should now be able to run the following command to apply all automatic
                      migrations to your application:
                      <code languages="['bash']">
                        npm install @swisspost/design-system-migrations<br />
                        npx ng update @swisspost/design-system-migrations --from=4 --to=5
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
            <h4>Deprecations</h4>
            <ul class="mt-8 mb-16">
              <li>
                <p>
                  <strong>Dropped jQuery dependency</strong>
                  <br />
                  <span class="info">
                    Replace all jQuery components with the given one or integrate jQuery by your own
                    (not recommended).
                  </span>
                </p>
              </li>
              <li>
                <p>
                  The
                  <em>Custom-Select</em>
                  component has been marked as deprecated.
                  <span class="info">
                    For the moment there is only the alternative to use the
                    <em>Form-Select</em>
                    component instead. An alternative is being implemented.
                  </span>
                </p>
              </li>
            </ul>

            <h4>Migrations list</h4>
            <p>
              Some changes cannot be migrated automatically.
              <br />
              Check the list of changes below and apply the transformations manually if your
              application is affected.
            </p>

            <migration-version-4-5-manual-list
              .angular="${this.angular}"
              .environment="${this.environment}"
            ></migration-version-4-5-manual-list>
          </li>
          <li>
            <h3>Treat yourself to a 🍺, you've done a great job! 🚀</h3>
          </li>
        </ol>
      </section>
    `;
  }

  private _templateBootstrapInstructions() {
    return html`
      Update Bootstrap to version
      <a href="https://getbootstrap.com/docs/5.1/migration">5.1.x</a>
      <ng-container *ngIf="isMigratingAngular">
        and ng-bootstrap to version
        <a
          href="https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md#1400-2022-12-07"
        >
          12.x.x
        </a>
      </ng-container>
      :
      <code languages="['bash']">
        npm install bootstrap@5.1 ${this.angular ? html` @ng-bootstrap/ng-bootstrap@12 ` : nothing}
      </code>
    `;
  }

  private _isIntranet() {
    return this.environment === 'intranet';
  }
}
