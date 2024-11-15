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
};

const validationObject: object = {
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
};

export default meta;

type Story = StoryObj;
export const Default: Story = {};

export const CardControl: Story = {
  args: {
    validation1: 'is-valid',
  },
  argTypes: {
    validation1: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation1 !== 'null';
    const isValid = args.validation1 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation1}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation1 !== 'is-invalid' ? `${args.validation1}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation1 !== 'is-valid' ? `${args.validation1}-id` : nothing;

    return html`<div class="checkbox-button-card">
        <input
          id="CardControl_1"
          name="checkbox-button-card-control_1"
          class="form-check-input ${isValidationSet ? args.validation1 : ''}"
          type="checkbox"
          aria-invalid=${ariaInvalid}
          aria-describedby="${ariaDescribedBy}"
        />
        <label class="form-check-label" for="CardControl_1">
          <span>Label</span>
        </label>
      </div>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>`;
  },
};

export const Checkbox: Story = {
  args: {
    validation2: 'is-invalid',
  },
  argTypes: {
    validation2: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation2 !== 'null';
    const isValid = args.validation2 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation2}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation2 !== 'is-invalid' ? `${args.validation2}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation2 !== 'is-valid' ? `${args.validation2}-id` : nothing;
    return html`<div class="form-check">
      <input
        type="checkbox"
        id="Checkbox_1"
        class="form-check-input ${isValidationSet ? args.validation2 : ''}"
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
  args: {
    validation3: 'is-valid',
  },
  argTypes: {
    validation3: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation3 !== 'null';
    const isValid = args.validation3 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation3}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation3 !== 'is-invalid' ? `${args.validation3}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation3 !== 'is-valid' ? `${args.validation3}-id` : nothing;
    return html`<div class="form-floating">
      <input
        id="Input_1"
        class="form-control form-control-lg ${isValidationSet ? args.validation3 : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
        type="text"
        placeholder="Placeholder"
      />
      <label class="form-label" for="Input_1">Label</label>
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
  args: {
    validation4: 'is-invalid',
    validation42: 'is-valid',
  },
  argTypes: {
    validation4: validationObject,
    validation42: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation4 !== 'null';
    const isValid = args.validation4 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation4}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation4 !== 'is-invalid' ? `${args.validation4}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation4 !== 'is-valid' ? `${args.validation4}-id` : nothing;
    return html`<div class="form-check">
        <input
          type="radio"
          id="Radio_1"
          name="radio"
          class="form-check-input ${isValidationSet ? args.validation4 : ''}"
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
          class="form-check-input ${isValidationSet ? args.validation42 : ''}"
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
  args: {
    validation5: 'is-valid',
  },
  argTypes: {
    validation5: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation5 !== 'null';
    const isValid = args.validation5 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation5}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation5 !== 'is-invalid' ? `${args.validation5}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation5 !== 'is-valid' ? `${args.validation5}-id` : nothing;
    return html`<div class="form-floating">
      <select
        id="Select_1"
        class="form-select form-select-lg ${isValidationSet ? args.validation5 : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      >
        <option>Select option...</option>
        <option value="value_1">Option 1</option>
        <option value="value_2">Option 2</option>
        <option value="value_3">Option 3</option>
        <option value="value_4">Option 4</option>
      </select>
      <label class="form-label" for="Select_1">
        <span>Label</span>
      </label>
      <p class="form-text">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};

export const Switch: Story = {
  args: {
    validation6: 'is-invalid',
  },
  argTypes: {
    validation6: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation6 !== 'null';
    const isValid = args.validation6 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation6}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation6 !== 'is-invalid' ? `${args.validation6}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation6 !== 'is-valid' ? `${args.validation6}-id` : nothing;
    return html`<div class="form-check form-switch">
      <input
        type="checkbox"
        role="switch"
        id="Switch_1"
        class="form-check-input ${isValidationSet ? args.validation6 : ''}"
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
  args: {
    validation7: 'is-invalid',
  },
  argTypes: {
    validation7: validationObject,
  },
  render(args: Args) {
    const isValidationSet = args.validation7 !== 'null';
    const isValid = args.validation7 === 'is-valid';
    let ariaInvalid;
    if (isValidationSet) {
      ariaInvalid = !isValid;
    } else {
      ariaInvalid = nothing;
    }
    const ariaDescribedBy = isValidationSet ? `${args.validation7}-id` : nothing;
    const validFeedbackId =
      isValidationSet && args.validation7 !== 'is-invalid' ? `${args.validation7}-id` : nothing;
    const invalidFeedbackId =
      isValidationSet && args.validation7 !== 'is-valid' ? `${args.validation7}-id` : nothing;
    return html`<div class="form-floating">
      <textarea
        placeholder=""
        rows=""
        id="TextArea_1"
        class="form-control form-control-lg ${isValidationSet ? args.validation7 : ''}"
        aria-invalid=${ariaInvalid}
        aria-describedby="${ariaDescribedBy}"
      ></textarea
      ><label class="form-label" for="TextArea_1">Label</label>
      <p class="form-text">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      <p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>
      <p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>
    </div>`;
  },
};
