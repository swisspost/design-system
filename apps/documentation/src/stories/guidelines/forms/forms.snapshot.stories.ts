import type { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta from './forms.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

type FieldType =
  | 'input'
  | 'select'
  | 'textarea'
  | 'number-input'
  | 'date-picker'
  | 'checkbox'
  | 'switch'
  | 'radio';

interface Field {
  type: FieldType;
  label: string;
  col: string;
  validation?: 'is-valid' | 'is-invalid';
  hint?: string;
}

interface Variant {
  name: string;
  small: boolean;
  disabled: boolean;
}

const LONG_LABEL = 'Label with a very long text that wraps onto at least two lines';
const HINT =
  'This is helpful text that provides guidance or additional information to assist the user.';

const FIELDS: Field[] = [
  { type: 'input', label: 'Label', col: 'col-sm-6 col-lg-3', hint: HINT },
  { type: 'select', label: LONG_LABEL, col: 'col-sm-6 col-lg-3', validation: 'is-valid' },
  { type: 'radio', label: 'Legend', col: 'col-sm-6 col-lg-3' },
  { type: 'checkbox', label: 'Label', col: 'col-sm-6 col-lg-3' },
  { type: 'number-input', label: LONG_LABEL, col: 'col-sm-6 col-lg-4', hint: HINT },
  { type: 'date-picker', label: 'Label', col: 'col-sm-6 col-lg-4', validation: 'is-invalid' },
  { type: 'switch', label: LONG_LABEL, col: 'col-sm-6 col-lg-4' },
  { type: 'textarea', label: LONG_LABEL, col: 'col-lg-6', hint: HINT },
  { type: 'input', label: 'Label', col: 'col-sm-6 col-lg-3', validation: 'is-invalid', hint: HINT },
  { type: 'checkbox', label: LONG_LABEL, col: 'col-sm-6 col-lg-3', validation: 'is-invalid' },
  { type: 'select', label: 'Label', col: 'col-sm-6 col-lg-2' },
  { type: 'input', label: LONG_LABEL, col: 'col-sm-6 col-lg-2', validation: 'is-valid' },
  { type: 'number-input', label: 'Label', col: 'col-sm-6 col-lg-2', validation: 'is-valid' },
  { type: 'date-picker', label: LONG_LABEL, col: 'col-sm-6 col-lg-2', hint: HINT },
  { type: 'radio', label: LONG_LABEL, col: 'col-sm-6 col-lg-2', validation: 'is-invalid' },
  { type: 'switch', label: 'Label', col: 'col-sm-6 col-lg-2' },
  { type: 'textarea', label: 'Label', col: 'col-sm-6 col-lg-4', validation: 'is-valid' },
  {
    type: 'select',
    label: LONG_LABEL,
    col: 'col-sm-6 col-lg-4',
    validation: 'is-invalid',
    hint: HINT,
  },
  { type: 'input', label: 'Label', col: 'col-sm-6 col-lg-4' },
];

const VARIANTS: Variant[] = [
  { name: 'Default size, enabled', small: false, disabled: false },
  { name: 'Default size, disabled', small: false, disabled: true },
  { name: 'Small size, enabled', small: true, disabled: false },
  { name: 'Small size, disabled', small: true, disabled: true },
];

function renderMessages(field: Field, id: string) {
  return html`
    ${field.validation === 'is-valid'
      ? html`<p class="valid-feedback" id="${id}-valid">Great success!</p>`
      : nothing}
    ${field.validation === 'is-invalid'
      ? html`<p class="invalid-feedback" id="${id}-invalid">An error occurred!</p>`
      : nothing}
    ${field.hint ? html`<p class="form-hint" id="${id}-hint">${field.hint}</p>` : nothing}
  `;
}

function describedBy(field: Field, id: string) {
  const ids = [
    field.validation === 'is-valid' && `${id}-valid`,
    field.validation === 'is-invalid' && `${id}-invalid`,
    field.hint && `${id}-hint`,
  ].filter(Boolean);

  return ids.length ? ids.join(' ') : nothing;
}

function renderControl(field: Field, id: string, variant: Variant) {
  const sizeClass = variant.small ? ' form-control-sm' : '';
  const validationClass = field.validation ? ` ${field.validation}` : '';
  const controlClass = `form-control${sizeClass}${validationClass}`;
  const ariaInvalid = field.validation === 'is-invalid' ? 'true' : nothing;

  const input = (type: string) =>
    html`<input
      id="${id}"
      type="${type}"
      class="${controlClass}"
      ?disabled="${variant.disabled}"
      aria-invalid="${ariaInvalid}"
      aria-describedby="${describedBy(field, id)}"
    />`;

  switch (field.type) {
    case 'select':
      return html`<select
        id="${id}"
        class="form-select${variant.small ? ' form-select-sm' : ''}${validationClass}"
        ?disabled="${variant.disabled}"
        aria-invalid="${ariaInvalid}"
        aria-describedby="${describedBy(field, id)}"
      >
        <option>Choose an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>`;
    case 'textarea':
      return html`<textarea
        id="${id}"
        class="${controlClass}"
        rows="3"
        ?disabled="${variant.disabled}"
        aria-invalid="${ariaInvalid}"
        aria-describedby="${describedBy(field, id)}"
      ></textarea>`;
    case 'number-input':
      return html`<post-number-input>${input('number')}</post-number-input>`;
    case 'date-picker':
      return html`<post-date-picker
        text-toggle-calendar="Open calendar"
        text-next-decade="Next decade"
        text-next-month="Next month"
        text-next-year="Next year"
        text-previous-decade="Previous decade"
        text-previous-month="Previous month"
        text-previous-year="Previous year"
        text-switch-year="Switch to year view"
        >${input('text')}</post-date-picker
      >`;
    default:
      return input('text');
  }
}

function renderCheck(field: Field, id: string, variant: Variant) {
  const isSwitch = field.type === 'switch';
  const sizeClass = variant.small && !isSwitch ? ' form-check-sm' : '';

  return html`
    <div class="form-grid-control">
      <div class="form-check${isSwitch ? ' form-switch' : ''}${sizeClass}">
        <input
          id="${id}"
          type="checkbox"
          class="form-check-input${field.validation ? ` ${field.validation}` : ''}"
          role="${isSwitch ? 'switch' : nothing}"
          ?disabled="${variant.disabled}"
          aria-invalid="${field.validation === 'is-invalid' ? 'true' : nothing}"
          aria-describedby="${describedBy(field, id)}"
        />
        <label class="form-check-label" for="${id}">${field.label}</label>
        ${renderMessages(field, id)}
      </div>
    </div>
  `;
}

function renderRadioGroup(field: Field, id: string, variant: Variant) {
  const sizeClass = variant.small ? ' form-check-sm' : '';
  const validationClass = field.validation ? ` ${field.validation}` : '';

  return html`
    <div class="${field.col}">
      <fieldset ?disabled="${variant.disabled}">
        <legend>${field.label}</legend>
        <div class="form-grid-control">
          ${['Option 1', 'Option 2'].map(
            (option, i) => html`
              <div class="form-check form-check-inline${sizeClass}">
                <input
                  id="${id}-${i}"
                  type="radio"
                  name="${id}"
                  class="form-check-input${validationClass}"
                />
                <label class="form-check-label" for="${id}-${i}">${option}</label>
              </div>
            `,
          )}
          ${renderMessages(field, id)}
        </div>
      </fieldset>
    </div>
  `;
}

function renderField(field: Field, index: number, variant: Variant, variantIndex: number) {
  const id = `form-grid-${variantIndex}-${index}`;

  if (field.type === 'radio') return renderRadioGroup(field, id, variant);

  if (field.type === 'checkbox' || field.type === 'switch') {
    return html`<div class="${field.col}">${renderCheck(field, id, variant)}</div>`;
  }

  return html`
    <div class="${field.col}">
      <label class="form-label" for="${id}">${field.label}</label>
      <div class="form-grid-control">
        ${renderControl(field, id, variant)} ${renderMessages(field, id)}
      </div>
    </div>
  `;
}

export const FormGrid: Story = {
  render: () =>
    schemes(
      () => html`
        <div class="container-fluid">
          ${VARIANTS.map(
            (variant, variantIndex) => html`
              <h2>${variant.name}</h2>
              <form class="row form-grid mb-32">
                ${FIELDS.map((field, index) => renderField(field, index, variant, variantIndex))}
              </form>
            `,
          )}
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    ),
};
