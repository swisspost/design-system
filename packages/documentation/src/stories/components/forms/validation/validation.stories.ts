import { Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472',
  title: 'Components/Forms/Validation',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=577-14513&t=uKEtTo9BEaPpKSV5-1',
    },
  },
  args: {
    validation: 'null',
  },
  argTypes: {
    validation: {
      name: 'Validation',
      description: 'Controls the validation state appearance of the component.',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid',
        },
      },
      options: ['null', 'is-valid', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
  },
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};

export const CardControl: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;

    return html`<div class="checkbox-button-card">
      <input
        id="CardControl_1"
        name="checkbox-button-card-control_1"
        class="form-check-input ${isValidationSet ? args.validation : ''}"
        type="checkbox"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      />
      <label class="form-check-label" for="CardControl_1">
        <span>Label</span>
      </label>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const Checkbox: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`<div class="form-check">
      <input
        type="checkbox"
        id="Checkbox_1"
        class="form-check-input ${isValidationSet ? args.validation : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      />
      <label class="form-check-label" for="Checkbox_1">
        <span>Label</span>
      </label>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const Input: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`<div class="form-floating">
      <label class="form-label" for="Input_1">Label</label>
      <input
        id="Input_1"
        class="form-control form-control-lg ${isValidationSet ? args.validation : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
        type="text"
      />

      <p class="form-text">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const RadioButton: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`<div class="form-check">
        <input
          type="radio"
          id="Radio_1"
          name="radio"
          class="form-check-input ${isValidationSet ? args.validation : ''}"
          aria-invalid=${ariaInvalid}
          aria-describedby="${ariaDescribedBy}"
        />
        <label class="form-check-label" for="Radio_1">
          <span>Label</span>
        </label>
        <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
        <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
      </div>
      <div class="form-check">
        <input
          type="radio"
          id="Radio_2"
          name="radio"
          class="form-check-input ${isValidationSet ? args.validation : ''}"
          aria-invalid=${ariaInvalid}
          aria-describedby="${ariaDescribedBy}"
        />
        <label class="form-check-label" for="Radio_2">
          <span>Label</span>
        </label>
        <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
        <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
      </div>`;
  },
};

export const Select: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`
      <label class="form-label" for="Select_1">
        <span>Label</span>
      </label>
     <select id="Select_1" class="form-select form-select-lg ${
       isValidationSet ? args.validation : ''
     }"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}">
        <option>Select option...</option>
        <option value="value_1">Option 1</option>
        <option value="value_2">Option 2</option>
        <option value="value_3">Option 3</option>
        <option value="value_4">Option 4</option>
      </select>
      <p class="form-text">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum
        dolore eu feugiat nulla facilisis.
      </p>
       <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const Switch: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`<div class="form-check form-switch">
      <input
        type="checkbox"
        role="switch"
        id="Switch_1"
        class="form-check-input ${isValidationSet ? args.validation : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      />
      <label class="form-check-label order-first" for="Switch_1">Notifications</label>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const TextArea: Story = {
  render(args: Args) {
    const isValidationSet = args.validation !== 'null';
    const isValid = args.validation === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation !== 'is-invalid' ? `${args.validation}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation !== 'is-valid' ? `${args.validation}-id` : nothing;
    return html`
    <label class="form-label" for="TextArea_1">Label</label>
      <textarea
        placeholder=""
        rows=""
        id="TextArea_1"
        class="form-control form-control-lg ${isValidationSet ? args.validation : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      ></textarea>
      <p class="form-text">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum
        dolore eu feugiat nulla facilisis.
      </p>
        <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};
