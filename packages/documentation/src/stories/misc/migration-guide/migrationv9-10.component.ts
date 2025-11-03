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
      font_sizes_variables: false,
      font_sizes_classes: false,
      font_curves_classes: false,
      font_curves_variables: false,
      line_height_variables: false,
      weight_light: false,
      font_weight: false,
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
            <h3>Introduction</h3>
            <p>
              Version 10 comes with a <b>new look and cleaner codebase</b> —
              and yes, a few breaking changes, all for good reason.
            </p>
            <p>
              We’ve completely refreshed the design and reworked how components are built.
              <span class="fw-bold">Bootstrap</span> and
              <span class="fw-bold">Ng-Bootstrap</span> are gone; everything now runs on
              <span class="fw-bold">Stencil Web Components</span>, which means the Design System
              works across <span class="fw-bold">any framework</span> (<a
                href="/?path=/docs/833ef689-a573-40f5-a6a6-30a999b94733--docs"
                >Angular</a
              >, <a href="/?path=/docs/13b9c7f1-993d-4348-a3b7-a7ceb92fd5c7--docs">React</a>, or
              <a href="/?path=/docs/edfb619b-fda1-4570-bf25-20830303d483--docs">plain HTML</a>).
            </p>
            <p>
              Most utility classes are still there, but renamed to be
              <span class="fw-bold">pixel-based and more intuitive</span> — for example,
              <code>.p-16</code> now clearly means "16px padding", instead of guessing what
              <code>.p-3</code> stood for. We’ve also simplified things overall: fewer breakpoints,
              fewer font-size classes, and a more consistent color palette (no more purple or coral
              buttons 🎨).
            </p>
            <p>
              Most components are now <span class="fw-bold">tokenized</span>, so you can easily
              adjust themes or colors without rewriting CSS. Want to see this in action? Check the
              <a href="/?path=/docs/43481535-5b39-40b5-a273-478b07dc3b31--docs"
                >Palette documentation</a
              >
              and switch to the Cargo theme.
            </p>
            <p>
              Oh, and yes — there’s a
              <a href="/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs"
                >brand-new icon set</a
              >
              too 🖼️.
            </p>
          </li>
          <li>
            <h3>Package Update 🩺</h3>
            <p>
              Update Design System styles and components packages to version 10 by running these two
              commands in your project root:
              <code languages="['bash']">npm install @swisspost/design-system-styles@10</code>
              <code languages="['bash']">
                npm install
                @swisspost/design-system-components${this.angular ? '-angular' : nothing}@10
              </code>
              ${!this.angular
                ? html`
                    <p class="mt-8">
                      Are you using React? V10 of the design system comes with a
                      <code>@swisspost/design-system-components-react</code> package. Go check out
                      the
                      <a href="/?path=/docs/13b9c7f1-993d-4348-a3b7-a7ceb92fd5c7--docs"
                        >React package documentation</a
                      >
                      for more informations.
                    </p>
                  `
                : nothing}
            </p>
          </li>
          <li>
            <h3>Component Migration 🤓</h3>
            <div class="my-16">
              <p>
                💡 Many changes are automatically handled by the migration scripts. Each 🪄 symbol
                means that <span class="fw-bold">automatic migration rules</span> can handle the
                changes, but you should still verify the results manually.
              </p>
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
            <post-banner type="warning" class="mt-24">
              <h4 slot="heading">Notice: Bootstrap & Ng-Bootstrap removed</h4>
              <p>
                As part of the latest migration, Bootstrap and Ng-Bootstrap have been fully removed
                from the design system. This means that any variables, classes, mixins, or utilities
                originating from Bootstrap and all components from Ng-Bootstrap are no longer
                available.
              </p>
              <h5 class="h6 pt-8">✅ Good news:</h5>
              <p>
                Common Bootstrap features — such as the grid system (columns) and most utility
                classes — have been internalized into the design system. You can continue using them
                through the design system without needing Bootstrap.<br />
              </p>
              <p>
                If you encounter any broken styles or issues after upgrading, you have two options:
              </p>
              <ul>
                <li>Recreate the needed mixin or utility inside your app.</li>
                <li>
                  Or report an issue in the
                  <a href="https://github.com/swisspost/design-system/issues"
                    >Swiss Post Design System GitHub repository</a
                  >
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
                        All Ng-Bootstrap components are no longer available:
                        <ul>
                          <li>carousel → <i>coming soon</i></li>
                          <li>custom select → <i>coming soon</i></li>
                          <li>datatable → AG Grid <i>coming soon</i></li>
                          <li>datepicker → <i>coming soon</i></li>
                          <li>dropdown → <i>coming soon</i></li>
                          <li>
                            modal →
                            <a href="/?path=/docs/562eac2b-6dc1-4007-ba8e-4e981cef0cbc--docs"
                              >dialog</a
                            >
                          </li>
                          <li>
                            notification overlay →
                            <a href="/?path=/docs/562eac2b-6dc1-4007-ba8e-4e981cef0cbc--docs"
                              >dialog</a
                            >
                          </li>
                          <li>pagination → <i>coming soon</i></li>
                          <li>progressbar → <i>coming soon</i></li>
                          <li>timepicker → <i>coming soon</i></li>
                          <li>typeahead → <i>coming soon</i></li>
                        </ul>
                        <span class="info"
                          >Each removed Ng-Bootstrap component has (or will have) an equivalent in
                          the Design System, shown in the list above. Migration to these new
                          components is manual — you’ll need to update the affected components in
                          your application to use the corresponding elements as described in their
                          corresponding documentation.</span
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
                        <code>post-alert</code> renamed to <code>post-banner</code>
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
                        <code>heading-level</code> property on <code>post-accordion</code> is now
                        required
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
                        <code>accordion-item</code> shadow part removed from the
                        <code>post-accordion-item</code> component and two new shadow parts
                        introduced: <code>button</code> and <code>body</code>
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

              <section>
                <h4>Styles</h4>

                <h5>✍️ Forms</h5>
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
                        Tooltip validation classes removed
                        <ul>
                          <li><code>.valid-tooltip</code></li>
                          <li><code>.invalid-tooltip</code></li>
                        </ul>
                        <span class="info">
                          Instead, use classes <code>.valid-feedback</code> and
                          <code>.invalid-feedback</code>. <br />More informations on the
                          <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs"
                            >form validation docs</a
                          >.
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
                        Form field size classes removed
                        <ul>
                          <li><code>.form-control-sm</code></li>
                          <li><code>.form-control-rg</code></li>
                          <li><code>.form-control-lg</code></li>
                          <li><code>.form-select-sm</code></li>
                          <li><code>.form-select-rg</code></li>
                          <li><code>.form-select-lg</code></li>
                        </ul>
                        <span class="info"
                          >These classes can safely be removed. All form inputs will now have the
                          same height.</span
                        >
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
                        <code>.form-text</code> class has been renamed to
                        <code>.form-hint</code>
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>📐 Grid system</h5>
                <ul class="list-unstyled">
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
                        Breakpoints updated
                        <ul>
                          <li>
                            All classes containing <code>*-rg-*</code> are no longer effective
                          </li>
                          <li>
                            All classes containing <code>*-xxl-*</code> are no longer effective
                          </li>
                        </ul>
                        <span class="info">
                          <code>xs</code> now covers old <code>xs</code> and <code>sm</code>, while
                          <code>sm</code> covers old <code>rg</code>. <code>xl</code> covers old
                          <code>xl</code> and <code>xxl</code> breakpoints.
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
                        Gutter classes (<code>.g-*</code>, <code>.gx-*</code>, <code>.gy-*</code>)
                        renamed
                        <ul>
                          <li><code>*-1</code> is now <code>*-4</code></li>
                          <li><code>*-2</code> is now <code>*-8</code></li>
                          <li><code>*-3</code> is now <code>*-16</code></li>
                          <li><code>*-4</code> is now <code>*-24</code></li>
                          <li><code>*-5</code> is now <code>*-48</code></li>
                        </ul>

                        <span class="info">
                          For instance, the old Bootstrap class <code>.g-1</code> (gutter of 4px) is
                          now <code>.g-4</code> for greater coherance.
                        </span>
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
                        Gap classes (<code>.gap-*</code>, <code>.row-gap-*</code>,
                        <code>.column-gap-*</code>) renamed
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

                <h5>🧰 Utilities</h5>
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
                        Percentage sizing utility classes (<code>.w-*</code>,
                        <code>.h-*</code>, <code>.mh-*</code>, <code>.mw-*</code>) renamed
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
                        Some pixel sizing utility classes (<code>.w-*</code>,
                        <code>.h-*</code>, <code>.mh-*</code>, <code>.mw-*</code>) removed
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
                        Pixel sizing utility classes (<code>.w-*</code>,
                        <code>.h-*</code>, <code>.mh-*</code>, <code>.mw-*</code>) renamed
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
                        Sizing utility classes max-height and max-width renamed
                        <ul>
                          <li><code>.mh-*</code> is now <code>.max-h-*</code></li>
                          <li><code>.mw-*</code> is now <code>.max-w-*</code></li>
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
                        Shadow utility classes replaced with elevations
                        <ul>
                          <li><code>.shadow-none</code> is now <code>.elevation-none</code></li>
                          <li><code>.shadow-sm</code> is now <code>.elevation-200</code></li>
                          <li><code>.shadow</code> is now <code>.elevation-400</code></li>
                          <li><code>.shadow-lg</code> is now <code>.elevation-500</code></li>
                        </ul>
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
                        Elevation utility classes renamed
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
                        Some margin and padding utilities classes (
                        <code>.{m/p}{x/y/s/e/t/b}-*</code>) were removed
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
                        Margin and padding utilities classes (
                        <code>.{m/p}{x/y/s/e/t/b}-*</code>) renamed
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
                        Background color classes (<code>.bg-*</code>) removed
                        <span class="info"
                          >Colors are now handled by
                          <a href="/?path=/docs/43481535-5b39-40b5-a273-478b07dc3b31--docs"
                            >palettes</a
                          >.</span
                        >
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
                        Utility classes renamed
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
                        Utility classes removed
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
                        <span class="info"
                          >Use
                          <a href="/?path=/docs/facaacfd-18f1-49b4-80f1-a96680730fa0--docs#gap"
                            >gaps</a
                          >
                          to add spacing between elements and the
                          <code>.visually-hidden</code> class to hide content.</span
                        >
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
                        Border radius classes renamed
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
                        Position helper classes replaced with a combination of other utilities
                        <ul>
                          <li>
                            <code>.fixed-top</code> is now
                            <code>.position-fixed .top-0 .start-0 .end-0 .z-fixed</code>
                          </li>
                          <li>
                            <code>.fixed-bottom</code> is now
                            <code>position-fixed bottom-0 .start-0 .end-0 .z-fixed</code>
                          </li>
                          <li>
                            <code>.sticky-top</code> is now
                            <code>.position-sticky .top-0 .z-header</code>
                          </li>
                          <li>
                            <code>.sticky-bottom</code> is now
                            <code>.position-sticky .bottom-0 .z-header</code>
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
                        Text color classes (<code>.text-*</code>) removed
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
                        <span class="info"
                          >Colors are now handled by
                          <a href="/?path=/docs/43481535-5b39-40b5-a273-478b07dc3b31--docs"
                            >palettes</a
                          >.</span
                        >
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>✒️ Typography</h5>
                <ul class="list-unstyled">
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_sizes_variables"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_sizes_variables}"
                      />
                      <label class="form-check-label" for="typography.font_sizes_variables">
                        Font size variables removed
                        <ul>
                          <li><code>$font-size-12</code></li>
                          <li><code>$font-size-14</code></li>
                          <li><code>$font-size-16</code></li>
                          <li><code>$font-size-18</code></li>
                          <li><code>$font-size-20</code></li>
                          <li><code>$font-size-24</code></li>
                          <li><code>$font-size-28</code></li>
                          <li><code>$font-size-32</code></li>
                          <li><code>$font-size-40</code></li>
                          <li><code>$font-size-48</code></li>
                          <li><code>$font-size-56</code></li>
                        </ul>
                        <span class="info"
                          >Those SCSS variables can either be replaced by a static value, or you can
                          add a
                          <a
                            href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs#font-sizes"
                            >font-size class</a
                          >
                          to the element it was affecting.</span
                        >
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_sizes_classes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_sizes_classes}"
                      />
                      <label class="form-check-label" for="typography.font_sizes_classes">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Font size classes removed
                        <ul>
                          <li><code>.font-size-12</code> is now <code>.fs-11</code></li>
                          <li><code>.font-size-14</code> is now <code>.fs-9</code></li>
                          <li><code>.font-size-16</code> is now <code>.fs-8</code></li>
                          <li><code>.font-size-18</code> is now <code>.fs-6</code></li>
                          <li><code>.font-size-20</code> is now <code>.fs-6</code></li>
                          <li><code>.font-size-24</code> is now <code>.fs-5</code></li>
                          <li><code>.font-size-28</code> is now <code>.fs-4</code></li>
                          <li><code>.font-size-32</code> is now <code>.fs-3</code></li>
                          <li><code>.font-size-40</code> is now <code>.fs-2</code></li>
                          <li><code>.font-size-48</code> is now <code>.fs-1</code></li>
                          <li><code>.font-size-56</code> is now <code>.fs-1</code></li>
                        </ul>
                        <span class="info">
                          ⚠️ For <code>post-icon</code> sizing, use the
                          <a href="/?path=/docs/e728de1f-0d71-4317-8bb8-cbef0bf8d5db--docs"
                            >sizing utility classes</a
                          >
                          instead of font size classes. If you're using the automigration rules,
                          this gets handled correctly automatically.
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
                        Font curve classes removed
                        <ul>
                          <li><code>.font-curve-tiny</code> is now <code>.fs-9</code></li>
                          <li><code>.font-curve-small</code> is now <code>.fs-7</code></li>
                          <li><code>.font-curve-regular</code> is now <code>.fs-6</code></li>
                          <li><code>.font-curve-bigger-regular</code> is now <code>.fs-5</code></li>
                          <li><code>.font-curve-medium</code> is now <code>.fs-4</code></li>
                          <li><code>.font-curve-large</code> is now <code>.fs-3</code></li>
                          <li><code>.font-curve-big</code> is now <code>.fs-1</code></li>
                          <li><code>.fs-tiny</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-small</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-regular</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-bigger-regular</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-medium</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-large</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-small-big</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-big</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-bigger-big</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-small-huge</code> is now <code>.fs-9</code></li>
                          <li><code>.fs-huge</code> is now <code>.fs-9</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                  <li class="mb-16">
                    <div class="form-check">
                      <input
                        id="typography.font_curves_variables"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.font_curves_variables}"
                      />
                      <label class="form-check-label" for="typography.font_curves_variables">
                        Font curve variables removed
                        <ul>
                          <li><code>$font-size-tiny</code></li>
                          <li><code>$font-size-small</code></li>
                          <li><code>$font-size-regular</code></li>
                          <li>
                            <code>$font-size-bigger-regular</code>
                          </li>
                          <li><code>$font-size-medium</code></li>
                          <li><code>$font-size-large</code></li>
                          <li><code>$font-size-small-big</code></li>
                          <li><code>$font-size-big</code></li>
                          <li>
                            <code>$font-size-bigger-big</code>
                          </li>
                          <li>
                            <code>$font-size-small-huge</code>
                          </li>
                          <li><code>$font-size-huge</code></li>
                        </ul>
                        <span class="info"
                          >Those SCSS variables can either be replaced by a static value, or you can
                          add a
                          <a
                            href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs#font-sizes"
                            >font-size class</a
                          >
                          to the element it was affecting.</span
                        >
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
                        Line height variables and classes removed
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
                          Line height utilities classes have been reduced to the following classes:
                          <code>.lh-1</code>, <code>.lh-sm</code> and <code>.lh-lg</code> which are
                          documented in the
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
                        Light font weight (300) removed as the new Swiss Post Sans does not provide it
                        <ul>
                          <li><code>.fw-light</code></li>
                          <li><code>.light</code></li>
                        </ul>
                        <span class="info"
                          >Those classes can safely be removed. If needed, they can be replaced with
                          <code>.fw-regular</code> if a contrast needs to be set with a bold text
                          parent.</span
                        >
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
                        Font weight utilities renamed
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
                        id="typography.monospace"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.typography.monospace}"
                      />
                      <label class="form-check-label" for="typography.monospace">
                        Monospace font removed
                        <ul>
                          <li><code>.font-monospace</code></li>
                          <li><code>$font-family-monospace</code></li>
                        </ul>
                        <span class="info"
                          >Though we recommend using the official <b>Swiss Post Sans</b> font, if
                          monospace is needed, you can define your own monospace font in your
                          project.</span
                        >
                      </label>
                    </div>
                  </li>
                </ul>

                <h5>🎨 Other styles</h5>
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
                        Some card component elements have been removed
                        <ul>
                          <li><code>.card-header</code></li>
                          <li><code>.card-footer</code></li>
                          <li><code>.card-img</code></li>
                          <li><code>.card-img-top</code></li>
                          <li><code>.card-img-bottom</code></li>
                          <li><code>.card-button</code></li>
                          <li><code>.card-buttons</code></li>
                        </ul>
                        <span class="info"
                          >The card component has been simplified, images don't need a specific
                          class anymore and all the card content is now within the
                          <code>.card-body</code>.<br />
                          Read the
                          <a href="/?path=/docs/605c788d-3f75-4e6c-8498-be3d546843c2--docs"
                            >card documentation</a
                          >
                          for more informations.</span
                        >
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
                        <code>.card-group</code> removed
                        <span class="info"
                          >Card elements should be set inside a
                          <a href="/?path=/docs/7240f2ef-216a-490e-9bd8-c0cef19f7b31--docs"
                            >grid container</a
                          >.</span
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
                        <code>.btn-rg</code> class removed.
                        <span class="info"
                          >Buttons using this class will now fall back to the default size</span
                        >
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
                        <code>.btn-animated</code> class removed
                        <span class="info"
                          >The class can safely be removed, there will simply be no icon animation
                          on hover.</span
                        >
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
                        <code>.pi-*</code> classes (icons) removed
                        <span class="info"
                          >The <code>post-icon</code> component should be used instead, which is
                          documented in the
                          <a href="/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs"
                            >icon component</a
                          >.</span
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
                        <code>.breadcrumb-item</code> class removed
                        <span class="info">
                          The <code>post-breadcrumb-item</code> component should be used instead,
                          which is documented in the
                          <a href="/?path=/docs/b7db7391-f893-4b1e-a125-b30c6f0b028b--docs"
                            >breadcrumbs component</a
                          >.
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
                        <code>.alert-fixed-bottom</code> class removed
                        <span class="info"
                          >Use
                          <a href="/?path=/docs/803a58e8-c734-4ad7-80a8-62da1bb29d4b--docs"
                            >position utilities</a
                          >
                          to fix an alert to the bottom of a page.</span
                        >
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
                        <code>topic-teaser</code> component (and its related classes) removed
                        <span class="info"
                          >As an alternative, you can use the
                          <a href="/?path=/docs/5a47ba70-7831-4e59-b83e-81b6e6c32372--docs"
                            >list interactive</a
                          >
                          component to display a list of links.</span
                        >
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
                        <code>.chip-filter</code> renamed to <code>.chip-selectable</code>, and
                        small variant <code>.chip-sm</code> removed
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
                        Accent colors removed
                        <ul>
                          <li>
                            <code>.btn-nightblue</code>, <code>.btn-nightblue-bright</code>,
                            <code>.btn-petrol</code>, <code>.btn-petrol-bright</code>,
                            <code>.btn-coral</code>, <code>.btn-coral-bright</code>,
                            <code>.btn-olive</code>, <code>.btn-olive-bright</code>,
                            <code>.btn-purple</code>, <code>.btn-purple-bright</code>,
                            <code>.btn-aubergine</code>, <code>.btn-aubergine-bright</code>
                          </li>
                          <li>
                            <code>$nightblue</code>, <code>$nightblue-bright</code>,
                            <code>$petrol</code>, <code>$petrol-bright</code>, <code>$coral</code>,
                            <code>$coral-bright</code>, <code>$olive</code>,
                            <code>$olive-bright</code>, <code>$purple</code>,
                            <code>$purple-bright</code>, <code>$aubergine</code>,
                            <code>$aubergine-bright</code>
                          </li>
                        </ul>
                        <span class="info"
                          >Colors are now handled by
                          <a href="/?path=/docs/43481535-5b39-40b5-a273-478b07dc3b31--docs"
                            >palettes</a
                          >.</span
                        >
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
                        Standard HTML Alert component (<code>.alert</code>,
                        <code>.alert-*</code>) removed
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
                        Loader renamed to spinner
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
                        id="others.spinner_sizes"
                        class="form-check-input"
                        type="checkbox"
                        ?checked="${this.state.others.spinner_sizes}"
                      />
                      <label class="form-check-label" for="others.spinner_sizes">
                        <span data-info="automigration" class="tag tag-sm tag-info"
                          >🪄 migration rule</span
                        >
                        Loader size classes renamed
                        <ul>
                          <li><code>.loader-xs</code> is now <code>.spinner-16</code></li>
                          <li><code>.loader-sm</code> is now <code>.spinner-40</code></li>
                        </ul>
                      </label>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </li>
          <li>
            <h3>🧹 Clean up</h3>
            <p>
              You're almost done! After completing the migration steps above, you can now remove all
              remaining references to
              <strong>Bootstrap</strong> and <strong>Ng-Bootstrap</strong> from your project. The
              steps below help ensure that no deprecated imports or dependencies remain.
            </p>
            <ol>
              <li>
                Search your CSS or SCSS files for any occurrences of
                <code>@import 'bootstrap/...';</code> and remove them.
              </li>
              <li>
                Check your TypeScript files for Ng-Bootstrap imports such as
                <code>import { ... } from '@ng-bootstrap/ng-bootstrap';</code> and delete them.
                <span class="info">
                  💡 <em>Note:</em> Your project might also use Ng-Bootstrap components that were
                  not previously styled by the Design System. In that case, verify whether an
                  equivalent component exists in the Design System. If no equivalent is available
                  yet, you may need to keep <strong>Ng-Bootstrap</strong> temporarily until a
                  replacement is provided.
                </span>
              </li>
              <li>
                Once you've verified that your project builds and displays correctly, uninstall the
                packages by running:
                <code languages="['bash']">npm uninstall bootstrap @ng-bootstrap/ng-bootstrap</code>
              </li>
            </ol>
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
