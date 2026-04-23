import { Args, StoryObj, StoryContext } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const validationObject: object = {
  name: 'validation',
  description: 'Controls the validation state appearance of the component.',
  control: {
    type: 'radio',
    labels: {
      '': 'Default',
      'is-valid': 'Valid',
      'is-invalid': 'Invalid',
    },
  },
  options: ['is-invalid', 'is-valid', ''],
  table: {
    category: 'States',
  },
};

export function getValidationProps(component: string, args: Args) {
  const key = `validation${component}`;
  const validationState = args[key];
  const isValidationSet = args[key] !== '';
  const isValid = validationState === 'is-valid';

  const scheme = args.scheme ? `-${args.scheme}` : '';
  const name = args.componentName ? `-${args.componentName}` : '';
  const id = `-id${name}${scheme}`;
  const nothingOrBlank = ['textarea', 'select', 'input'].includes(component.toLowerCase())
    ? ''
    : nothing;

  return {
    scheme,
    validationState,
    isValidationSet,
    ariaInvalid: isValidationSet ? !isValid : nothing,
    ariaDescribedBy: isValidationSet ? `${validationState}${id}` : nothingOrBlank,
    validFeedbackId:
      isValidationSet && validationState !== 'is-invalid' ? `${validationState}${id}` : nothing,
    invalidFeedbackId:
      isValidationSet && validationState !== 'is-valid' ? `${validationState}${id}` : nothing,
  };
}

function renderFeedback(
  validFeedbackId: string | symbol,
  invalidFeedbackId: string | symbol,
  validationState: string,
) {
  return html`
    ${validFeedbackId && validationState === 'is-valid'
      ? html`<p id="${validFeedbackId}" class="valid-feedback">Valid message.</p>`
      : nothing}
    ${invalidFeedbackId && validationState === 'is-invalid'
      ? html`<p id="${invalidFeedbackId}" class="invalid-feedback">Invalid message.</p>`
      : nothing}
  `;
}

const meta: MetaComponent = {
  id: '1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472',
  title: 'Components/Form Validation',
  tags: ['package:Styles', 'status:Stable'],
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html`<div class="form-check">
      <input
        type="checkbox"
        id="checkbox_1${props.validationState}${props.scheme}"
        class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
      />
      <label class="form-check-label" for="checkbox_1${props.validationState}${props.scheme}"
        >Label</label
      >
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html`<div class="form-floating">
      <input
        id="input_1${props.validationState}${props.scheme}"
        class="form-control form-control-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="input_1-form-hint${props.validationState}${props.scheme} ${props.ariaDescribedBy}"
        type="text"
        placeholder="Placeholder"
      />
      <label class="form-label" for="input_1${props.validationState}${props.scheme}">Label</label>
      ${feedbackTemplate}
      <p class="form-hint" id="input_1-form-hint${props.validationState}${props.scheme}">
        This is helpful text that provides guidance or additional information to assist the user in
        filling out this field correctly.
      </p>
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html` <legend>Legend</legend>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="radio-single${props.validationState}${props.scheme}"
          name="radio-single"
          class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
          aria-invalid=${props.ariaInvalid}
          aria-describedby="${props.ariaDescribedBy}"
        />
        <label class="form-check-label" for="radio-single${props.validationState}${props.scheme}"
          >Option 1</label
        >
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );

    return html`<fieldset>
      <legend>Legend</legend>
      ${Array.from({ length: 3 }, (_, i) => {
        return html`
          <div class="form-check">
            <input
              type="radio"
              id="radio_group_${i + 1}${props.validationState}${props.scheme}"
              name="radio_group"
              class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
              aria-invalid=${props.ariaInvalid}
              aria-describedby="${props.ariaDescribedBy}"
              ?required="${i === 0}"
            />
            <label
              class="form-check-label"
              for="radio_group_${i + 1}${props.validationState}${props.scheme}"
            >
              Option ${i + 1}
            </label>
          </div>
        `;
      })}
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html`<div class="form-floating">
      <select
        id="select_1${props.validationState}${props.scheme}"
        class="form-select form-select-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="select_1-form-hint${props.validationState}${props.scheme} ${props.ariaDescribedBy}"
      >
        <option>Select option...</option>
        <option value="value_1">Option 1</option>
        <option value="value_2">Option 2</option>
        <option value="value_3">Option 3</option>
        <option value="value_4">Option 4</option>
      </select>
      <label class="form-label" for="select_1${props.validationState}${props.scheme}">
        <span>Label</span>
      </label>
      ${feedbackTemplate}
      <p class="form-hint" id="select_1-form-hint${props.validationState}${props.scheme}">
        This is helpful text that provides guidance or additional information to assist the user in
        filling out this field correctly.
      </p>
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html`<div class="form-check form-switch">
      <input
        type="checkbox"
        role="switch"
        id="switch_1${props.validationState}${props.scheme}"
        class="form-check-input ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="${props.ariaDescribedBy}"
      />
      <label
        class="form-check-label order-first"
        for="switch_1${props.validationState}${props.scheme}"
        >Notifications</label
      >
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
    const feedbackTemplate = renderFeedback(
      props.validFeedbackId,
      props.invalidFeedbackId,
      props.validationState,
    );
    return html`<div class="form-floating">
      <textarea
        placeholder=""
        rows=""
        id="textArea_1${props.validationState}${props.scheme}"
        class="form-control form-control-lg ${props.isValidationSet ? props.validationState : ''}"
        aria-invalid=${props.ariaInvalid}
        aria-describedby="textArea_1-form-hint${props.validationState}${props.scheme} ${props.ariaDescribedBy}"
      ></textarea
      ><label class="form-label" for="textArea_1${props.validationState}${props.scheme}"
        >Label</label
      >
      ${feedbackTemplate}
      <p class="form-hint" id="textArea_1-form-hint${props.validationState}${props.scheme}">
        This is helpful text that provides guidance or additional information to assist the user in
        filling out this field correctly.
      </p>
    </div>`;
  },
};
