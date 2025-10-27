import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { _restorePersistedState, MIGRATION_CHECKS_KEY_V9 } from './util/persist.util';
import { V910Checks } from './types';
import { _updateOnChange, _updatePersistedState } from './util/migration-checks.util';

@customElement('migration-version-9-10')
export class MigrationV99Component extends LitElement {
  @property({ type: Number }) currentVersion?: number;
  @property({ type: String }) environment?: string;
  @property({ type: Boolean }) angular?: boolean;

  @state()
  private state: V910Checks = {
    general: {
      hide_automigration: false,
    },
    ngbootstrap: {
      removed_components: false,
    },
    forms: {
      tooltip_validation: false,
      input_sizes: false,
      form_text: false,
    },
    grid: {
      container: false,
      breakpoints: false,
      gutter: false,
      gap: false,
    },
    utilities: {
      percentage_sizing: false,
      removed_pixel_sizing: false,
      renamed_pixel_sizing: false,
      max_size: false,
      shadow: false,
      elevation: false,
      removed_spacing: false,
      renamed_spacing: false,
      background: false,
      renamed_various_utilities: false,
      removed_various_utilities: false,
      border_radius: false,
      position_helper: false,
      text_color: false,
    },
    typography: {
      font_sizes: false,
      font_curves_classes: false,
      font_curves_variables_and_classes: false,
      line_height_variables: false,
      weight_light: false,
      font_weight: false,
      line_height_base: false,
      monospace: false,
    },
    others: {
      card: false,
      card_group: false,
      button_regular: false,
      button_animated: false,
      icon_pi: false,
      breadcrumb_item: false,
      alert_fixed_bottom: false,
      topic_teaser: false,
      chip: false,
      accent_colors: false,
      spinner_sizes: false,
      standard_html_alert: false,
      spinner: false,
      stepper: false,
    },
    components: {
      alert: false,
      accordion_heading: false,
      hydrated_flag: false,
      accordion_item_part: false,
    },
  };

  constructor() {
    super();
    this.state = _restorePersistedState<V910Checks>(MIGRATION_CHECKS_KEY_V9) ?? this.state;
    setTimeout(() => this._toggleAutoMigrationVisibility(), 0);
  }

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
                  id="state.general.hide_automigration"
                  type="checkbox"
                  class="form-check-input"
                  name="state.general.hide_automigration"
                  value="true"
                  @change="${this._onAutoMigrationChange}"
                  ?checked="${this.state.general.hide_automigration}"
                />
                <label for="state.general.hide_automigration" class="form-check-label">
                  Hide changes covered by the automatic
                  <span class="tag tag-sm tag-info">🪄 migration rules</span>
                </label>
              </div>
            </div>
            <post-banner type="warning">
              <h4 slot="heading">Notice: Bootstrap & Ng-Bootstrap removed</h4>
              <p>
                As part of the latest migration, Bootstrap and Ng-Bootstrap have been fully removed
                from the design system. This means that any variables, classes, mixins, or utilities
                originating from Bootstrap and all components from Ng-Bootstrap are no longer
                available.
              </p>
              <p>
                However,
                <span class="fw-bold"
                  >many commonly used features from Bootstrap — such as the grid system (columns)
                  and most utility classes — have been internalized into the design system</span
                >. You can continue using them through the design system without needing
                Bootstrap.<br />
              </p>
              <p>
                If you encounter any broken styles or issues after upgrading, you have two options:
              </p>
              <ul>
                <li>Internalize the specific mixins or utilities you still rely on</li>
                <li>
                  If issues persist, open a
                  <a href="https://github.com/swisspost/design-system/issues">GitHub issue</a>
                </li>
              </ul>
              <p>Please review your components and styles to ensure compatibility.</p>
              <br />
            </post-banner>

