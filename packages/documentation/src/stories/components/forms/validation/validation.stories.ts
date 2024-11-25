import { Args, StoryObj, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const validationObject: object = {
  name: 'validation',
  description: 'Controls the validation state appearance of the component.',
  control: {
    type: 'radio',
    labels: {
      'null': 'Default',
      'is-valid': 'Valid',
      'is-invalid': 'Invalid',
    },
  },
  options: ['is-invalid', 'is-valid', 'null'],
  table: {
    category: 'States',
  },
};

export function getValidationProps(component: string, args: Args) {
  const key = `validation${component}`;
  const validationState = args[key];
  const isValidationSet = args[key] !== 'null';
  const isValid = validationState === 'is-valid';

  const scheme = args.scheme ? `-${args.scheme}` : '';
  const name = args.componentName ? `${args.componentName}` : '';
  const id = `-id-${name}${scheme}`;

  return {
    validationState,
    isValidationSet,
    ariaInvalid: isValidationSet ? !isValid : nothing,
    ariaDescribedBy: isValidationSet ? `${validationState}${id}` : nothing,
    validFeedbackId:
      isValidationSet && validationState !== 'is-invalid' ? `${validationState}${id}` : nothing,
    invalidFeedbackId:
      isValidationSet && validationState !== 'is-valid' ? `${validationState}${id}` : nothing,
  };
}

function renderFeedback(validFeedbackId: string | symbol, invalidFeedbackId: string | symbol) {
  return html`
    ${validFeedbackId
      ? html`<p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>`
      : nothing}
    ${invalidFeedbackId
      ? html`<p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>`
      : nothing}
  `;
}

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
    args: validationObject,
  },
};

export default meta;

type Story = StoryObj;

export const Checkbox: Story = {
  args: {
    validationCheckbox: 'is-invalid',
  },
  argTypes: {
    validationCheckbox: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);

    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<div class="form-check">
      <input
        type="checkbox"
        id="Checkbox_1"
        class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
      />
      <label class="form-check-label" for="Checkbox_1">Label</label>
      ${feedbackTemplate}
    </div>`;
  },
};

export const Input: Story = {
  args: {
    validationInput: 'is-invalid',
  },
  argTypes: {
    validationInput: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<div class="form-floating">
      <input
        id="Input_1"
        class="form-control form-control-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
        type="text"
        placeholder="Placeholder"
      />
      <label class="form-label" for="Input_1">Label</label>
      <p class="form-hint">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      ${feedbackTemplate}
    </div> `;
  },
};

export const RadioButton: Story = {
  args: {
    validationRadioButton: 'is-invalid',
  },
  argTypes: {
    validationRadioButton: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html` <legend>Legend</legend>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="Radio_1"
          name="radio_group"
          class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
          aria-invalid=${props.ariaInvalid}
          aria-describedby="${props.ariaDescribedBy}"
        />
        <label class="form-check-label" for="Radio_1">Option 1</label>
        ${feedbackTemplate}
      </div>`;
  },
};

export const RadioButtonGroup: Story = {
  args: {
    validationRadioButtonGroup: 'is-invalid',
  },
  argTypes: {
    validationRadioButtonGroup: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<fieldset>
      <legend>Legend</legend>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="Radio_10"
          name="radio_group"
          class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
          aria-invalid=${props.ariaInvalid}
          aria-describedby="${props.ariaDescribedBy}"
          required
        />
        <label class="form-check-label" for="Radio_1">Option 1</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="Radio_11" name="radio_group" class="form-check-input" />
        <label class="form-check-label" for="Radio_1">Option 2</label>
      </div>
      <div class="form-check form-check-inline">
        <input type="radio" id="Radio_12" name="radio_group" class="form-check-input" />
        <label class="form-check-label" for="Radio_1">Option 3</label>
      </div>
      ${feedbackTemplate}
    </fieldset>`;
  },
};

export const Select: Story = {
  args: {
    validationSelect: 'is-invalid',
  },
  argTypes: {
    validationSelect: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<div class="form-floating">
      <select
        id="Select_1"
        class="form-select form-select-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
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
      <p class="form-hint">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      ${feedbackTemplate}
    </div>`;
  },
};

export const Switch: Story = {
  args: {
    validationSwitch: 'is-invalid',
  },
  argTypes: {
    validationSwitch: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<div class="form-check form-switch">
      <input
        type="checkbox"
        role="switch"
        id="Switch_1"
        class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
      />
      <label class="form-check-label order-first" for="Switch_1">Notifications</label>
      ${feedbackTemplate}
    </div>`;
  },
};

export const TextArea: Story = {
  args: {
    validationTextArea: 'is-invalid',
  },
  argTypes: {
    validationTextArea: validationObject,
  },
  render: (args: Args, context: StoryContext) => {
    const component = context.name.replace(/\s+/g, '');
    const props = getValidationProps(component, args);
    const feedbackTemplate = renderFeedback(props.validFeedbackId, props.invalidFeedbackId);
    return html`<div class="form-floating">
      <textarea
        placeholder=""
        rows=""
        id="TextArea_1"
        class="form-control form-control-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
      ></textarea
      ><label class="form-label" for="TextArea_1">Label</label>
      <p class="form-hint">
        Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel
        illum dolore eu feugiat nulla facilisis.
      </p>
      ${feedbackTemplate}
    </div>`;
  },
};
