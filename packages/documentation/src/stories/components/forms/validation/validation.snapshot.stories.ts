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

    const validationStates = ['null', 'is-valid', 'is-invalid'];

    return html`
      <div>
        ${[
          { scheme: 'light', bg: 'white' },
          { scheme: 'dark', bg: 'dark' },
        ].map(
          ({ scheme, bg }) => html` <div data-color-scheme="${scheme}" class="bg-${bg}">
              ${components.map(
                component =>
                  html`
                    <div class="component-container " style="margin:2rem; ">
                      <h3>${component.name}</h3>
                      ${validationStates.map(state => {
                        const isValidationSet = state !== 'null';
                        const isValid = state === 'is-valid';
                        const isInvalid = state === 'is-invalid';
                        const ariaInvalid = isValidationSet ? isInvalid : nothing;
                        const ariaDescribedBy = isValidationSet ? `${state}-id` : nothing;
                        const validFeedbackId =
                          isValidationSet && isValid ? `${state}-id` : nothing;
                        const invalidFeedbackId =
                          isValidationSet && isInvalid ? `${state}-id` : nothing;

                        // Wrap each state variation in a div
                        return html`
                          <div class="state-variation snapshot">
                            ${(() => {
                              switch (component.name) {
                                case 'CardControl':
                                  return html`
                                    <div class="checkbox-button-card">
                                      <input
                                        id="${component.id}"
                                        name="checkbox-button-card-control"
                                        class="form-check-input ${isValidationSet ? state : ''}"
                                        type="checkbox"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      />
                                      <label class="form-check-label" for="${component.id}">
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
                                case 'Checkbox':
                                  return html`
                                    <div class="form-check">
                                      <input
                                        type="checkbox"
                                        id="${component.id}"
                                        class="form-check-input ${isValidationSet ? state : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      />
                                      <label class="form-check-label" for="${component.id}">
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
                                    <label class="form-label" for="${component.id}">Label</label>
                                    <div class="state-wrapper">
                                      <input
                                        id="${component.id}"
                                        class="form-control form-control-lg ${isValidationSet
                                          ? state
                                          : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                        type="text"
                                        placeholder="Placeholder"
                                      />
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
                                        id="${component.id}"
                                        class="form-check-input ${isValidationSet ? state : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      />
                                      <label class="form-check-label" for="${component.id}">
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
                                  return html` <label class="form-label" for="${component.id}">
                                      <span>Label</span>
                                    </label>
                                    <div class="state-wrapper">
                                      <select
                                        id="${component.id}"
                                        class="form-select form-select-lg ${isValidationSet
                                          ? state
                                          : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      >
                                        <option>Select option...</option>
                                        <option value="value_1">Option 1</option>
                                        <option value="value_2">Option 2</option>
                                        <option value="value_3">Option 3</option>
                                        <option value="value_4">Option 4</option>
                                      </select>
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
                                    </div>`;
                                  return html`
                                    <div class="form-range">
                                      <label class="form-label" for="${component.id}">
                                        Label
                                      </label>
                                      <input
                                        type="range"
                                        id="${component.id}"
                                        class="form-range ${isValidationSet ? state : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      />

                                      <p id="${validFeedbackId}" class="valid-feedback">
                                        Valid message.
                                      </p>
                                      <p id="${invalidFeedbackId}" class="invalid-feedback">
                                        Invalid message.
                                      </p>
                                    </div>
                                  `;
                                case 'Switch':
                                  return html`
                                    <div class="form-check form-switch">
                                      <input
                                        type="checkbox"
                                        role="switch"
                                        id="${component.id}"
                                        class="form-check-input ${isValidationSet ? state : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      />
                                      <label
                                        class="form-check-label order-first"
                                        for="${component.id}"
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
                                    <label class="form-label" for="${component.id}">Label</label>
                                    <div class="state-wrapper">
                                      <textarea
                                        placeholder=""
                                        rows=""
                                        id="${component.id}"
                                        class="form-control form-control-lg ${isValidationSet
                                          ? state
                                          : ''}"
                                        aria-invalid=${ariaInvalid}
                                        aria-describedby="${ariaDescribedBy}"
                                      ></textarea>
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
            </div>`,
        )}
      </div>
    `;
  },
};