            <div @change="${this._onChange}">
              <section>
                <h4>Ng-Bootstrap</h4>
                <ul class="list-unstyled">
                  <li>
                    <div class="form-check">
                      <input
                        id="ngbootstrap.removed_components"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.ngbootstrap.removed_components}"
                      />
                      <label class="form-check-label" for="ngbootstrap.removed_components">
                        Removed the following Ng-Bootstrap components:
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
                      </label>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <h4>Styles</h4>

                <h5>Forms</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="forms.tooltip_validation"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.forms.tooltip_validation}"
                      />
                      <label class="form-check-label" for="forms.tooltip_validation">
                        Removed tooltip validation classes
                        <ul>
                          <li><code>.valid-tooltip</code></li>
                          <li><code>.invalid-tooltip</code></li>
                        </ul>
                        <span class="info">
                          Instead, use classes <code>.valid-feedback</code> and
                          <code>.invalid-feedback</code>.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="forms.input_sizes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.forms.input_sizes}"
                      />
                      <label class="form-check-label" for="forms.input_sizes">
                        <code>textarea</code>, <code>input</code> and <code>select</code> form
                        elements no longer have sizes, therefore the following classes have no more
                        effect on those elements
                        <ul>
                          <li><code>.form-control-sm</code></li>
                          <li><code>.form-control-rg</code></li>
                          <li><code>.form-control-lg</code></li>
                          <li><code>.form-select-sm</code></li>
                          <li><code>.form-select-rg</code></li>
                          <li><code>.form-select-lg</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="forms.form_text"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.forms.form_text}"
                      />
                      <label class="form-check-label" for="forms.form_text">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The <code>.form-text</code> class has been renamed to
                        <code>.form-hint</code>
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>Grid</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="grid.container"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.grid.container}"
                      />
                      <label class="form-check-label" for="grid.container">
                        Removed grid container helper classes
                        <ul>
                          <li><code>.vertical-gutters</code></li>
                          <li><code>.row.border-gutters</code></li>
                          <li><code>.container-reset</code></li>
                          <li>
                            <code>.container-reset-left</code> and
                            <code>.container-reset-right</code>
                          </li>
                          <li><code>.container-fluid-#{$breakpoint}</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="grid.breakpoints"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.grid.breakpoints}"
                      />
                      <label class="form-check-label" for="grid.breakpoints">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The <code>rg</code> and <code>xxl</code> breakpoints have been removed
                        <ul>
                          <li>
                            All classes containing <code>*-rg-*</code> are no longer effective
                          </li>
                          <li>
                            All classes containing <code>*-xxl-*</code> are no longer effective
                          </li>
                        </ul>
                        <span class="info">
                          <code>xs</code> now spans the previous <code>xs</code> and
                          <code>sm</code>, while <code>sm</code> spans the previous <code>rg</code>.
                          <code>xl</code> now spans both the previous <code>xl</code> and
                          <code>xxl</code> breakpoints.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="grid.gutter"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.grid.gutter}"
                      />
                      <label class="form-check-label" for="grid.gutter">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The gutter classes naming (<code>g-*</code>, <code>gx-*</code>,
                        <code>gy-*</code>) has changed to pixel-based names
                        <ul>
                          <li><code>*-1</code> is now <code>*-4</code></li>
                          <li><code>*-2</code> is now <code>*-8</code></li>
                          <li><code>*-3</code> is now <code>*-16</code></li>
                          <li><code>*-4</code> is now <code>*-24</code></li>
                          <li><code>*-5</code> is now <code>*-48</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="grid.gap"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.grid.gap}"
                      />
                      <label class="form-check-label" for="grid.gap">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The gap classes naming (<code>gap-*</code>, <code>row-gap-*</code>,
                        <code>column-gap-*</code>) has changed to pixel-based names
                        <ul>
                          <li><code>*-1</code> is now <code>*-4</code></li>
                          <li><code>*-2</code> is now <code>*-8</code></li>
                          <li><code>*-3</code> is now <code>*-16</code></li>
                          <li><code>*-4</code> is now <code>*-24</code></li>
                          <li><code>*-5</code> is now <code>*-48</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>Utilities</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.percentage_sizing"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.percentage_sizing}"
                      />
                      <label class="form-check-label" for="utilities.percentage_sizing">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Changed the percentage sizing utility classes (<code>w-*</code>,
                        <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>) naming
                        <ul>
                          <li><code>*-25</code> is now <code>*-quarter</code></li>
                          <li><code>*-50</code> is now <code>*-half</code></li>
                          <li><code>*-75</code> is now <code>*-three-quarters</code></li>
                          <li><code>*-100</code> is now <code>*-full</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.removed_pixel_sizing"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.removed_pixel_sizing}"
                      />
                      <label class="form-check-label" for="utilities.removed_pixel_sizing">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed some pixel sizing utility classes (<code>w-*</code>,
                        <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>)
                        <ul>
                          <li><code>*-small-large</code></li>
                          <li><code>*-bigger-giant</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.renamed_pixel_sizing"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.renamed_pixel_sizing}"
                      />
                      <label class="form-check-label" for="utilities.renamed_pixel_sizing">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Changed the pixel sizing utility classes (<code>w-*</code>,
                        <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>) to pixel-based names
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
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.max_size"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.max_size}"
                      />
                      <label class="form-check-label" for="utilities.max_size">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Changed the sizing utility classes max-height and max-width naming
                        <ul>
                          <li><code>mh-*</code> is now <code>max-h-*</code></li>
                          <li><code>mw-*</code> is now <code>max-w-*</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.shadow"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.shadow}"
                      />
                      <label class="form-check-label" for="utilities.shadow">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Shadow utility classes have been removed
                        <ul>
                          <li>
                            Shadows: <code>.shadow-none</code>, <code>.shadow-sm</code>,
                            <code>.shadow</code> and <code>.shadow-lg</code>
                          </li>
                        </ul>
                        <span class="info">
                          We recommend using the <code>.elevation-*</code> classes instead.
                        </span>
                      </label>
                    </div>
                  </li>

                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.elevation"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.elevation}"
                      />
                      <label class="form-check-label" for="utilities.elevation">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The following elevation utility classes have been renamed
                        <ul>
                          <li><code>.elevation-1</code> is now <code>.elevation-100</code></li>
                          <li><code>.elevation-2</code> is now <code>.elevation-200</code></li>
                          <li><code>.elevation-3</code> is now <code>.elevation-300</code></li>
                          <li><code>.elevation-4</code> is now <code>.elevation-400</code></li>
                          <li><code>.elevation-5</code> is now <code>.elevation-500</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.removed_spacing"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.removed_spacing}"
                      />
                      <label class="form-check-label" for="utilities.removed_spacing">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed some spacing utilities' classes (margin and padding
                        <code>{m/p}{x/y/s/e/t/b}-*</code>)
                        <ul>
                          <li><code>*-small-large</code></li>
                          <li><code>*-bigger-giant</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.renamed_spacing"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.renamed_spacing}"
                      />
                      <label class="form-check-label" for="utilities.renamed_spacing">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Changed the spacing utilities' classes (margin and padding
                        <code>{m/p}{x/y/s/e/t/b}-*</code>) naming to pixel-based names
                        <ul>
                          <li><code>*-hair</code> is now <code>*-1</code></li>
                          <li><code>*-line</code> is now <code>*-2</code></li>
                          <li>
                            <code>*-micro</code> and <code>*-1</code> are now <code>*-4</code>
                          </li>
                          <li><code>*-mini</code> and <code>*-2</code> are now <code>*-8</code></li>
                          <li><code>*-small-regular</code> is now <code>*-12</code></li>
                          <li>
                            <code>*-regular</code> and <code>*-3</code> are now <code>*-16</code>
                          </li>
                          <li>
                            <code>*-large</code> and <code>*-4</code> are now <code>*-24</code>
                          </li>
                          <li><code>*-big</code> is now <code>*-32</code></li>
                          <li><code>*-bigger-big</code> is now <code>*-40</code></li>
                          <li>
                            <code>*-small-huge</code> and <code>*-5</code> are now <code>*-48</code>
                          </li>
                          <li><code>*-huge</code> is now <code>*-56</code></li>
                          <li><code>*-small-giant</code> is now <code>*-78</code></li>
                          <li><code>*-giant</code> is now <code>*-80</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.background"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.background}"
                      />
                      <label class="form-check-label" for="utilities.background">
                        All background color classes (<code>bg-*</code>) have been removed
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.renamed_various_utilities"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.renamed_various_utilities}"
                      />
                      <label class="form-check-label" for="utilities.renamed_various_utilities">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Renamed some utility classes
                        <ul>
                          <li>
                            <code>.h-visuallyhidden</code> is now <code>.visually-hidden</code>
                          </li>
                          <li><code>.h-clearfix</code> is now <code>.clearfix</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.removed_various_utilities"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.removed_various_utilities}"
                      />
                      <label class="form-check-label" for="utilities.removed_various_utilities">
                        Removed some utility classes
                        <ul>
                          <li>
                            <code>.spacer</code>
                          </li>
                          <li>
                            <code>.h-visuallyhidden-up-md</code>,
                            <code>.h-visuallyhidden-down-rg</code>,
                            <code>.h-visuallyhidden-down-lg</code>
                          </li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.border_radius"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.border_radius}"
                      />
                      <label class="form-check-label" for="utilities.border_radius">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Renamed border radius classes
                        <ul>
                          <li><code>.rounded</code> is now <code>.rounded-4</code></li>
                          <li>
                            <code>.rounded-{top/bottom/start/end}</code> are now
                            <code>.rounded-{top/bottom/start/end}-4</code>
                          </li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.position_helper"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.position_helper}"
                      />
                      <label class="form-check-label" for="utilities.position_helper">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed some position helper classes that can be replaced with a combination
                        of other utilities
                        <ul>
                          <li>
                            <code>fixed-top</code> is now
                            <code>position-fixed top-0 start-0 end-0 z-fixed</code>
                          </li>
                          <li>
                            <code>fixed-bottom</code> is now
                            <code>position-fixed bottom-0 start-0 end-0 z-fixed</code>
                          </li>
                          <li>
                            <code>sticky-top</code> is now
                            <code>position-sticky top-0 z-header</code>
                          </li>
                          <li>
                            <code>sticky-bottom</code> is now
                            <code>position-sticky bottom-0 z-header</code>
                          </li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="utilities.text_color"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.utilities.text_color}"
                      />
                      <label class="form-check-label" for="utilities.text_color">
                        Removed all text color utility classes (<code>.text-*</code>)
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
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>Typography</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_sizes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_sizes}"
                      />
                      <label class="form-check-label" for="typography.font_sizes">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed deprecated font size variables and classes
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
                        <span class="info">
                          You can now either use the font curves <code>.fs-1</code> to
                          <code>.fs-11</code> that are documented in the
                          <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                            >text utilities</a
                          >
                          for text content, or the
                          <a href="/?path=/docs/e728de1f-0d71-4317-8bb8-cbef0bf8d5db--docs"
                            >sizing utility classes</a
                          >
                          for sizing <code>post-icon</code> components.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_curves_classes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_curves_classes}"
                      />
                      <label class="form-check-label" for="typography.font_curves_classes">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed deprecated font curve classes
                        <ul>
                          <li><code>.font-curve-tiny</code> is now <code>.fs-9</code></li>
                          <li><code>.font-curve-small</code> is now <code>.fs-7</code></li>
                          <li><code>.font-curve-regular</code> is now <code>.fs-6</code></li>
                          <li><code>.font-curve-bigger-regular</code> is now <code>.fs-5</code></li>
                          <li><code>.font-curve-medium</code> is now <code>.fs-4</code></li>
                          <li><code>.font-curve-large</code> is now <code>.fs-3</code></li>
                          <li><code>.font-curve-big</code> is now <code>.fs-1</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_curves_variables_and_classes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_curves_variables_and_classes}"
                      />
                      <label
                        class="form-check-label"
                        for="typography.font_curves_variables_and_classes"
                      >
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Removed deprecated font curve variables and classes
                        <ul>
                          <li><code>$font-size-tiny</code> and <code>.fs-tiny</code></li>
                          <li><code>$font-size-small</code> and <code>.fs-small</code></li>
                          <li><code>$font-size-regular</code> and <code>.fs-regular</code></li>
                          <li>
                            <code>$font-size-bigger-regular</code> and
                            <code>.fs-bigger-regular</code>
                          </li>
                          <li><code>$font-size-medium</code> and <code>.fs-medium</code></li>
                          <li><code>$font-size-large</code> and <code>.fs-large</code></li>
                          <li><code>$font-size-small-big</code> and <code>.fs-small-big</code></li>
                          <li><code>$font-size-big</code> and <code>.fs-big</code></li>
                          <li>
                            <code>$font-size-bigger-big</code> and <code>.fs-bigger-big</code>
                          </li>
                          <li>
                            <code>$font-size-small-huge</code> and <code>.fs-small-huge</code>
                          </li>
                          <li><code>$font-size-huge</code> and <code>.fs-huge</code></li>
                        </ul>
                        <span class="info">
                          You can now either use the font curves <code>.fs-1</code> to
                          <code>.fs-11</code> that are documented in the
                          <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                            >text utilities</a
                          >
                          for text content, or the
                          <a href="/?path=/docs/e728de1f-0d71-4317-8bb8-cbef0bf8d5db--docs"
                            >sizing utility classes</a
                          >
                          for sizing <code>post-icon</code> components.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.line_height_variables"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.line_height_variables}"
                      />
                      <label class="form-check-label" for="typography.line_height_variables">
                        Removed deprecated line-height variables
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
                        <span class="info">
                          You can now use the following classes: <code>.lh-1</code>,
                          <code>.lh-sm</code> and <code>.lh-lg</code> which are documented in the
                          <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                            >text utilities</a
                          >.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.weight_light"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.weight_light}"
                      />
                      <label class="form-check-label" for="typography.weight_light">
                        The following classes have been removed as the new Swiss Post font does not
                        provide a light font weight (300)
                        <ul>
                          <li><code>.fw-light</code></li>
                          <li><code>.light</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_weight"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_weight}"
                      />
                      <label class="form-check-label" for="typography.font_weight">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Renamed font-weight utility classes
                        <ul>
                          <li><code>.bold</code> is now <code>.fw-bold</code></li>
                          <li><code>.regular</code> is now <code>.fw-regular</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.line_height_base"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.line_height_base}"
                      />
                      <label class="form-check-label" for="typography.line_height_base">
                        <span> The <code>.lh-base</code> class has been removed </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.monospace"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.monospace}"
                      />
                      <label class="form-check-label" for="typography.monospace">
                        The <code>.font-monospace</code> class has been removed along with the
                        <code>$font-family-monospace</code> scss variable
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>Other styles</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.card"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.card}"
                      />
                      <label class="form-check-label" for="others.card">
                        Some elements of the card component and their corresponding classes have
                        been removed
                        <ul>
                          <li><code>.card-header</code></li>
                          <li><code>.card-footer</code></li>
                          <li><code>.card-img</code></li>
                          <li><code>.card-img-top</code></li>
                          <li><code>.card-img-bottom</code></li>
                          <li><code>.card-button</code></li>
                          <li><code>.card-buttons</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.card_group"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.card_group}"
                      />
                      <label class="form-check-label" for="others.card_group">
                        The <code>.card-group</code> class has been removed
                        <span class="info"
                          >Card elements should be set inside a grid container.</span
                        >
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.button_regular"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.button_regular}"
                      />
                      <label class="form-check-label" for="others.button_regular">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The <code>.btn-rg</code> class has been removed. Buttons using this class
                        will now fall back to the default size
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.button_animated"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.button_animated}"
                      />
                      <label class="form-check-label" for="others.button_animated">
                        The <code>.btn-animated</code> class has been removed
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.icon_pi"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.icon_pi}"
                      />
                      <label class="form-check-label" for="others.icon_pi">
                        The <code>.pi-*</code> classes have been removed
                        <span class="info"
                          >The <code>post-icon</code> component should be used instead.</span
                        >
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.breadcrumb_item"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.breadcrumb_item}"
                      />
                      <label class="form-check-label" for="others.breadcrumb_item">
                        The <code>.breadcrumb-item</code> class has been removed
                        <span class="info">
                          The <code>post-breadcrumb-item</code> component should be used instead.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.alert_fixed_bottom"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.alert_fixed_bottom}"
                      />
                      <label class="form-check-label" for="others.alert_fixed_bottom">
                        The <code>.alert-fixed-bottom</code> class has been removed
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.topic_teaser"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.topic_teaser}"
                      />
                      <label class="form-check-label" for="others.topic_teaser">
                        The <code>topic-teaser</code> component and all of its related classes have
                        been removed
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.chip"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.chip}"
                      />
                      <label class="form-check-label" for="others.chip">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The <code>.chip-filter</code> has been renamed to
                        <code>.chip-selectable</code> and the small variant of the chip
                        <code>.chip-sm</code> has been removed
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.accent_colors"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.accent_colors}"
                      />
                      <label class="form-check-label" for="others.accent_colors">
                        Accent colors have been removed
                        <ul>
                          <li>
                            <code>.btn-nightblue</code>, <code>.btn-nightblue-bright</code>,
                            <code>.btn-petrol</code>, <code>.btn-petrol-bright</code>,
                            <code>.btn-coral</code>, <code>.btn-coral-bright</code>,
                            <code>.btn-olive</code>, <code>.btn-olive-bright</code>,
                            <code>.btn-purple</code>, <code>.btn-purple-bright</code>,
                            <code>.btn-aubergine</code>, <code>.btn-aubergine-bright</code> classes
                            no longer exist.
                          </li>
                          <li>
                            <code>$nightblue</code>, <code>$nightblue-bright</code>,
                            <code>$petrol</code>, <code>$petrol-bright</code>, <code>$coral</code>,
                            <code>$coral-bright</code>, <code>$olive</code>,
                            <code>$olive-bright</code>, <code>$purple</code>,
                            <code>$purple-bright</code>, <code>$aubergine</code>,
                            <code>$aubergine-bright</code> scss variables no longer exist.
                          </li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.spinner_sizes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.spinner_sizes}"
                      />
                      <label class="form-check-label" for="others.spinner_sizes">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Deprecated loader classes and related scss variables have been removed
                        <ul>
                          <li><code>.loader-xs</code></li>
                          <li><code>.loader-sm</code></li>
                        </ul>
                        <span class="info">
                          Instead, use classes <code>.spinner-16</code> and
                          <code>.spinner-40</code>.
                        </span>
                      </label>
                    </div>
                  </li>

                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.standard_html_alert"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.standard_html_alert}"
                      />
                      <label class="form-check-label" for="others.standard_html_alert">
                        Removed the Standard HTML Alert component (<code>.alert</code>,
                        <code>.alert-*</code>)
                        <span class="info">
                          Replaced by the <code>post-banner</code> component.
                        </span>
                      </label>
                    </div>
                  </li>

                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.spinner"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.spinner}"
                      />
                      <label class="form-check-label" for="others.spinner">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The following spinner classes have been renamed
                        <ul>
                          <li><code>.loading-modal</code> is now <code>.spinner-modal</code></li>
                          <li><code>.loader</code> is now <code>.spinner</code></li>
                          <li><code>.loader-*</code> are now <code>.spinner-*</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="others.stepper"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.stepper}"
                      />
                      <label class="form-check-label" for="others.stepper">
                        Removed the stepper HTML component.
                        <span class="info"
                          >You can now use the <code>post-stepper</code> web component.</span
                        >
                      </label>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h4>Components</h4>

                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="components.alert"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.components.alert}"
                      />
                      <label class="form-check-label" for="components.alert">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        The <code>post-alert</code> web component is now <code>post-banner</code>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="components.accordion_heading"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.components.accordion_heading}"
                      />
                      <label class="form-check-label" for="components.accordion_heading">
                        The <code>heading-level</code> property on <code>post-accordion</code> is
                        now required
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="components.hydrated_flag"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.components.hydrated_flag}"
                      />
                      <label class="form-check-label" for="components.hydrated_flag">
                        The stencil hydrated flag has switched from the
                        <code>.hydrated</code> class to to the <code>data-hydrated</code> attribute
                        <span class="info">
                          If your tests related on the class being present, please rewrite the
                          selector to use the new attribute selector.
                        </span>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="components.accordion_item_part"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.components.accordion_item_part}"
                      />
                      <label class="form-check-label" for="components.accordion_item_part">
                        Removed the <code>accordion-item</code> shadow part from the
                        <code>post-accordion-item</code> component and introduced two new shadow
                        parts: <code>button</code> and <code>body</code>
                        <span class="info">
                          If you were styling the component using the
                          <code>::part(accordion-item)</code> selector, this will no longer work.
                          Update your styles to use <code>::part(button)</code> for the header
                          trigger and <code>::part(body)</code> for the content area instead.
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
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
    this.state.general.hide_automigration = event.target.checked;
    this._toggleAutoMigrationVisibility();

    _updatePersistedState(MIGRATION_CHECKS_KEY_V9, this.state);
  }

  // Toggle visibility of all lines that have the auto migration tag
  private _toggleAutoMigrationVisibility() {
    document
      .querySelectorAll('[data-info="automigration"]')
      ?.forEach(item =>
        this.state.general.hide_automigration
          ? item.closest('li')?.classList.add('d-none')
          : item.closest('li')?.classList.remove('d-none'),
      );
  }

  private _onChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    _updateOnChange(event, MIGRATION_CHECKS_KEY_V9, this.state);
    this.requestUpdate();
  }
}
