import { html, LitElement, nothing } from 'lit';
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
          href="/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v8-to-v9"
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
                        <a href="https://angular.dev/update-guide?v=18.0-19.0"
                          >https://angular.dev/update-guide</a
                        >
                        to update Angular to version 19
                      </p>
                    </li>
                    <li>
                      <p>
                        <i>If used within your project</i>, upgrade PrimeNG to version 19:
                        <code languages="['bash']">npm install primeng@19</code>
                      </p>
                    </li>
                  `
                : nothing}
              <li>
                <p>
                  Update Design System styles and components packages to version 9:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@9</code>
                  <code languages="['bash']"
                    >npm install
                    @swisspost/design-system-components${this.angular
                      ? '-angular'
                      : nothing}@9</code
                  >
                </p>
              </li>
            </ol>
          </li>
          <li>
            <h3>Component Migration</h3>
            <ol>
              <li class="mb-16">
                <p>
                  The <code>post-tooltip</code> now has its own <code>post-tooltip-trigger</code>,
                  meaning that the attribute <code>data-tooltip-target=""</code> is no longer
                  effective.
                  <span class="tag tag-sm tag-danger">breaking</span>
                </p>
                <p class="info">
                  Instead of using the attribute, you should now wrap your target in the
                  <code>post-tooltip-trigger</code> component.
                </p>
              </li>
              <li class="mb-16">
                <p>
                  The default value of the arrow property for the
                  <code>post-tooltip</code> component has changed to <code>false</code>, meaning
                  that tooltips don't display arrows by default anymore.
                  <span class="tag tag-sm tag-danger">breaking</span>
                </p>
                <p class="info">
                  If you want to add an arrow to your tooltip, use the
                  <code>arrow="true"</code> property on the component.
                </p>
              </li>
              ${this.angular
                ? html`
                    <li class="mb-16">
                      <p>
                        The <code>PrimeNGConfig</code> has been replaced by <code>PrimeNG</code> and
                        the initial configuration is now done via the
                        <code>providePrimeNG</code> provider during startup.
                      </p>
                      <p class="info">
                        See the
                        <a href="https://primeng.org/guides/migration">PrimeNg migration guide</a>
                        and
                        <a href="/?path=/docs/d2112bed-c611-4098-a1ad-e654f7d622e7--docs"
                          >PrimeNg Styles package documentation</a
                        >
                        for more detailed information.
                      </p>
                    </li>
                  `
                : nothing}
            </ol>
          </li>

          <li>
            <h3>Deprecation notice</h3>
            <p>
              This is the last major release that supports
              <a href="https://getbootstrap.com/">bootstrap</a>${this.angular
                ? html` and
                    <a href="https://ng-bootstrap.github.io/#/home">@ng-bootstrap/ng-bootstrap</a>`
                : nothing}.
              Support for these packages will be dropped with v10. Long term support for v9 will be
              active until the end of 2025 and will receive critical bugfixes.
            </p>
            <p>
              Bootstrap will be removed as a dependency for the Design System. For easy upgrades in
              the future, the component structure and class names will remain the same, only the
              styles in the background will be switched to the new token system.
            </p>
            <p>
              Certain utility classes will no longer be available from the Design System due to this
              change. However, projects that need them can add the bootstrap library as their
              dependency and conditionally import the needed files. More information on this change
              will be detailed in the migration guide for v10.
            </p>
            ${this.angular
              ? html`<p>
                  Any ng-bootstrap components will be replaced by web components and available for
                  Angular users with the
                  <a
                    href="https://design-system.post.ch/?path=/docs/833ef689-a573-40f5-a6a6-30a999b94733--docs"
                    >@swisspost/design-system-components-angular</a
                  >
                  package. With this change, we will limit our dependency on Angular to the
                  components-angular package which allows us to ship Angular upgrades much faster in
                  the future.
                </p>`
              : nothing}
          </li>
        </ol>
      </section>
    `;
  }
}
