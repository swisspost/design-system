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
      { name: 'Slider', id: 'Slider_1' },
      { name: 'Switch', id: 'Switch_1' },
      { name: 'TextArea', id: 'TextArea_1' },
    ];

    const validationStates = ['null', 'is-valid', 'is-invalid'];

    const getFeedbackIds = (state: string, isValid: boolean, isInvalid: boolean) => ({
      ariaInvalid: isInvalid ? state : nothing,
      ariaDescribedBy: isValid || isInvalid ? `${state}-id` : nothing,
      validFeedbackId: isValid ? `${state}-id` : nothing,
      invalidFeedbackId: isInvalid ? `${state}-id` : nothing,
    });

    const renderComponent = (component: { name: string; id: string }, state: string) => {
      const isValid = state === 'is-valid';
      const isInvalid = state === 'is-invalid';
      const { ariaInvalid, ariaDescribedBy, validFeedbackId, invalidFeedbackId } = getFeedbackIds(
        state,
        isValid,
        isInvalid,
      );

      const feedbackMessages = html`
        <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
        <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
      `;

      switch (component.name) {
        case 'CardControl':
          return html`
            <div class="checkbox-button-card">
              <input
                id="${component.id}"
                name="checkbox-button-card-control"
                class="form-check-input ${state !== 'null' ? state : ''}"
                type="checkbox"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              />
              <label class="form-check-label" for="${component.id}"><span>Label</span></label>
              ${feedbackMessages}
            </div>
          `;
        case 'Checkbox':
          return html`
            <div class="form-check">
              <input
                type="checkbox"
                id="${component.id}"
                class="form-check-input ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              />
              <label class="form-check-label" for="${component.id}"><span>Label</span></label>
              ${feedbackMessages}
            </div>
          `;
        case 'Input':
          return html`
            <label class="form-label" for="${component.id}">Label</label>
            <div class="state-wrapper">
              <input
                id="${component.id}"
                class="form-control form-control-lg ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
                type="text"
                placeholder="Placeholder"
              />
              <p class="form-text">Hint text.</p>
              ${feedbackMessages}
            </div>
          `;
        case 'RadioButton':
          return html`
            <div class="form-check">
              <input
                type="radio"
                id="${component.id}"
                class="form-check-input ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              />
              <label class="form-check-label" for="${component.id}"><span>Label</span></label>
              ${feedbackMessages}
            </div>
          `;
        case 'Select':
          return html`
            <label class="form-label" for="${component.id}"><span>Label</span></label>
            <div class="state-wrapper">
              <select
                id="${component.id}"
                class="form-select form-select-lg ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              >
                <option>Select option...</option>
                <option value="value_1">Option 1</option>
                <option value="value_2">Option 2</option>
                <option value="value_3">Option 3</option>
                <option value="value_4">Option 4</option>
              </select>
              <p class="form-text">Hint text.</p>
              ${feedbackMessages}
            </div>
          `;
        case 'Slider':
          return html`
            <label class="form-label" for="${component.id}">Label</label>
            <input
              type="range"
              id="${component.id}"
              class="form-range ${state !== 'null' ? state : ''}"
              aria-invalid=${ariaInvalid}
              aria-describedby="${ariaDescribedBy}"
            />
            ${feedbackMessages}
          `;
        case 'Switch':
          return html`
            <div class="form-check form-switch">
              <input
                type="checkbox"
                role="switch"
                id="${component.id}"
                class="form-check-input ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              />
              <label class="form-check-label order-first" for="${component.id}"
                >Notifications</label
              >
              ${feedbackMessages}
            </div>
          `;
        case 'TextArea':
          return html`
            <label class="form-label" for="${component.id}">Label</label>
            <div class="state-wrapper">
              <textarea
                id="${component.id}"
                class="form-control form-control-lg ${state !== 'null' ? state : ''}"
                aria-invalid=${ariaInvalid}
                aria-describedby="${ariaDescribedBy}"
              ></textarea>
              <p class="form-text">Hint text.</p>
              ${feedbackMessages}
            </div>
          `;
        default:
          return nothing;
      }
    };

    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div data-color-scheme="${bg}" class="bg-${bg}">
              ${components.map(
                component => html`
                  <div class="component-container" style="margin: 2rem;">
                    <h3>${component.name}</h3>
                    ${validationStates.map(
                      state => html`<div class="state-variation snapshot">
                        ${renderComponent(component, state)}
                      </div>`,
                    )}
                  </div>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
