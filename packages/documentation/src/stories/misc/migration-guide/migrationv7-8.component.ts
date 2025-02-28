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
                        <a href="https://update.angular.io/">https://update.angular.io/</a>
                        to update Angular to version 18
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
                        >
                          17.x.x
                        </a>
                        :
                        <code languages="['bash']">
                          npm install @ng-bootstrap/ng-bootstrap@17
                        </code>
                      </p>
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
            <h3>Deprecation notice</h3>
            <p>
              This is the last major release that supports
              <a href="https://getbootstrap.com/">bootstrap</a>${this.angular ? html` and
              <a href="https://ng-bootstrap.github.io/#/home">@ng-bootstrap/ng-bootstrap</a>` : nothing}.
              Support for these packages will be dropped with v9. Long term support for v8 will be
              active until the end of 2025 and will receive critical bugfixes.
            </p>
            <p>
              Bootstrap will be removed as a dependency for the Design System. For easy upgrades in
              the future, the component structure and class names will remain the same, only the
              styles in the background will be switched to the new token system.
            </p>
            <p>
              Certain utility classes will no longer be avaiable from the Design System due to this
              change. However, projects that need them can add the bootstrap library as their
              dependency and conditionally import the needed files. More information on this change
              will be detailed in the migration guide for v9.
            </p>
            ${this.angular ? html`<p>
              Any ng-bootstrap components will be replaced by web components and available for
              Angular users with the
              <a
                href="https://design-system.post.ch/?path=/docs/833ef689-a573-40f5-a6a6-30a999b94733--docs"
                >@swisspost/design-system-components-angular</a
              >
              package. With this change, we will limit our dependency on Angular to the
              components-angular package which allows us to ship Angular upgrades much faster in the
              future.
            </p>` : nothing}
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
