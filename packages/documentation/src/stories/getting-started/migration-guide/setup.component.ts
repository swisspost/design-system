import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-setup')
export class SetupComponent extends LitElement {
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
    return html`
      <section>
        <div class="row gap-large migration-options">
          <div class="col-auto">
            <label class="form-label font-curve-small bold" for="docs_Default_ExampleSelect">
              What currentVersion of the Design System is your application currently using?
            </label>
            <select
              @change="${this._onCurrentVersionChange}"
              id="docs_Default_ExampleSelect"
              class="form-select form-select-lg"
            >
              <option value="7" ?selected="${this.currentVersion === 7}">
                @swisspost/design-system-styles 7.x.x
              </option>
              <option value="6" ?selected="${this.currentVersion === 6}">
                @swisspost/design-system-styles 6.x.x
              </option>
              <option value="5" ?selected="${this.currentVersion === 5}">
                @swisspost/design-system-styles 5.x.x
              </option>
              <option value="4" ?selected="${this.currentVersion === 4}">
                @.../common-web-frontend 4.x.x or lower
              </option>
            </select>
            <p class="form-text">
              This information can be found in the <code>package.json</code> file in the root of
              your application.
            </p>
          </div>
          <div class="col-12">
            <fieldset @change="${this._onEnvironmentChange}">
              <legend class="font-curve-small bold">
                What environment is your application for?
              </legend>
              <div class="form-check form-check-inline mb-0">
                <input
                  id="migration-intranet"
                  type="radio"
                  class="form-check-input"
                  name="migration-audience"
                  value="intranet"
                  ?checked="${this.environment === 'intranet'}"
                />
                <label for="migration-intranet" class="form-check-label">
                  Intranet application
                </label>
              </div>
              <div class="form-check form-check-inline mb-0">
                <input
                  id="migration-extranet"
                  type="radio"
                  class="form-check-input"
                  name="migration-audience"
                  value="internet"
                  ?checked="${this.environment === 'internet'}"
                />
                <label for="migration-extranet" class="form-check-label">
                  Extranet/Internet application
                </label>
              </div>
            </fieldset>
          </div>
          <div class="col-12">
            <fieldset @change="${this._onAngularChange}">
              <legend class="font-curve-small bold">
                What technology is your application built with?
              </legend>
              <div class="form-check form-check-inline mb-0">
                <input
                  id="migration-angular"
                  type="radio"
                  class="form-check-input"
                  name="migration-technology"
                  value="true"
                  ?checked="${this.angular}"
                />
                <label for="migration-angular" class="form-check-label">Angular application</label>
              </div>
              <div class="form-check form-check-inline mb-0">
                <input
                  id="migration-other-technology"
                  type="radio"
                  class="form-check-input"
                  name="migration-technology"
                  value="false"
                  ?checked="${!this.angular}"
                />
                <label for="migration-other-technology" class="form-check-label">
                  Non-Angular application
                </label>
              </div>
            </fieldset>
          </div>
        </div>
      </section>
    `;
  }

  private _onCurrentVersionChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    this.currentVersion = parseInt(event.target.value);
    this.dispatchEvent(
      new CustomEvent('migration-state-current-version-changed', {
        bubbles: true,
        composed: true,
        detail: {
          currentVersion: this.currentVersion,
        },
      }),
    );
  }

  private _onEnvironmentChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    this.environment = event.target.value;
    this.dispatchEvent(
      new CustomEvent('migration-state-environment-changed', {
        bubbles: true,
        composed: true,
        detail: {
          environment: this.environment,
        },
      }),
    );
  }

  private _onAngularChange(
    event: Event & {
      target: HTMLInputElement;
    },
  ) {
    this.angular = event.target.value === 'true';
    this.dispatchEvent(
      new CustomEvent('migration-state-angular-changed', {
        bubbles: true,
        composed: true,
        detail: {
          angular: this.angular,
        },
      }),
    );
  }
}
