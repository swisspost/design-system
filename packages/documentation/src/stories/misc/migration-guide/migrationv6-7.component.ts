import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { _templateAutoIcon } from './util/template.util';

@customElement('migration-version-6-7')
export class MigrationV67Component extends LitElement {
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
    if (!this.currentVersion || this.currentVersion > 6) return nothing;

    return html`
      <h2 id="migration-from-v6-to-v7" class="docs-autolink">
        Migration from v6 to v7
        <a
          aria-hidden="true"
          tabindex="-1"
          href="/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v6-to-v7"
        >
          <post-icon name="2037"></post-icon>
        </a>
      </h2>
      <section>
        <ol class="bubble-tea">
          <li>
            <h3>Package Update 🩺</h3>
            <ol>
              ${
                this.angular
                  ? html`
                      <li>
                        <p>
                          Use
                          <a href="https://update.angular.io/"> https://update.angular.io/ </a>
                          to update Angular to version 17
                        </p>
                      </li>
                    `
                  : nothing
              }
              ${
                this.angular
                  ? html`
                      <li>
                        <p>
                          Update ng-bootstrap to version
                          <a
                            href="https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CHANGELOG.md#1600-2023-11-22"
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
                  : nothing
              }

              <li>
                <p>
                  Update Design System style package to version 7:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@7</code>
                </p>
              </li>
            </ol>
          </li>
          ${
            this.angular
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
              : nothing
          }
          <li>
            <h3>Component Migration 🤓</h3>
            ${
              this.angular
                ? html`
                    <p class="info">
                      Changes flagged with the ⚙️ symbol should be automatically migrated with our
                      migration tool.
                    </p>
                  `
                : nothing
            }

            <section>
              <h4>Styles</h4>

              <ul>
                <li class="mb-16">
                  <p>
                    Removed the following <em>color</em> variables
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$success-green</code></li>
                    <li><code>$error-red</code> and <code>$danger</code></li>
                    <li><code>$warning-orange</code></li>
                    <li><code>$success-text</code></li>
                    <li><code>$error-text</code></li>
                  </ul>
                  <p class="info">
                    Instead use the variables <code>$success</code>, <code>$error</code> and
                    <code>$warning</code>.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the Sass map <code>$contextual-colors</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">Instead use the map <code>$signal-colors</code>.</p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the Sass variable <code>$gray-background-light</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">Instead use the variable <code>$light</code>.</p>
                </li>
                <li class="mb-16">
                  <p>
                    Renamed the Sass variable <code>$gray-background</code> to <code>$gray</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the following classes out of the <em>background-utilities</em>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.bg-success-green</code></li>
                    <li><code>.bg-error-red</code></li>
                    <li><code>.bg-warning-orange</code></li>
                    <li><code>.bg-danger</code></li>
                  </ul>
                  <p class="info">
                    Instead use the classes <code>.bg-success</code>, <code>.bg-error</code> and
                    <code>.bg-warning</code>.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Restricted the <em>badge</em> usage to showcasing counts exclusively ⚙️
                    <span class="tag tag-sm tag-danger">breaking</span>
                    <p class="info">
                      Use
                      <a href="/?path=/docs/1b1ea384-7421-4064-ad34-e3f48a36b39f--docs">tags</a>
                      to display states, properties, or other metadata. Opt for
                      <a href="/?path=/docs/12576d97-52c3-49ec-be7b-6d37728b75f5--docs">chips</a>
                      when presenting dismissible or selectable information.
                    </p>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Updated the <em>badge</em> color to red.
                  </p>
                  <p class="info">
                    Use the
                    <a href="/?path=/docs/60852fac-a861-4415-8276-bd38d68653bb--docs">background utility classes</a>
                    to change the badge color as needed.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h4>Web Components</h4>

              <ul>
                <li class="mb-16">
                  <p>
                    Updated the package entry file paths within the <em>package.json</em> to the
                    paths, recommended by stencil
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li>
                      updated the <code>main</code> property from
                      <code>loader/index.cjs.js</code> to <code>dist/index.cjs.js</code>
                    </li>
                    <li>
                      updated the <code>module</code> property from <code>loader/index.js</code> to
                      <code>dist/loader.js</code>
                    </li>
                    <li>
                      updated the <code>types</code> property from <code>loader/index.d.ts</code> to
                      <code>dist/types/index.d.ts</code>
                    </li>
                    <li>removed the <code>es2017</code> property</li>
                  </ul>
                  <p class="info">
                    The usage of the <code>@swisspost/design-system-components/loader</code> entry
                    files are still available and should be used (as documented) to get the
                    lazy-loaded components.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Renamed all <em>custom-events</em> in our existing web-components
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li>
                      <em>post-alert</em> components <code>dismissed</code> event became
                      <code>postDismissed</code>
                    </li>
                    <li>
                      <em>post-collapsible</em> components <code>collapseChange</code> event became
                      <code>postToggle</code>
                    </li>
                    <li>
                      <em>post-rating</em> components <code>input</code> and
                      <code>change</code> events became <code>postInput</code> and
                      <code>postChange</code>
                    </li>
                    <li>
                      <em>post-tabs</em> components <code>tabChange</code> event became
                      <code>postChange</code>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h4>NgBootstrap</h4>

              <ul>
                ${
                  this.angular
                    ? html`
                        <li class="mb-16">
                          <h5>
                            ngbAccordion
                            <span class="tag tag-sm tag-danger">breaking</span>
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
                    : nothing
                }
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
