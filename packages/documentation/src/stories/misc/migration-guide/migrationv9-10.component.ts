import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-version-9-10')
export class MigrationV99Component extends LitElement {
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
    if (!this.currentVersion || this.currentVersion > 9) return nothing;

    return html`
      <h2 id="migration-from-v9-to-v10" class="docs-autolink">
        Migration from v9 to v10
        <a
          aria-hidden="true"
          tabindex="-1"
          href="/?path=/docs/c23b1d0b-76b3-4e38-aa76-b10c29bb873f--docs#migration-from-v9-to-v10"
        >
          <post-icon name="2037"></post-icon>
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

            <section>
              <h4>Styles</h4>

              <h5>Forms</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed tooltip validation classes
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    The <code>.form-text</code> class has been renamed to <code>.form-hint</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Some <code>form-check</code> scss variables have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$form-check-inline-margin-left</code></li>
                    <li><code>$form-check-input-width</code></li>
                    <li><code>$form-check-min-height</code></li>
                    <li><code>$form-check-padding-start</code></li>
                    <li><code>$form-check-input-color</code></li>
                    <li><code>$form-check-input-bg</code></li>
                    <li><code>$form-check-input-border</code></li>
                    <li><code>$form-check-input-border-radius</code></li>
                    <li><code>$form-check-radio-border-radius</code></li>
                    <li><code>$form-check-input-focus-border</code></li>
                    <li><code>$form-check-input-focus-width</code></li>
                    <li><code>$form-check-input-focus-box-shadow</code></li>
                    <li><code>$form-check-input-active-filter</code></li>
                    <li><code>$form-check-input-hover-color</code></li>
                    <li><code>$form-check-input-checked-color</code></li>
                    <li><code>$form-check-input-checked-bg-color</code></li>
                    <li><code>$form-check-input-checked-border-color</code></li>
                    <li><code>$form-check-input-checked-bg-icon</code></li>
                    <li><code>$form-check-input-checked-bg-image</code></li>
                    <li><code>$form-check-radio-checked-bg-icon</code></li>
                    <li><code>$form-check-radio-checked-bg-image</code></li>
                    <li><code>$form-check-input-indeterminate-color</code></li>
                    <li><code>$form-check-input-indeterminate-bg-color</code></li>
                    <li><code>$form-check-input-indeterminate-border-color</code></li>
                    <li><code>$form-check-input-indeterminate-bg-icon</code></li>
                    <li><code>$form-check-input-indeterminate-bg-image</code></li>
                    <li><code>$form-check-inline-margin-end</code></li>
                    <li><code>$form-check-label-cursor</code></li>
                    <li><code>$form-check-label-color</code></li>
                    <li><code>$form-check-label-padding-x</code></li>
                    <li><code>$form-check-label-padding-top</code></li>
                    <li><code>$form-check-label-padding-start</code></li>
                    <li><code>$form-check-label-padding-end</code></li>
                    <li><code>$form-check-feedback-margin-top</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the <code>@mixin placeholder()</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">
                    The CSS selector <code>::placeholder</code> can be used instead as it is now
                    widely available.
                  </p>
                </li>
              </ul>

              <h5>Grid</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed grid container helper classes
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    The <code>rg</code> and <code>xxl</code> breakpoints have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    The gutter classes naming (<code>g-*</code>, <code>gx-*</code>,
                    <code>gy-*</code>) has changed to pixel-based names
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    Changed the percentage sizing utility classes (<code>w-*</code>,
                    <code>h-*</code>, <code>mh-*</code>, <code>mw-*</code>) naming
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    Removed some pixel sizing utility classes (<code>w-*</code>, <code>h-*</code>,
                    <code>mh-*</code>, <code>mw-*</code>).
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>*-small-large</code></li>
                    <li><code>*-bigger-giant</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Changed the pixel sizing utility classes (<code>w-*</code>, <code>h-*</code>,
                    <code>mh-*</code>, <code>mw-*</code>) to pixel-based names
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    Changed the sizing utility classes max-height and max-width naming
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>mh-*</code> is now <code>max-h-*</code></li>
                    <li><code>mw-*</code> is now <code>max-w-*</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Some Bootstrap utility classes have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    The following elevation utility classes have been renamed
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    Removed some spacing utilities' classes (margin and padding
                    <code>{m/p}{x/y/s/e/t/b}-*</code>)
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>*-small-large</code></li>
                    <li><code>*-bigger-giant</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Changed the spacing utilities' classes (margin and padding
                    <code>{m/p}{x/y/s/e/t/b}-*</code>) naming to pixel-based names
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>Removed utility mixins <span class="tag tag-sm tag-danger">breaking</span></p>
                  <ul>
                    <li>
                      <code>@mixin responsive-size</code>
                    </li>
                    <li>
                      <code>@mixin generate-utility-class()</code>
                    </li>
                    <li>
                      <code>@mixin bezel-small()</code>, <code>@mixin bezel-small-regular()</code>,
                      <code>@mixin bezel-regular()</code>,
                      <code>@mixin bezel-bigger-regular()</code>,
                      <code>@mixin bezel-medium()</code>, <code>@mixin bezel-large()</code>,
                      <code>@mixin bezel-big()</code>
                    </li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Renamed some utility classes
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.h-visuallyhidden</code> is now <code>.visually-hidden</code></li>
                    <li><code>.h-clearfix</code> is now <code>.clearfix</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed some utility classes
                    <span class="tag tag-sm tag-danger">breaking</span>
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
              </ul>

              <h5>Helpers</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    The following bootstrap helper classes have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li>
                      Figures: <code>.figure</code>, <code>.figure-img</code> and
                      <code>.figure-caption</code>
                    </li>
                    <li>Vertical rule: <code>.vr</code></li>
                    <li>Colored background: <code>.text-bg-*</code></li>
                    <li>Colored links: <code>.link-*</code></li>
                    <li>Visually hidden: <code>.visually-hidden-focusable</code></li>
                    <li>Stretched link: <code>.stretched-link</code></li>
                    <li>Stacks: <code>.vstack</code> and <code>.hstack</code></li>
                    <li>Ratios: <code>.ratio</code> and <code>.ratio-*x*</code></li>
                    <li>Icon link: <code>.icon-link</code> and <code>.icon-link-hover</code></li>
                  </ul>
                </li>
              </ul>

              <h5>Typography</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed deprecated font size variables and classes
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    You can now use the font curves <code>.fs-1</code> to <code>.fs-11</code> that
                    are documented in the
                    <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                      >text utilities</a
                    >.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed deprecated font curve variables and classes
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    You can now use the font curves <code>.fs-1</code> to <code>.fs-11</code> that
                    are documented in the
                    <a href="/?path=/docs/c55681df-4d21-469d-a5b3-c67686e7c104--docs"
                      >text utilities</a
                    >.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed font curve mixin
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>@mixin font-curve</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed deprecated line-height variables
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed font-size class <code>.small</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The following classes have been removed as the new Swiss Post font does not
                    provide a light font weight (300)
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.fw-light</code></li>
                    <li><code>.light</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Renamed font-weight utility classes
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>.bold</code> is now <code>.fw-bold</code></li>
                    <li><code>.regular</code> is now <code>.fw-regular</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the following display SCSS variables
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$display1-weight</code></li>
                    <li><code>$display2-weight</code></li>
                    <li><code>$display3-weight</code></li>
                    <li><code>$display4-weight</code></li>
                    <li><code>$display-line-height</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    The display sizes scss variables have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$display{1/2/3/4/5/6}-size</code> variables no longer exist</li>
                  </ul>
                  <p class="info">
                    We recommend using the heading classes to replace their usage, either by using
                    the standard html tags (e.g. <code>h1</code>) or the css classes (e.g.
                    <code>.h1</code>).
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>@function line-height-calc($val)</code> has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">
                    The line height is now set to a default value for both paragraph elements and
                    headings. If a different value is needed, we recommend using the line height
                    text utility classes.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.lh-base</code> class has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.font-monospace</code> class has been removed along with the
                    <code>$font-family-monospace</code> scss variable.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Some text placeholder have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>%list-adjustement</code></li>
                    <li><code>%module-container</code></li>
                    <li><code>%default-module-spacer</code></li>
                    <li><code>%text-container</code></li>
                  </ul>
                </li>
              </ul>

              <h5>Other styles</h5>
              <ul>
                <li class="mb-16">
                  <p>
                    Removed the dependency to bootstrap as well as all of the overrides of its SCSS
                    variables and classes.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Removed the dependency to ng-bootstrap as well as all of the components built on it:
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
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
                </li>
                <li class="mb-16">
                  <p>
                    Some elements of the card component and their corresponding classes have been removed. <span class="tag tag-sm tag-danger">breaking</span>
                    <ul>
                      <li><code>.card-header</code></li>
                      <li><code>.card-body</code></li>
                      <li><code>.card-footer</code></li>
                      <li><code>.card-img</code></li>
                      <li><code>.card-img-top</code></li>
                      <li><code>.card-img-bottom</code></li>
                    </ul>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The card button CSS component has been removed.The <code>.card-button</code> and
                    <code>.card-buttons</code> are therefore no longer available.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.btn-rg</code> class has been removed. Buttons using this class will
                    now fall back to the default <code>btn-md</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.btn-animated</code> class has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.pi-*</code> classes have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">The <code>post-icon</code> component should be used instead.</p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.breadcrumb-item</code> class has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">
                    The <code>post-breadcrumb-item</code> component should be used instead.
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.alert-fixed-bottom</code> class has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>topic-teaser</code> component and all of its related classes have been
                    removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>@mixin scroll-shadows-y</code> has been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.card-group</code> class has been removed.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">Card elements should be set inside a grid container.</p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>.chip-filter</code> has been renamed to
                    <code>.chip-selectable</code> and the small variant of the chip
                    <code>.chip-sm</code> has been removed.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    Some datatable scss variables have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$datatable-sort-asc-icon</code></li>
                    <li><code>$datatable-sort-desc-icon</code></li>
                    <li><code>$datatable-sort-unset-icon</code></li>
                    <li><code>$datatable-sort-editable-icon</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Some stepper scss variables have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$stepper-link-hover-color</code></li>
                    <li><code>$stepper-indicator-hover-outline</code></li>
                    <li><code>$stepper-indicator-font-size</code></li>
                    <li><code>$stepper-link-current-font-size</code></li>
                    <li><code>$stepper-indicator-hover-check-icon</code></li>
                    <li><code>$stepper-indicator-height</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    The following z-index scss variables have been removed, as they were set on
                    elements that are now using popover which place them in the top layer.
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <ul>
                    <li><code>$zindex-sticky</code></li>
                    <li><code>$zindex-fixed</code></li>
                    <li><code>$zindex-modal-backdrop</code></li>
                    <li><code>$zindex-modal</code></li>
                    <li><code>$zindex-popover</code></li>
                    <li><code>$zindex-tooltip</code></li>
                    <li><code>$zindex-alert</code></li>
                  </ul>
                </li>
                <li class="mb-16">
                  <p>
                    Accent colors have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
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
                    All classes and CSS variables related to the bootstrap
                    <code>navbar</code> component have been removed
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h4>Components</h4>

              <ul>
                <li class="mb-16">
                  <p>
                    The <code>post-alert</code> web component is now <code>post-banner</code>
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The <code>heading-level</code> property on <code>post-accordion</code> is now
                    required
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                </li>
                <li class="mb-16">
                  <p>
                    The stencil hydrated flag has switched from the <code>.hydrated</code> class to
                    to the <code>data-hydrated</code> attribute
                    <span class="tag tag-sm tag-danger">breaking</span>
                  </p>
                  <p class="info">
                    If your tests related on the class being present, please rewrite the selector to
                    use the new attribute selector.
                  </p>
                </li>
              </ul>
            </section>
          </li>
        </ol>
      </section>
    `;
  }
}
