import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('migration-setup')
export class SetupComponent extends LitElement {
  @property({ type: String }) environment: string = 'intranet';
  @property({ type: Boolean }) angular: boolean = false;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  render() {
    return html`
      <section>
        <div class="row migration-options mb-huge">
          <div class="col-md-6">
            <fieldset @change="${this._onEnvironmentChange}">
              <legend class="font-curve-small bold">
                What environment is your application for?
              </legend>
              <div class="form-check">
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
              <div class="form-check mb-0">
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
          <div class="col-md-6">
            <fieldset @change="${this._onAngularChange}">
              <legend class="font-curve-small bold">
                What technology is your application built with?
              </legend>
              <div class="form-check">
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
              <div class="form-check mb-0">
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
