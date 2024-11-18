import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getLocaleStorage, MIGRATION_CHECKS_KEY, setLocaleStorage } from './util/persist.util';
import { _templateAutoIcon } from './util/template.util';

@customElement('migration-version-4-5-manual-list')
export class MigrationV45ManualListComponent extends LitElement {
  @property({ type: Boolean }) angular?: boolean;

  @state()
  private state: TodoListChecks = {
    general: {
      naming_cwfpackagename: false,
      naming_entryfiles: false,
      naming_cwflicense: false,
      naming_cwfname: false,
      naming_options: false,
      variables_isolatecomponents: false,
      variables_fontsizemap: false,
      variables_lineheightrg: false,
      variables_floatinglabel: false,
      variables_colorsremoved: false,
      variables_colorsrenamed: false,
      variables_lineheigts: false,
      variables_lineheightlighter: false,
      variables_headingfontsizes: false,
      mixins_fontsizelineheight: false,
      classes_bgopacity: false,
      classes_secondary: false,
      classes_rtlmode: false,
      classes_sronly: false,
    },
    bootstrap: {
      alerts_closebuttoncontent: false,
      alerts_closebuttonclass: false,
      badges_classes: false,
      backgrounds_textcolor: false,
      blockquotes_footerstructure: false,
      blockquotes_qclass: false,
      buttons_outline: false,
      buttons_borderradius: false,
      buttons_borderradius2: false,
      buttons_invertedclass: false,
      buttons_iconclass: false,
      buttonclose_content: false,
      buttonclose_class: false,
      buttonclose_buttonclasses: false,
      cards_classes: false,
      forms_formlabelclass: false,
      forms_formgroup: false,
      forms_formtext: false,
      formcontrols_formfloatingwrapper: false,
      formcontrols_formfloatingcontrollgclass: false,
      formselects_formfloatingwrapper: false,
      formselects_classes: false,
      formselects_formfloatingselectlgclass: false,
      formtextareas_formfloatingwrapper: false,
      formtextareas_formfloatingcontrollgclass: false,
      formfiles_formfloatingwrapper: false,
      formfiles_formfloatingcontrollgclass: false,
      formfiles_formlabelclass: false,
      formcheckboxes_classes: false,
      formcheckboxes_validationclasses: false,
      formcheckboxes_validationfeedbackclasses: false,
      formradios_classes: false,
      formradios_validationclasses: false,
      formradios_validationfeedbackclasses: false,
      formswitches_classes: false,
      formswitches_labelclasses: false,
      formswitches_validationclasses: false,
      formswitches_validationfeedbackclasses: false,
    },
    ngbootstrap: {
      buttons_labelclass: false,
      buttons_inputclass: false,
      buttons_grouptoggleclass: false,
      datepickers_variables: false,
      modals_closebuttoncontent: false,
      modals_closebuttonclass: false,
    },
    jquery: {
      accordions_removed: false,
    },
    post: {
      accordions_removed: false,
      customselects_formfloatingwrapper: false,
      customselects_classes: false,
      customselects_menuclass: false,
      subnavigations_invertedclass: false,
      topicteasers_imageattributes: false,
      topicteasers_imagecontainergridclasses: false,
      topicteasers_contentcontainergridclasses: false,
      topicteasers_linklistfontcurve: false,
    },
  };

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  constructor() {
    super();
    this._restorePersistedState();
  }

