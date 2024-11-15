import type { StoryObj } from '@storybook/web-components';
import meta from './validation.stories';
import { html, nothing } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Validation: Story = {
  render() {
    const components = [
      { name: 'CardControl', id: 'CardControl_1' },
      { name: 'Checkbox', id: 'Checkbox_1' },
      { name: 'Input', id: 'Input_1' },
      { name: 'RadioButton', id: 'Radio_1' },
      { name: 'Select', id: 'Select_1' },
      { name: 'Switch', id: 'Switch_1' },
      { name: 'TextArea', id: 'TextArea_1' },
    ];

    const validationStates = ['is-valid', 'is-invalid'];

    return html` <div>
      ${[
        { scheme: 'light', bg: 'white' },
        { scheme: 'dark', bg: 'dark' },
      ].map(
        ({ scheme, bg }) => html`
          <div data-color-scheme="${scheme}" class="bg-${bg}">
            ${components.map(
              component =>
                html`
                  <div class="component-container " style="margin:2rem; ">
                    <h3>${component.name}</h3>
                    ${validationStates.map(state => {
                      const isValid = state === 'is-valid';
                      const isInvalid = state === 'is-invalid';
                      const ariaInvalid = isInvalid ? 'true' : nothing;
                      const ariaDescribedBy = isValid
                        ? `${state}-id-${component.name}-${scheme}-${state}`
                        : nothing;
                      const validFeedbackId = isValid
                        ? `${state}-id-${component.name}-${scheme}-${state}`
                        : nothing;
                      const invalidFeedbackId = isInvalid
                        ? `${state}-id-${component.name}-${scheme}-${state}`
                        : nothing;

                      return html`
                        <div class="state-variation snapshot">
                          ${(() => {
                            switch (component.name) {
                              case 'CardControl':
                                return html`
                                  <div class="checkbox-button-card">
                                    <input
                                      id="${component.name}-${scheme}-${state}"
                                      name="checkbox-button-card-control"
                                      class="form-check-input ${state}"
                                      type="checkbox"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="${component.name}-${scheme}-${state}"
                                    >
                                      <span>Label</span>
                                    </label>
                                  </div>
                                  <p id="${validFeedbackId}" class="valid-feedback">
                                    Valid message.
                                  </p>
                                  <p id="${invalidFeedbackId}" class="invalid-feedback">
                                    Invalid message.
                                  </p>
                                `;
                              case 'Checkbox':
                                return html`
                                  <div class="form-check">
                                    <input
                                      type="checkbox"
                                      id="${component.name}-${scheme}-${state}"
                                      class="form-check-input ${state}"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="${component.name}-${scheme}-${state}"
                                    >
                                      <span>Label</span>
                                    </label>
                                    <p id="${validFeedbackId}" class="valid-feedback">
                                      Valid message.
                                    </p>
                                    <p id="${invalidFeedbackId}" class="invalid-feedback">
                                      Invalid message.
                                    </p>
                                  </div>
                                `;
                              case 'Input':
                                return html`
                                  <div class="form-floating">
                                    <input
                                      id="${component.name}-${scheme}-${state}"
                                      class="form-control form-control-lg ${state}"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                      type="text"
                                      placeholder="Placeholder"
                                    />
                                    <label
                                      class="form-label"
                                      for="${component.name}-${scheme}-${state}"
                                      >Label</label
                                    >
                                    <p class="form-text">
                                      Hintus textus elare volare cantare hendrerit in vulputate
                                      velit esse molestie consequat, vel illum dolore eu feugiat
                                      nulla facilisis.
                                    </p>
                                    <p id="${validFeedbackId}" class="valid-feedback">
                                      Valid message.
                                    </p>
                                    <p id="${invalidFeedbackId}" class="invalid-feedback">
                                      Invalid message.
                                    </p>
                                  </div>
                                `;
                              case 'RadioButton':
                                return html`
                                  <div class="form-check">
                                    <input
                                      type="radio"
                                      id="${component.name}-${scheme}-${state}"
                                      class="form-check-input ${state}"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                    />
                                    <label
                                      class="form-check-label"
                                      for="${component.name}-${scheme}-${state}"
                                    >
                                      <span>Label</span>
                                    </label>
                                    <p id="${validFeedbackId}" class="valid-feedback">
                                      Valid message.
                                    </p>
                                    <p id="${invalidFeedbackId}" class="invalid-feedback">
                                      Invalid message.
                                    </p>
                                  </div>
                                `;
                              case 'Select':
                                return html` <div class="form-floating">
                                  <select
                                    id="${component.name}-${scheme}-${state}"
                                    class="form-select form-select-lg ${state}"
                                    aria-invalid=${ariaInvalid}
                                    aria-describedby="${ariaDescribedBy}"
                                  >
                                    <option>Select option...</option>
                                    <option value="value_1">Option 1</option>
                                    <option value="value_2">Option 2</option>
                                    <option value="value_3">Option 3</option>
                                    <option value="value_4">Option 4</option>
                                  </select>
                                  <label
                                    class="form-label"
                                    for="${component.name}-${scheme}-${state}"
                                  >
                                    <span>Label</span>
                                  </label>
                                  <p class="form-text">
                                    Hintus textus elare volare cantare hendrerit in vulputate velit
                                    esse molestie consequat, vel illum dolore eu feugiat nulla
                                    facilisis.
                                  </p>
                                  <p id="${validFeedbackId}" class="valid-feedback">
                                    Valid message.
                                  </p>
                                  <p id="${invalidFeedbackId}" class="invalid-feedback">
                                    Invalid message.
                                  </p>
                                </div>`;
                              case 'Switch':
                                return html`
                                  <div class="form-check form-switch">
                                    <input
                                      type="checkbox"
                                      role="switch"
                                      id="${component.name}-${scheme}-${state}"
                                      class="form-check-input ${state}"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                    />
                                    <label
                                      class="form-check-label order-first"
                                      for="${component.name}-${scheme}-${state}"
                                    >
                                      Notifications
                                    </label>
                                    <p id="${validFeedbackId}" class="valid-feedback">
                                      Valid message.
                                    </p>
                                    <p id="${invalidFeedbackId}" class="invalid-feedback">
                                      Invalid message.
                                    </p>
                                  </div>
                                `;
                              case 'TextArea':
                                return html`
                                  <div class="state-wrapper form-floating">
                                    <textarea
                                      placeholder=""
                                      rows=""
                                      id="${component.name}-${scheme}-${state}"
                                      class="form-control form-control-lg ${state}"
                                      aria-invalid=${ariaInvalid}
                                      aria-describedby="${ariaDescribedBy}"
                                    ></textarea>
                                    <label
                                      class="form-label"
                                      for="${component.name}-${scheme}-${state}"
                                      >Label</label
                                    >
                                    <p class="form-text">
                                      Hintus textus elare volare cantare hendrerit in vulputate
                                      velit esse molestie consequat, vel illum dolore eu feugiat
                                      nulla facilisis.
                                    </p>
                                    <p id="${validFeedbackId}" class="valid-feedback">
                                      Valid message.
                                    </p>
                                    <p id="${invalidFeedbackId}" class="invalid-feedback">
                                      Invalid message.
                                    </p>
                                  </div>
                                `;
                              default:
                                return nothing;
                            }
                          })()}
                        </div>
                      `;
                    })}
                  </div>
                `,
            )}
          </div>
        `,
      )}
    </div>`;
  },
};
