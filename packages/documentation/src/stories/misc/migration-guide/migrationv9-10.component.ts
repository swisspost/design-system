import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-version-9-10')
export class MigrationV99Component extends LitElement {
  @property({ type: Number }) currentVersion?: number;
  @property({ type: String }) environment?: string;
  @property({ type: Boolean }) angular?: boolean;
  @property({ type: Boolean }) hideAutoMigration?: boolean;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  render() {
    if (!this.currentVersion || this.currentVersion > 9) return nothing;

    return html`
      <h2 id="migration-from-v9-to-v10" class="docs-autolink">
        Migration from v9 to v10
        <a
          aria-hidden="true"
          tabindex="-1"
          href="/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v9-to-v10"
        >
          <post-icon name="link"></post-icon>
        </a>
      </h2>

      <section>
        <ol class="bubble-tea">
          <li>
            <h3>Package Update 🩺</h3>
            <ol>
              <li>
                <p>
                  Update Design System styles and components packages to version 10:
                  <code languages="['bash']">npm install @swisspost/design-system-styles@10</code>
                  <code languages="['bash']">
                    npm install
                    @swisspost/design-system-components${this.angular ? '-angular' : nothing}@10
                  </code>
                </p>
              </li>
            </ol>
          </li>
          <li>
            <h3>Component Migration 🤓</h3>
            <div class="my-16">
              <div class="form-check">
                <input
                  id="hide-auto-migration"
                  type="checkbox"
                  class="form-check-input"
                  name="hide-auto-migration"
                  value="true"
                  @change="${this._onAutoMigrationChange}"
                  ?checked="${this.hideAutoMigration}"
                />
                <label for="hide-auto-migration" class="form-check-label">
                  Hide changes covered by the automatic <span class="tag tag-sm tag-info">🪄 migration rules</span>
                </label>
              </div>
            </div>
            <post-banner type="warning">
              <h4 slot="heading">Notice: Bootstrap & Ng-Bootstrap removed</h4>
              <p>
                As part of the latest migration, Bootstrap and Ng-Bootstrap have been fully removed from the design system. This means that any variables, classes, mixins, or utilities originating from Bootstrap and all components from Ng-Bootstrap are no longer available.
              </p>
              <p>
                However, <span class="fw-bold">many commonly used features from Bootstrap — such as the grid system (columns) and most utility classes — have been internalized into the design system</span>. You can continue using them through the design system without needing Bootstrap.<br/>
              </p>
              <p>
                If you encounter any broken styles or issues after upgrading, you have two options:
              </p>
              <ul>
                <li>Internalize the specific mixins or utilities you still rely on
                </li>
                <li>If issues persist, open a <a href="https://github.com/swisspost/design-system/issues">GitHub issue</a></li>
              </ul>
              <p>Please review your components and styles to ensure compatibility.
              </p><br/>

            </post-banner>

            <section>
              <h4>Ng-Bootstrap</h4>
              <p>Removed the following Ng-Bootstrap components:</p>
              <ul>
                <li>carousel</li>
                <li>custom select</li>
                <li>datatable</li>
                <li>datepicker</li>
                <li>dropdown</li>
                <li>modal</li>
                <li>notification overlay</li>
                <li>pagination</li>
                <li>progressbar</li>
                <li>timepicker</li>
                <li>typeahead</li>
              </ul>
            </section>

            <section>
              <h4>Styles</h4>

              <h5>Forms</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed tooltip validation classes
                  </p>
                  <ul>
                    <li><code>.valid-tooltip</code></li>
                    <li><code>.invalid-tooltip</code></li>
                  </ul>
                  <p class="info">
                    Instead, use classes <code>.valid-feedback</code> and
                    <code>.invalid-feedback</code>.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    <code>textarea</code>, <code>input</code> and <code>select</code> form elements
                    no longer have sizes, therefore the following classes have no more effect on
                    those elements
                  </p>
                  <ul>
                    <li><code>.form-control-sm</code></li>
                    <li><code>.form-control-rg</code></li>
                    <li><code>.form-control-lg</code></li>
                    <li><code>.form-select-sm</code></li>
                    <li><code>.form-select-rg</code></li>
                    <li><code>.form-select-lg</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The <code>.form-text</code> class has been renamed to <code>.form-hint</code>
                  </p>
                </li>
              </ul>

              <h5>Grid</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed grid container helper classes
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
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The <code>rg</code> and <code>xxl</code> breakpoints have been removed
                  </p>
                  <ul>
                    <li>All classes containing <code>*-rg-*</code> are no longer effective</li>
                    <li>All classes containing <code>*-xxl-*</code> are no longer effective</li>
                  </ul>
                  <p class="info">
                    <code>xs</code> now spans the previous <code>xs</code> and <code>sm</code>,
                    while <code>sm</code> spans the previous <code>rg</code>. <code>xl</code> now
                    spans both the previous <code>xl</code> and <code>xxl</code> breakpoints.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The gutter classes naming (<code>g-*</code>, <code>gx-*</code>,
                    <code>gy-*</code>) has changed to pixel-based names
                  </p>
                  <ul>
                    <li><code>*-1</code> is now <code>*-4</code></li>
                    <li><code>*-2</code> is now <code>*-8</code></li>
                    <li><code>*-3</code> is now <code>*-16</code></li>
                    <li><code>*-4</code> is now <code>*-24</code></li>
                    <li><code>*-5</code> is now <code>*-48</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    The gap classes naming (<code>gap-*</code>, <code>row-gap-*</code>,
                    <code>column-gap-*</code>) has changed to pixel-based names
                    <span class="tag tag-sm tag-danger">breaking</span> <span class="tag tag-sm tag-info">🪄 migration rule</span>
                  </p>
                  <ul>
                    <li><code>*-1</code> is now <code>*-4</code></li>
                    <li><code>*-2</code> is now <code>*-8</code></li>
                    <li><code>*-3</code> is now <code>*-16</code></li>
                    <li><code>*-4</code> is now <code>*-24</code></li>
                    <li><code>*-5</code> is now <code>*-48</code></li>
                  </ul>
                </li>
              </ul>

              <h5>Utilities</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Changed the percentage sizing utility classes (<code>w-*</code>,
                    <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>) naming
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
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Removed some pixel sizing utility classes (<code>w-*</code>, <code>h-*</code>,
                    <code>mh-*</code>, <code>mw-*</code>)
                  </p>
                  <ul>
                    <li><code>*-small-large</code></li>
                    <li><code>*-bigger-giant</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Changed the pixel sizing utility classes (<code>w-*</code>, <code>h-*</code>,
                    <code>mh-*</code>, <code>mw-*</code>) to pixel-based names
                  </p>
                  <ul>
                    <li><code>*-hair</code> is now <code>*-1</code></li>
                    <li><code>*-line</code> is now <code>*-2</code></li>
                    <li><code>*-micro</code> is now <code>*-4</code></li>
                    <li><code>*-mini</code> is now <code>*-8</code></li>
                    <li><code>*-small-regular</code> is now <code>*-12</code></li>
                    <li><code>*-regular</code> is now <code>*-16</code></li>
                    <li><code>*-large</code> is now <code>*-24</code></li>
                    <li><code>*-big</code> is now <code>*-32</code></li>
                    <li><code>*-bigger-big</code> is now <code>*-40</code></li>
                    <li><code>*-small-huge</code> is now <code>*-48</code></li>
                    <li><code>*-huge</code> is now <code>*-56</code></li>
                    <li><code>*-small-giant</code> is now <code>*-78</code></li>
                    <li><code>*-giant</code> is now <code>*-80</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Changed the sizing utility classes max-height and max-width naming
                  </p>
                  <ul>
                    <li><code>mh-*</code> is now <code>max-h-*</code></li>
                    <li><code>mw-*</code> is now <code>max-w-*</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Shadow utility classes have been removed
                  </p>
                  <ul>
                    <li>
                      Shadows: <code>.shadow-none</code>, <code>.shadow-sm</code>,
                      <code>.shadow</code> and <code>.shadow-lg</code>
                    </li>
                  </ul>
                  <p class="info">
                    We recommend using the <code>.elevation-*</code> classes instead.
                  </p>
                </li>

                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The following elevation utility classes have been renamed
                  </p>
                  <ul>
                    <li><code>.elevation-1</code> is now <code>.elevation-100</code></li>
                    <li><code>.elevation-2</code> is now <code>.elevation-200</code></li>
                    <li><code>.elevation-3</code> is now <code>.elevation-300</code></li>
                    <li><code>.elevation-4</code> is now <code>.elevation-400</code></li>
                    <li><code>.elevation-5</code> is now <code>.elevation-500</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Removed some spacing utilities' classes (margin and padding
                    <code>{m/p}{x/y/s/e/t/b}-*</code>)
                  </p>
                  <ul>
                    <li><code>*-small-large</code></li>
                    <li><code>*-bigger-giant</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Changed the spacing utilities' classes (margin and padding
                    <code>{m/p}{x/y/s/e/t/b}-*</code>) naming to pixel-based names
                  </p>
                  <ul>
                    <li><code>*-hair</code> is now <code>*-1</code></li>
                    <li><code>*-line</code> is now <code>*-2</code></li>
                    <li><code>*-micro</code> and <code>*-1</code> are now <code>*-4</code></li>
                    <li><code>*-mini</code> and <code>*-2</code> are now <code>*-8</code></li>
                    <li><code>*-small-regular</code> is now <code>*-12</code></li>
                    <li><code>*-regular</code> and <code>*-3</code> are now <code>*-16</code></li>
                    <li><code>*-large</code> and <code>*-4</code> are now <code>*-24</code></li>
                    <li><code>*-big</code> is now <code>*-32</code></li>
                    <li><code>*-bigger-big</code> is now <code>*-40</code></li>
                    <li>
                      <code>*-small-huge</code> and <code>*-5</code> are now <code>*-48</code>
                    </li>
                    <li><code>*-huge</code> is now <code>*-56</code></li>
                    <li><code>*-small-giant</code> is now <code>*-78</code></li>
                    <li><code>*-giant</code> is now <code>*-80</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    All background color classes (<code>bg-*</code>) have been removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Renamed some utility classes
                  </p>
                  <ul>
                    <li><code>.h-visuallyhidden</code> is now <code>.visually-hidden</code></li>
                    <li><code>.h-clearfix</code> is now <code>.clearfix</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed some utility classes
                  </p>
                  <ul>
                    <li>
                      <code>.spacer</code>
                    </li>
                    <li>
                      <code>.h-visuallyhidden-up-md</code>, <code>.h-visuallyhidden-down-rg</code>,
                      <code>.h-visuallyhidden-down-lg</code>
                    </li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Renamed border radius classes
                  </p>
                  <ul>
                    <li><code>.rounded</code> is now <code>.rounded-4</code></li>
                    <li><code>.rounded-{top/bottom/start/end}</code> are now <code>.rounded-{top/bottom/start/end}-4</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed all text color utility classes (<code>.text-*</code>)
                  </p>
                  <ul>
                    <li><code>.text-primary</code></li>
                    <li><code>.text-secondary</code></li>
                    <li><code>.text-light</code></li>
                    <li><code>.text-dark</code></li>
                    <li><code>.text-success</code></li>
                    <li><code>.text-warning</code></li>
                    <li><code>.text-error</code></li>
                    <li><code>.text-info</code></li>
                  </ul>
                </li>
              </ul>

              <h5>Typography</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Removed deprecated font size variables and classes
                  </p>
                  <ul>
                    <li><code>$font-size-12</code> and <code>.font-size-12</code></li>
                    <li><code>$font-size-14</code> and <code>.font-size-14</code></li>
                    <li><code>$font-size-16</code> and <code>.font-size-16</code></li>
                    <li><code>$font-size-18</code> and <code>.font-size-18</code></li>
                    <li><code>$font-size-20</code> and <code>.font-size-20</code></li>
                    <li><code>$font-size-24</code> and <code>.font-size-24</code></li>
                    <li><code>$font-size-28</code> and <code>.font-size-28</code></li>
                    <li><code>$font-size-32</code> and <code>.font-size-32</code></li>
                    <li><code>$font-size-40</code> and <code>.font-size-40</code></li>
                    <li><code>$font-size-48</code> and <code>.font-size-48</code></li>
                    <li><code>$font-size-56</code> and <code>.font-size-56</code></li>
                  </ul>
                  <p class="info">
                    You can now either use the font curves <code>.fs-1</code> to <code>.fs-11</code> that
                    are documented in the
                    <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                      >text utilities</a
                    > for text content, or the <a href="/?path=/docs/e728de1f-0d71-4317-8bb8-cbef0bf8d5db--docs">sizing utility classes</a> for sizing <code>post-icon</code> components.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Removed deprecated font curve variables and classes
                  </p>
                  <ul>
                    <li><code>$font-size-tiny</code> and <code>.fs-tiny</code></li>
                    <li><code>$font-size-small</code> and <code>.fs-small</code></li>
                    <li><code>$font-size-regular</code> and <code>.fs-regular</code></li>
                    <li>
                      <code>$font-size-bigger-regular</code> and <code>.fs-bigger-regular</code>
                    </li>
                    <li><code>$font-size-medium</code> and <code>.fs-medium</code></li>
                    <li><code>$font-size-large</code> and <code>.fs-large</code></li>
                    <li><code>$font-size-small-big</code> and <code>.fs-small-big</code></li>
                    <li><code>$font-size-big</code> and <code>.fs-big</code></li>
                    <li><code>$font-size-bigger-big</code> and <code>.fs-bigger-big</code></li>
                    <li><code>$font-size-small-huge</code> and <code>.fs-small-huge</code></li>
                    <li><code>$font-size-huge</code> and <code>.fs-huge</code></li>
                  </ul>
                  <p class="info">
                    You can now either use the font curves <code>.fs-1</code> to <code>.fs-11</code> that
                    are documented in the
                    <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                      >text utilities</a
                    > for text content, or the <a href="/?path=/docs/e728de1f-0d71-4317-8bb8-cbef0bf8d5db--docs">sizing utility classes</a> for sizing <code>post-icon</code> components.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed deprecated line-height variables
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
                    <li><code>.lh-base</code></li>
                    <li><code>.lh-hair</code></li>
                    <li><code>.lh-line</code></li>
                    <li><code>.lh-micro</code></li>
                    <li><code>.lh-mini</code></li>
                    <li><code>.lh-small-regular</code></li>
                    <li><code>.lh-regular</code></li>
                    <li><code>.lh-small-large</code></li>
                    <li><code>.lh-large</code></li>
                    <li><code>.lh-big</code></li>
                    <li><code>.lh-bigger-big</code></li>
                    <li><code>.lh-small-huge</code></li>
                    <li><code>.lh-huge</code></li>
                    <li><code>.lh-small-giant</code></li>
                    <li><code>.lh-giant</code></li>
                    <li><code>.lh-bigger-giant</code></li>
                  </ul>
                  <p class="info">
                    You can now use the following classes: <code>.lh-1</code>, <code>.lh-sm</code> and <code>.lh-lg</code> which are documented in the <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                      >text utilities</a
                    >.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The following classes have been removed as the new Swiss Post font does not
                    provide a light font weight (300)
                  </p>
                  <ul>
                    <li><code>.fw-light</code></li>
                    <li><code>.light</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Renamed font-weight utility classes
                  </p>
                  <ul>
                    <li><code>.bold</code> is now <code>.fw-bold</code></li>
                    <li><code>.regular</code> is now <code>.fw-regular</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.lh-base</code> class has been removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.font-monospace</code> class has been removed along with the
                    <code>$font-family-monospace</code> scss variable

                  </p>
                </li>
              </ul>

              <h5>Other styles</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Some elements of the card component and their corresponding classes have been removed
                    <ul>
                      <li><code>.card-header</code></li>
                      <li><code>.card-footer</code></li>
                      <li><code>.card-img</code></li>
                      <li><code>.card-img-top</code></li>
                      <li><code>.card-img-bottom</code></li>
                      <li><code>.card-button</code></li>
                      <li><code>.card-buttons</code></li>
                    </ul>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.card-group</code> class has been removed
                  </p>
                  <p class="info">Card elements should be set inside a grid container.</p>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The <code>.btn-rg</code> class has been removed. Buttons using this class will
                    now fall back to the default size
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.btn-animated</code> class has been removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.pi-*</code> classes have been removed
                  </p>
                  <p class="info">The <code>post-icon</code> component should be used instead.</p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.breadcrumb-item</code> class has been removed
                  </p>
                  <p class="info">
                    The <code>post-breadcrumb-item</code> component should be used instead.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.alert-fixed-bottom</code> class has been removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>topic-teaser</code> component and all of its related classes have been
                    removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The <code>.chip-filter</code> has been renamed to
                    <code>.chip-selectable</code> and the small variant of the chip
                    <code>.chip-sm</code> has been removed
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Accent colors have been removed
                  </p>
                  <ul>
                    <li>
                      <code>.btn-nightblue</code>, <code>.btn-nightblue-bright</code>,
                      <code>.btn-petrol</code>, <code>.btn-petrol-bright</code>,
                      <code>.btn-coral</code>, <code>.btn-coral-bright</code>,
                      <code>.btn-olive</code>, <code>.btn-olive-bright</code>,
                      <code>.btn-purple</code>, <code>.btn-purple-bright</code>,
                      <code>.btn-aubergine</code>, <code>.btn-aubergine-bright</code> classes no
                      longer exist.
                    </li>
                    <li>
                      <code>$nightblue</code>, <code>$nightblue-bright</code>, <code>$petrol</code>,
                      <code>$petrol-bright</code>, <code>$coral</code>, <code>$coral-bright</code>,
                      <code>$olive</code>, <code>$olive-bright</code>, <code>$purple</code>,
                      <code>$purple-bright</code>, <code>$aubergine</code>,
                      <code>$aubergine-bright</code> scss variables no longer exist.
                    </li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    Deprecated loader classes and related scss variables have been removed
                  </p>
                  <ul>
                    <li><code>.loader-xs</code></li>
                    <li><code>.loader-sm</code></li>
                  </ul>
                  <p class="info">
                    Instead, use classes <code>.spinner-16</code> and <code>.spinner-40</code>.
                  </p>
                </li>

                <li class="mb-16">
                  <p>
                    Removed the Standard HTML Alert component (<code>.alert</code>, <code>.alert-*</code>)
                  </p>
                  <p class="info">
                    Replaced by the <code>post-banner</code> component.
                  </p>
                </li>

                <li class="mb-16">
                  <p>
                    <span data-info="automigration" class="tag tag-sm tag-info">🪄 migration rule</span>
                    The following spinner classes have been renamed
                  </p>
                  <ul>
                    <li><code>.loading-modal</code> is now <code>.spinner-modal</code></li>
                    <li><code>.loader</code> is now <code>.spinner</code></li>
                    <li><code>.loader-*</code> are now <code>.spinner-*</code></li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h4>Components</h4>

              <ul>
                <li class="mb-16">
                  <p>
                    The <code>post-alert</code> web component is now <code>post-banner</code>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>heading-level</code> property on <code>post-accordion</code> is now
                    required
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The stencil hydrated flag has switched from the <code>.hydrated</code> class to
                    to the <code>data-hydrated</code> attribute
                  </p>
                  <p class="info">
                    If your tests related on the class being present, please rewrite the selector to
                    use the new attribute selector.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the <code>accordion-item</code> shadow part from the
                    <code>post-accordion-item</code> component and introduced two new shadow parts:
                    <code>button</code> and <code>body</code>
                  </p>
                  <p class="info">
                    If you were styling the component using the <code>::part(accordion-item)</code> selector,
                    this will no longer work. Update your styles to use
                    <code>::part(button)</code> for the header trigger and
                    <code>::part(body)</code> for the content area instead.
                  </p>
                </li>
              </ul>
            </section>
          </li>
        </ol>
      </section>
    `;
  }

  private _onAutoMigrationChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    // Hide all lines that have the auto migration tag
    this.hideAutoMigration = event.target.checked;
    document
      .querySelectorAll('[data-info="automigration"]')
      ?.forEach(item =>
        this.hideAutoMigration
          ? item.closest('li')?.classList.add('d-none')
          : item.closest('li')?.classList.remove('d-none'),
      );
  }
}