  render() {
    return html`
      <post-accordion heading-level="5" multiple @change="${this._onChange}">
        <post-accordion-item collapsed>
          <span slot="header">
            General
            <span class="todo-list-status"> ${this._templateGroupTodoListStatus('general')} </span>
          </span>

          <!-- General Files -->
          <section>
            <h6>Paths &amp; Files</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="general.naming_cwfpackagename"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.naming_cwfpackagename}"
                  />

                  <label class="form-check-label" for="general.naming_cwfpackagename">
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed <em>packages</em>.
                    <ul class="mt-8">
                      <li>
                        <code>@******/common-web-frontend</code> became
                        <code>@swisspost/design-system-styles</code>
                      </li>
                      <li>
                        <code>@******/common-web-frontend-demo</code> became
                        <code>@swisspost/design-system-demo</code>
                      </li>
                      <li>
                        <code>@******/common-web-frontend-intranet-header</code> became
                        <code>@swisspost/design-system-intranet-header</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.naming_entryfiles"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.naming_entryfiles}"
                  />
                  <label for="general.naming_entryfiles" class="form-check-label">
                    <span class="tag tag-sm tag-danger">breaking</span>
                    Renamed entry files. Renamed entry files.
                    <br />

                    <ul class="mt-8">
                      <li class="mb-8">
                        <strong>Default (index)</strong>
                        for default Post styles:
                        <br />
                        <code> @use "@*****/common-web-frontend/post.scss"; </code>
                        to
                        <code> @use "@swisspost/design-system-styles"; </code>
                      </li>
                      <li class="mb-8">
                        <strong>Intranet</strong>
                        for default Post styles + intranet header styles:
                        <br />
                        <code> @use "@*****/common-web-frontend/post-intranet"; </code>
                        to
                        <code> @use "@swisspost/design-system-styles/intranet.scss"; </code>
                      </li>
                      <li class="mb-8">
                        <strong>Basics</strong>
                        for resets, typography, utilities and grid only (use this for small pages
                        with lots of custom styles):
                        <br />
                        <code> @use "@*****/common-web-frontend/post-basics.scss"; </code>
                        to
                        <code> @use "@swisspost/design-system-styles/basics.scss"; </code>
                      </li>
                      <li class="mb-8">
                        <strong>Core</strong>
                        for functions, mixins, variables and placeholders:
                        <br />
                        <code> @use "@*****/common-web-frontend/_cwf.scss"; </code>
                        to
                        <code> @use "@swisspost/design-system-styles/core.scss"; </code>
                      </li>
                    </ul>

                    <span class="info">
                      Read more about Sass modules and the @use rule in the Sass
                      <a href="https://sass-lang.com/documentation/at-rules/use">
                        @use documentation </a
                      >.
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.naming_cwfname"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.naming_cwfname}"
                  />

                  <label class="form-check-label" for="general.naming_cwfname">
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>src/cwf.scss</em> file to <em>src/core.scss</em>.<br />
                    <span
                      >We recommend to import the <em>core.scss</em> file as follows:
                      <code>@use '@swisspost/design-system-styles/core.scss' as post;</code></span
                    ><br />
                    <span
                      >In any case, do not forget to switch the namespace in your files from
                      <em>cwf.</em> to either <em>core.</em> or <em>post.</em> depending on the
                      import.
                    </span>
                    <span class="info"
                      >Read more about namespaces in the
                      <a href="https://sass-lang.com/blog/the-module-system-is-launched"
                        >Sass module system intro</a
                      >.</span
                    >
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.naming_cwflicense"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.naming_cwflicense}"
                  />

                  <label class="form-check-label" for="general.naming_cwflicense">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>src/lic/cwf-license.scss</em>
                    file.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.naming_options"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.naming_options}"
                  />

                  <label class="form-check-label" for="general.naming_options">
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>src/themes/bootstrap/options.scss</em> file to
                    <em>src/variables/features.scss</em>.
                  </label>
                </div>
              </li>
            </ul>
          </section>

          <!-- General Variables -->
          <section>
            <h6>Variables</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_isolatecomponents"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_isolatecomponents}"
                  />

                  <label class="form-check-label" for="general.variables_isolatecomponents">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <code>$isolate-components</code>
                    variable.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_fontsizemap"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_fontsizemap}"
                  />

                  <label class="form-check-label" for="general.variables_fontsizemap">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <code>$font-size-map</code>
                    variable.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_lineheightrg"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_lineheightrg}"
                  />

                  <label class="form-check-label" for="general.variables_lineheightrg">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <code>$line-height-rg</code> variable.<br />
                    <em>Line-heights</em> are now relative to the font-size.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_floatinglabel"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_floatinglabel}"
                  />

                  <label class="form-check-label" for="general.variables_floatinglabel">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>floating-label</em> variables.<br />
                    <ul class="mt-8">
                      <li><code>$form-floating-label-padding-t</code></li>
                      <li><code>$form-floating-label-padding-b</code></li>
                      <li><code>$form-floating-textarea-line-height</code></li>
                      <li><code>$form-floating-textarea-padding-t</code></li>
                      <li><code>$form-floating-textarea-padding-b</code></li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_colorsremoved"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_colorsremoved}"
                  />

                  <label class="form-check-label" for="general.variables_colorsremoved">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>color</em> variables.<br />
                    <ul class="mt-8">
                      <li>
                        <code>$white-alpha-10</code>, <code>$white-alpha-20</code>,
                        <code>$white-alpha-40</code>, <code>$white-alpha-60</code>,
                        <code>$white-alpha-80</code> and <code>$white-alphas</code>
                      </li>
                      <li>
                        <code>$black-alpha-10</code>, <code>$black-alpha-20</code>,
                        <code>$black-alpha-40</code>, <code>$black-alpha-60</code>,
                        <code>$black-alpha-80</code> and <code>$black-alphas</code>
                      </li>
                      <li>
                        <code>$facebook</code>, <code>$instagram</code>, <code>$youtube</code>,
                        <code>$snapchat</code>, <code>$twitter</code>, <code>$xing</code>,
                        <code>$linkedin</code>, <code>$kununu</code> and <code>$email</code>
                      </li>
                      <li><code>$primary-color</code></li>
                      <li><code>$secondary-color</code></li>
                      <li><code>$gray-50</code></li>
                      <li><code>$highlight-colors</code></li>
                      <li><code>$brand-colors</code></li>
                      <li><code>$icon-colors</code></li>
                      <li><code>$theme-color-interval</code></li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_colorsrenamed"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_colorsrenamed}"
                  />

                  <label class="form-check-label" for="general.variables_colorsrenamed">
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>color</em> variables.
                    <ul class="mt-8">
                      <li><code>$gray-pampas</code> became <code>$gray-background-light</code></li>
                      <li><code>$gray-cararra</code> became <code>$gray-background</code></li>
                      <li><code>$colors</code> became <code>$background-colors</code></li>
                      <li><code>$icon-colors</code> became <code>$contextual-colors</code></li>
                      <li>
                        <code>$yiq-contrasted-threshold</code> became
                        <code>$min-contrast-ratio</code>
                      </li>
                      <li><code>$yiq-text-dark</code> became <code>$color-contrast-dark</code></li>
                      <li>
                        <code>$yiq-text-light</code> became <code>$color-contrast-light</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_lineheigts"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_lineheigts}"
                  />

                  <label class="form-check-label" for="general.variables_lineheigts">
                    Dropped usage of <em>line-height</em> variables.<br />
                    <ul class="mt-8">
                      <li><code>$line-height-sm</code></li>
                      <li><code>$line-height-lg</code></li>
                    </ul>
                    <p class="info">The variables remain available because of Bootstrap.</p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_lineheightlighter"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_lineheightlighter}"
                  />

                  <label class="form-check-label" for="general.variables_lineheightlighter">
                    Dropped usage of <code>$font-weight-lighter</code> variable.<br />
                    Also removed corresponding <code>@font-face</code> rule.<br />
                    <p class="info">The variable remains available because of Bootstrap.</p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.variables_headingfontsizes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.variables_headingfontsizes}"
                  />

                  <label class="form-check-label" for="general.variables_headingfontsizes">
                    Dropped usage of <em>font-size</em> variables.<br />
                    Headings now have responsive font-sizes.<br />
                    <ul class="mt-8">
                      <li><code>$h1-font-size</code></li>
                      <li><code>$h2-font-size</code></li>
                      <li><code>$h3-font-size</code></li>
                      <li><code>$h4-font-size</code></li>
                      <li><code>$h5-font-size</code></li>
                      <li><code>$h6-font-size</code></li>
                    </ul>
                    <p class="info">The variables remain available because of Bootstrap.</p>
                  </label>
                </div>
              </li>
            </ul>
          </section>

          <!-- General Mixins -->
          <section>
            <h6>Mixins</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="general.mixins_fontsizelineheight"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.mixins_fontsizelineheight}"
                  />

                  <label class="form-check-label" for="general.mixins_fontsizelineheight">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>font-size</em> and <em>line-height</em> mixins:<br />
                    <ul class="mt-8">
                      <li><code>font-size-calc()</code></li>
                      <li><code>font-size-and-lineheight()</code></li>
                      <li><code>font-line-height()</code></li>
                    </ul>
                  </label>
                </div>
              </li>
            </ul>
          </section>

          <!-- General Classes -->
          <section>
            <h6>Classes</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="general.classes_bgopacity"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.classes_bgopacity}"
                  />

                  <label class="form-check-label" for="general.classes_bgopacity">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <code>.bg-[colorname]-opacity-[opacityvalue]</code> classes.<br />
                    Use <code>.bg-[colorname]</code> together with
                    <code>var(--post-bg-opacity)</code> instead.<br />
                    <p class="info">
                      Replace [colorname] for example with "primary", "warning", etc.
                    </p>
                    <p class="info">Replace [opacityvalue] for example with "0", "0.5" or "1".</p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.classes_secondary"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.classes_secondary}"
                  />

                  <label class="form-check-label" for="general.classes_secondary"
                    >${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>secondary</em> classes.<br />
                    <ul class="mt-8">
                      <li><code>.bg-secondary</code></li>
                      <li><code>.border-secondary</code></li>
                      <li><code>.text-secondary</code></li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.classes_rtlmode"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.classes_rtlmode}"
                  />

                  <label class="form-check-label" for="general.classes_rtlmode">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span>
                    Updated spacing and alignment helper classes, for better support of
                    <em>rtl-mode</em>.
                    <ul class="mt-8">
                      <li><code>.ml-[size]</code> became <code>.ms-[size]</code></li>
                      <li>
                        <code>.ml-[breakpoint]-[size]</code> became
                        <code>.ms-[breakpoint]-[size]</code>
                      </li>
                      <li><code>.mr-[size]</code> became <code>.me-[size]</code></li>
                      <li>
                        <code>.mr-[breakpoint]-[size]</code> became
                        <code>.me-[breakpoint]-[size]</code>
                      </li>
                      <hr />
                      <li><code>.pl-[size]</code> became <code>.ps-[size]</code></li>
                      <li>
                        <code>.pl-[breakpoint]-[size]</code> became
                        <code>.ps-[breakpoint]-[size]</code>
                      </li>
                      <li><code>.pr-[size]</code> became <code>.pe-[size]</code></li>
                      <li>
                        <code>.pr-[breakpoint]-[size]</code> became
                        <code>.pe-[breakpoint]-[size]</code>
                      </li>
                      <hr />
                      <li><code>.float-left</code> became <code>.float-start</code></li>
                      <li>
                        <code>.float-[breakpoint]-left</code> became
                        <code>.float-[breakpoint]-start</code>
                      </li>
                      <li><code>.float-right</code> became <code>.float-end</code></li>
                      <li>
                        <code>.float-[breakpoint]-right</code> became
                        <code>.float-[breakpoint]-end</code>
                      </li>
                      <hr />
                      <li><code>.text-left</code> became <code>.text-start</code></li>
                      <li>
                        <code>.text-[breakpoint]-left</code> became
                        <code>.text-[breakpoint]-start</code>
                      </li>
                      <li><code>.text-right</code> became <code>.text-end</code></li>
                      <li>
                        <code>.text-[breakpoint]-right</code> became
                        <code>.text-[breakpoint]-end</code>
                      </li>
                    </ul>
                    <p class="info">
                      Replace [size] for example with "hair", "line", ... "bigger-giant" or "0",
                      "1", ... "5".
                    </p>
                    <p class="info">Replace [breakpoint] for example with "xs", "sm", ... "xxl".</p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="general.classes_sronly"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.general.classes_sronly}"
                  />

                  <label class="form-check-label" for="general.classes_sronly"
                    >${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Updated
                    <em>sr-only</em>
                    classes.
                    <ul class="mt-8">
                      <li><code>.sr-only</code> became <code>.visually-hidden</code></li>
                      <li>
                        <code>.sr-only-focusable</code> became
                        <code>.visually-hidden-focusable</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
            </ul>
          </section>
        </post-accordion-item>

        <post-accordion-item collapsed>
          <span slot="header">
            Bootstrap
            <span class="todo-list-status">
              ${this._templateGroupTodoListStatus('bootstrap')}
            </span>
          </span>

          <!-- Bootstrap Alert / Notifications -->
          <section>
            <h6>Alert / Notification</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.alerts_closebuttoncontent"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.alerts_closebuttoncontent}"
                  />

                  <label class="form-check-label" for="bootstrap.alerts_closebuttoncontent">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed the
                    <code>&lt;span aria-hidden="true"&gt;&lt;/span&gt;</code>
                    element contained in the <em>close-button</em>
                    elements.
                    <span class="info">The close icon will be rendered anyway.</span>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.alerts_closebuttonclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.alerts_closebuttonclass}"
                  />

                  <label class="form-check-label" for="bootstrap.alerts_closebuttonclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed class
                    <code>.close</code> to <code>.btn-close</code>.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/alerts"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Badge -->
          <section>
            <h6>Badge</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.badges_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.badges_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.badges_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>badge</em> classes.<br />
                    <ul class="mt-8">
                      <li>
                        <code>.badge-pill</code> became
                        <code>.rounded-pill</code>
                      </li>
                      <li>
                        <code>.badge-[colorname]</code> became
                        <code>.bg-[colorname]</code>
                      </li>
                      <li>
                        <code>.badge-outline-[colorname]</code> became
                        <code>.border-[colorname]</code>
                      </li>
                      <li>
                        <code>.badge-gray-cararra</code> became
                        <code>.bg-light</code>
                      </li>
                      <li>
                        <code>.badge-outline-gray-carrara-thick</code> became
                        <code>.border-light.border-2</code>
                      </li>
                    </ul>
                    <p class="info">
                      Replace [colorname] for example with "primary", "warning", etc.
                    </p>
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/badge"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Background -->
          <section>
            <h6>Background</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.backgrounds_textcolor"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.backgrounds_textcolor}"
                  />

                  <label class="form-check-label" for="bootstrap.backgrounds_textcolor">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.text-auto</code> class on elements with background classes such as
                    <code>.bg-[colorname]</code>. The <em>text-color</em> is now automatically
                    defined with <code>var(--post-contrast-color)</code>, therefore an explicit
                    color style is no longer needed.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/background"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Blockquote -->
          <section>
            <h6>Blockquote</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.blockquotes_footerstructure"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.blockquotes_footerstructure}"
                  />

                  <label class="form-check-label" for="bootstrap.blockquotes_footerstructure">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Refactored
                    <em>blockquote</em> with footer.<br />
                    Such blockquotes should now be nested in a
                    <code>figure</code> tag. In addition, the tag
                    <code>footer.blockquote-footer</code> became
                    <code>figcaption.blockquote-footer</code>.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.blockquotes_qclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.blockquotes_qclass}"
                  />

                  <label class="form-check-label" for="bootstrap.blockquotes_qclass">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.mb-0</code> class, on <em>p</em> tags within
                    <em>blockquote</em> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/blockquotes"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Button -->
          <section>
            <h6>Button</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttons_outline"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttons_outline}"
                  />

                  <label class="form-check-label" for="bootstrap.buttons_outline">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>button</em> classes <code>.btn-outline-[colorname]</code>.<br />
                    All the <code>.btn-outline-[colorname]</code> classes will be replaced by
                    <code>.btn-secondary</code>.
                    <p class="info">
                      Replace [colorname] for example with "primary", "warning", etc.
                    </p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttons_borderradius"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttons_borderradius}"
                  />

                  <label class="form-check-label" for="bootstrap.buttons_borderradius">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>button</em> variables.<br />
                    <ul class="mt-8">
                      <li><code>$btn-border-radius-rg</code></li>
                      <li><code>$btn-border-radius-map</code></li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttons_borderradius2"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttons_borderradius2}"
                  />

                  <label class="form-check-label" for="bootstrap.buttons_borderradius2">
                    Dropped the usage of <em>button</em> variables.
                    <ul class="mt-8">
                      <li><code>$btn-border-radius-sm</code></li>
                      <li><code>$btn-border-radius-lg</code></li>
                    </ul>
                    <p class="info">The variables remain available because of Bootstrap.</p>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttons_invertedclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttons_invertedclass}"
                  />

                  <label class="form-check-label" for="bootstrap.buttons_invertedclass">
                    ${this._templateAutoIconAngular()} Dropped the usage of
                    <code>.btn-inverted</code> class.<br />
                    <em>Text-colors</em> are now automatically handled.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttons_iconclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttons_iconclass}"
                  />

                  <label class="form-check-label" for="bootstrap.buttons_iconclass">
                    ${this._templateAutoIconAngular()} Dropped the usage of
                    <code>.btn-icon</code> class for buttons with <em>icon</em> and visible
                    <em>text</em>.<br />
                    <em>Icon-only</em> buttons still need this class!
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/buttons"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Button Close -->
          <section>
            <h6>Button Close</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttonclose_content"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttonclose_content}"
                  />

                  <label class="form-check-label" for="bootstrap.buttonclose_content">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed the
                    <code>&lt;span aria-hidden="true"&gt;&lt;/span&gt;</code>
                    element contained in the <em>close-button</em>
                    elements.
                    <span class="info">The close icon will be rendered anyway.</span>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttonclose_class"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttonclose_class}"
                  />

                  <label class="form-check-label" for="bootstrap.buttonclose_class">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed class
                    <code>.close</code> to <code>.btn-close</code>.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.buttonclose_buttonclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.buttonclose_buttonclasses}"
                  />

                  <label class="form-check-label" for="bootstrap.buttonclose_buttonclasses">
                    ${this._templateAutoIconAngular()} Dropped the usage of
                    <code>.btn</code> and <code>.btn-icon</code> classes.<br />
                    <span class="info"
                      >Unless you want to have a button-like appearance, you should not use these
                      classes on a <em>close-button</em> element.</span
                    >
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/card"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Cards -->
          <section>
            <h6>Card</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.cards_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.cards_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.cards_classes">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>card</em> classes <code>.card-deck</code> and
                    <code>.card-columns</code>.<br />
                    Use the <em>grid-system</em> instead.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/card"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Forms -->
          <section>
            <h6>Forms</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="boostrapforms_formlabelclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.forms_formlabelclass}"
                  />

                  <label class="form-check-label" for="boostrapforms_formlabelclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required class
                    <code>.form-label</code> on <em>form-label</em> elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.forms_formgroup"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.forms_formgroup}"
                  />

                  <label class="form-check-label" for="bootstrap.forms_formgroup">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.form-group</code> class.<br />
                    Use <em>utility-class</em>&nbsp;<code>.mb-16</code> instead.<br />
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.forms_formtext"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.forms_formtext}"
                  />

                  <label class="form-check-label" for="bootstrap.forms_formtext">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.small</code> and <code>.text-muted</code> classes on
                    <code>.form-text</code> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/forms"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-Controls -->
          <section>
            <h6>From Control</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="boostrapformcontrols_formfloatingwrapper"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formcontrols_formfloatingwrapper}"
                  />

                  <label class="form-check-label" for="boostrapformcontrols_formfloatingwrapper">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required a
                    <code>&lt;div class="form-floating"&gt;...&lt;/div&gt;</code>
                    wrapper around <em>floating-label</em>
                    elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="boostrapformcontrols_formfloatingcontrollgclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formcontrols_formfloatingcontrollgclass}"
                  />

                  <label
                    class="form-check-label"
                    for="boostrapformcontrols_formfloatingcontrollgclass"
                  >
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.form-control-lg</code> class on <em>floating-label</em> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-control"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-Select -->
          <section>
            <h6>From Select</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="boostrapformselects_formfloatingwrapper"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formselects_formfloatingwrapper}"
                  />

                  <label class="form-check-label" for="boostrapformselects_formfloatingwrapper">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required a
                    <code>&lt;div class="form-floating"&gt;...&lt;/div&gt;</code>
                    wrapper around <em>floating-label</em>
                    elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formselects_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formselects_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.formselects_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed <em>select</em>,
                    <em>multi-select</em> and
                    <em>custom-select</em>
                    classes.
                    <ul class="mt-8">
                      <li>
                        <code>.form-control</code> became
                        <code>.form-select</code>
                      </li>
                      <li>
                        <code>.form-control-lg</code> became
                        <code>.form-select-lg</code>
                      </li>
                      <li>
                        <code>.form-control-rg</code> became
                        <code>.form-select-rg</code>
                      </li>
                      <li>
                        <code>.form-control-sm</code> became
                        <code>.form-select-sm</code>
                      </li>
                      <li>
                        <code>.custom-select</code> became
                        <code>.form-select</code>
                      </li>
                      <li>
                        <code>.custom-select-lg</code> became
                        <code>.form-select-lg</code>
                      </li>
                      <li>
                        <code>.custom-select-rg</code> became
                        <code>.form-select-rg</code>
                      </li>
                      <li>
                        <code>.custom-select-sm</code> became
                        <code>.form-select-sm</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formselects_formfloatingselectlgclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formselects_formfloatingselectlgclass}"
                  />

                  <label
                    class="form-check-label"
                    for="bootstrap.formselects_formfloatingselectlgclass"
                  >
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.form-control-lg</code> class on <em>floating-label</em> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-select"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-Textarea -->
          <section>
            <h6>From Textarea</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="boostrapformtextareas_formfloatingwrapper"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formtextareas_formfloatingwrapper}"
                  />

                  <label class="form-check-label" for="boostrapformtextareas_formfloatingwrapper">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required a
                    <code>&lt;div class="form-floating"&gt;...&lt;/div&gt;</code>
                    wrapper around <em>floating-label</em>
                    elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-textarea"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-File -->
          <section>
            <h6>Form File</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="boostrapformfiles_formlabelclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formfiles_formlabelclass}"
                  />

                  <label class="form-check-label" for="boostrapformfiles_formlabelclass">
                    <span class="tag tag-sm tag-danger">breaking</span> Required class
                    <code>.form-label</code> on <em>form-label</em> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-file"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-Checkbox -->
          <section>
            <h6>From Checkbox</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formcheckboxes_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formcheckboxes_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.formcheckboxes_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>control</em>
                    classes.
                    <ul class="mt-8">
                      <li>
                        <code>.custom-control.custom-checkbox</code> became
                        <code>.form-check</code>
                      </li>
                      <li>
                        <code>.custom-control-input</code> became
                        <code>.form-check-input</code>
                      </li>
                      <li>
                        <code>.custom-control-label</code> became
                        <code>.form-check-label</code>
                      </li>
                      <li>
                        <code>.custom-control-inline</code> became
                        <code>.form-check-inline</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formcheckboxes_validationclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formcheckboxes_validationclasses}"
                  />

                  <label class="form-check-label" for="bootstrap.formcheckboxes_validationclasses">
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation</em> classes.<br />
                    The classes <code>.is-valid</code> and <code>.is-invalid</code> now belong on
                    the <code>.form-check-input</code> element. The <code>.form-check</code> element
                    does no longer require the <em>validation</em> classes.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formcheckboxes_validationfeedbackclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formcheckboxes_validationfeedbackclasses}"
                  />

                  <label
                    class="form-check-label"
                    for="bootstrap.formcheckboxes_validationfeedbackclasses"
                  >
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation-feedback</em> elements.<br />
                    The elements <code>.valid-feedback</code> and <code>.invalid-feedback</code> now
                    belong inside of the <code>.form-check</code> element.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-check"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Bootstrap Form-Radio -->
          <section>
            <h6>From Radio</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formradios_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formradios_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.formradios_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed
                    <em>control</em>
                    classes.
                    <ul class="mt-8">
                      <li>
                        <code>.custom-control.custom-radio</code> became
                        <code>.form-check</code>
                      </li>
                      <li>
                        <code>.custom-control-input</code> became
                        <code>.form-check-input</code>
                      </li>
                      <li>
                        <code>.custom-control-label</code> became
                        <code>.form-check-label</code>
                      </li>
                      <li>
                        <code>.custom-control-inline</code> became
                        <code>.form-check-inline</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formradios_validationclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formradios_validationclasses}"
                  />

                  <label class="form-check-label" for="bootstrap.formradios_validationclasses">
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation</em> classes.<br />
                    The classes <code>.is-valid</code> and <code>.is-invalid</code> now belong on
                    the <code>.form-check-input</code> element. The <code>.form-check</code> element
                    does no longer require the <em>validation</em> classes.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formradios_validationfeedbackclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formradios_validationfeedbackclasses}"
                  />

                  <label
                    class="form-check-label"
                    for="bootstrap.formradios_validationfeedbackclasses"
                  >
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation-feedback</em> elements.<br />
                    The elements <code>.valid-feedback</code> and <code>.invalid-feedback</code> now
                    belong inside of the <code>.form-check</code> element.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-radio"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>

          <!-- Post Switch -->
          <section>
            <h6>Form Switch</h6>

            <p>
              The
              <em>switch</em>
              component has been moved to the
              <strong>Bootstrap</strong>
              section since Bootstrap version 5.x now provides such a component.
              <span class="info">
                If you import this component manually, you need to update to the new file path.
              </span>
            </p>

            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formswitches_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formswitches_classes}"
                  />

                  <label class="form-check-label" for="bootstrap.formswitches_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Refactored
                    <em>switch</em> classes.<br />
                    <ul class="mt-8">
                      <li>
                        <code>.switch</code> became
                        <code>.form-check.form-switch</code>
                      </li>
                      <li>
                        <code>.switch input.switch</code> became
                        <code>input.form-check-input</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formswitches_labelclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formswitches_labelclasses}"
                  />

                  <label class="form-check-label" for="bootstrap.formswitches_labelclasses">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Refactored
                    <em>switch-label</em>.<br />
                    <ul class="mt-8">
                      <li>
                        <code>div.switch label</code> (before <code>label.switch-toggler</code>)
                        became
                        <code>label.form-check-label.order-first</code>
                      </li>
                      <li><code>div.switch label.switch-toggler</code> has been removed</li>
                      <li>
                        <code>div.switch label</code> (after <code>label.switch-toggler</code>)
                        became
                        <code>label.form-check-label</code>
                      </li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formswitches_validationclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formswitches_validationclasses}"
                  />

                  <label class="form-check-label" for="bootstrap.formswitches_validationclasses">
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation</em> classes.<br />
                    The classes <code>.is-valid</code> and <code>.is-invalid</code> now belong on
                    the <code>.form-check-input</code> element.<br />
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="bootstrap.formswitches_validationfeedbackclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.bootstrap.formswitches_validationfeedbackclasses}"
                  />

                  <label
                    class="form-check-label"
                    for="bootstrap.formswitches_validationfeedbackclasses"
                  >
                    <span class="tag tag-sm tag-danger">breaking</span> Shifted
                    <em>validation-feedback</em> elements.<br />
                    The elements <code>.valid-feedback</code> and <code>.invalid-feedback</code> now
                    belong inside of the <code>.form-check</code> element.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/bootstrap-samples/form-switch"
                >documentation</a
              >
              for more detailed information.
            </p>
          </section>
        </post-accordion-item>

        <post-accordion-item collapsed>
          <span slot="header">
            NgBootstrap
            <span class="todo-list-status">
              ${this._templateGroupTodoListStatus('ngbootstrap')}
            </span>
          </span>

          <!-- ngBootstrap Buttons -->
          <div>
            <h6>Buttons</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.buttons_labelclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.buttons_labelclass}"
                  />

                  <label class="form-check-label" for="ngbootstrap.buttons_labelclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Refactored
                    <code>label.btn-primary</code> to <code>label.btn.btn-secondary</code>.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.buttons_inputclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.buttons_inputclass}"
                  />

                  <label class="form-check-label" for="ngbootstrap.buttons_inputclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required class
                    <code>.btn-check</code> on the <code>input</code> element.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.buttons_grouptoggleclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.buttons_grouptoggleclass}"
                  />

                  <label class="form-check-label" for="ngbootstrap.buttons_grouptoggleclass">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.btn-group-toggle</code>
                    class.
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <!-- ngBootstrap DatePicker -->
          <div>
            <h6>DatePicker</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.datepickers_variables"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.datepickers_variables}"
                  />

                  <label class="form-check-label" for="ngbootstrap.datepickers_variables">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <em>padding</em> variables.
                    <ul class="mt-8">
                      <li><code>$ngb-dp-icon-padding</code></li>
                      <li><code>$ngb-dp-icon-padding-sm</code></li>
                      <li><code>$ngb-dp-icon-padding-rg</code></li>
                      <li><code>$ngb-dp-icon-padding-lg</code></li>
                    </ul>
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/ng-bootstrap-samples/datepicker"
                >documentation</a
              >
              for more detailed information.
            </p>
          </div>

          <!-- ngBootstrap Modal -->
          <div>
            <h6>Modal</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.modals_closebuttoncontent"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.modals_closebuttoncontent}"
                  />

                  <label class="form-check-label" for="ngbootstrap.modals_closebuttoncontent">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed the
                    <code>&lt;span aria-hidden="true"&gt;&lt;/span&gt;</code>
                    element contained in the <em>close-button</em>
                    elements.
                    <span class="info">The close icon will be rendered anyway.</span>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="ngbootstrap.modals_closebuttonclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.ngbootstrap.modals_closebuttonclass}"
                  />

                  <label class="form-check-label" for="ngbootstrap.modals_closebuttonclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Renamed class
                    <code>.close</code> to <code>.btn-close</code>.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/ng-bootstrap-samples/modal"
                >documentation</a
              >
              for more detailed information.
            </p>
          </div>
        </post-accordion-item>

        <post-accordion-item collapsed>
          <span slot="header">
            jQuery
            <span class="todo-list-status"> ${this._templateGroupTodoListStatus('jquery')} </span>
          </span>

          <!-- jQuery Accordion -->
          <div>
            <h6 class="h6 bold">Accordion</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="jquery.accordions_removed"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.jquery.accordions_removed}"
                  />

                  <label class="form-check-label" for="jquery.accordions_removed">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed the entire jQuery
                    <em>accordion</em> component.
                    <p class="info">
                      This can be migrated easily to the new
                      <a href="https://archive.design-system.post.ch/#/bootstrap-samples/accordion"
                        >Bootstrap accordion</a
                      >
                      component.
                    </p>

                    ${this.angular
                      ? html` <p class="alert alert-info">
                          One might think: "When it is so easy to migrate, why don't you offer an
                          automatic migration?"<br />
                          The short answer: because it is no longer the same component!
                        </p>`
                      : nothing}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </post-accordion-item>

        <post-accordion-item collapsed>
          <span slot="header">
            Post
            <span class="todo-list-status"> ${this._templateGroupTodoListStatus('post')} </span>
          </span>

          <!-- Post Accordion -->
          <div>
            <h6>Accordion</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="post.accordions_removed"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.accordions_removed}"
                  />

                  <label class="form-check-label" for="post.accordions_removed">
                    <span class="tag tag-sm tag-danger">breaking</span> Removed the entire Post
                    <em>accordion</em> component and the associated
                    <em>detail-summary</em> stylesheet.<br />
                    The component has been removed due to
                    <a
                      href="https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html"
                      >accessibility issues with the &lt;summary&gt; element</a
                    >.
                    <p class="info">
                      We recommend to use the new
                      <a href="https://archive.design-system.post.ch/#/bootstrap-samples/accordion"
                        >Bootstrap accordion</a
                      >
                      or the existing
                      <a
                        href="https://archive.design-system.post.ch/#/ng-bootstrap-samples/accordion"
                        >Angular accordion</a
                      >
                      component instead.
                    </p>
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <!-- Post Custom-Select -->
          <div>
            <h6>Custom-Select</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="post.customselects_formfloatingwrapper"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.customselects_formfloatingwrapper}"
                  />

                  <label class="form-check-label" for="post.customselects_formfloatingwrapper">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required a
                    <code>&lt;div class="form-floating"&gt;...&lt;/div&gt;</code>
                    wrapper around <em>floating-label</em>
                    elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="post.customselects_classes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.customselects_classes}"
                  />

                  <label class="form-check-label" for="post.customselects_classes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Refactored
                    <code>.form-control.custom-select</code> and
                    <code>.form-control.form-control-lg.custom-select</code> to
                    <code>.form-select</code>.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="post.customselects_menuclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.customselects_menuclass}"
                  />

                  <label class="form-check-label" for="post.customselects_menuclass">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Removed
                    <code>.custom-select-menu</code> class.<br />
                    Use <em>utility-classes</em>&nbsp;<code>.w-100.max-w-100</code>
                    instead.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/post-samples/custom-select"
                >documentation</a
              >
              for more detailed information.
            </p>
          </div>

          <!-- Post Subnavigation -->
          <div>
            <h6>Subnavigation</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="post.subnavigations_invertedclass"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.subnavigations_invertedclass}"
                  />

                  <label class="form-check-label" for="post.subnavigations_invertedclass">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.subnavigation-inverted</code>
                    class.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/post-samples/subnavigation"
                >documentation</a
              >
              for more detailed information.
            </p>
          </div>

          <!-- Post Topic Teaser -->
          <div>
            <h6>Topic Teaser</h6>
            <ul class="list-unstyled my-16">
              <li>
                <div class="form-check">
                  <input
                    id="post.topicteasers_imageattributes"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.topicteasers_imageattributes}"
                  />

                  <label class="form-check-label" for="post.topicteasers_imageattributes">
                    ${this._templateAutoIconAngular()}
                    <span class="tag tag-sm tag-danger">breaking</span> Required
                    <em>image</em>
                    attributes.
                    <ul class="mt-8">
                      <li><code>width="100%"</code></li>
                      <li><code>height="100%"</code></li>
                    </ul>
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="post.topicteasers_imagecontainergridclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.topicteasers_imagecontainergridclasses}"
                  />

                  <label class="form-check-label" for="post.topicteasers_imagecontainergridclasses">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.col-10.col-rg-8.col-lg-4</code> on
                    <code>.topic-teaser-image-container</code> elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="post.topicteasers_contentcontainergridclasses"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.topicteasers_contentcontainergridclasses}"
                  />

                  <label
                    class="form-check-label"
                    for="post.topicteasers_contentcontainergridclasses"
                  >
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.col-12.col-lg-8</code> on <code>.topic-teaser-content</code> elements.
                  </label>
                </div>
              </li>
              <li>
                <div class="form-check">
                  <input
                    id="post.topicteasers_linklistfontcurve"
                    class="form-check-input"
                    type="checkbox"
                    ?checked="${this.state.post.topicteasers_linklistfontcurve}"
                  />

                  <label class="form-check-label" for="post.topicteasers_linklistfontcurve">
                    ${this._templateAutoIconAngular()} Dropped usage of
                    <code>.font-curve-regular</code> on <code>ul.link-list</code> elements.
                  </label>
                </div>
              </li>
            </ul>
            <p class="info">
              See the
              <a href="https://archive.design-system.post.ch/#/post-samples/topic-teaser"
                >documentation</a
              >
              for more detailed information.
            </p>
          </div>
        </post-accordion-item>
      </post-accordion>
    `;
  }

  private _restorePersistedState() {
    const stateTypeFromLocalStorage = getLocaleStorage(MIGRATION_CHECKS_KEY);
    if (stateTypeFromLocalStorage) {
      this.state = stateTypeFromLocalStorage;
    }
  }

  private _onChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    this._toggleStateProperty(event.target.id);
    this._updatePersistedState();
    this.requestUpdate();
  }

  private _toggleStateProperty(path: string) {
    const keys = path.split('.');
    const last_key = keys.pop();
    if (last_key) {
      const last_obj = keys.reduce((o, k) => o[k], this.state);
      last_obj[last_key] = !last_obj[last_key];
    }
  }

  private _updatePersistedState() {
    setLocaleStorage(MIGRATION_CHECKS_KEY, this.state);
  }

  private _templateAutoIconAngular() {
    return html` ${this.angular ? _templateAutoIcon() : nothing} `;
  }

  public _templateGroupTodoListStatus(group: keyof TodoListChecks) {
    const checkboxValues = Object.values(this.state?.[group] ?? {});
    const checkedValues = checkboxValues.filter(v => v === true);

    return `${checkedValues.length} of ${checkboxValues.length} done`;
  }
}
