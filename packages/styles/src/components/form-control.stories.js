import './forms.scss';
import './floating-label.scss';
import './form-feedback.scss';

const LabelStyle = {
  Floating: 'floating',
  Static: 'static',
  Hidden: 'hidden',
};

const SizeClass = {
  Small: ' form-control-sm',
  Regular: ' form-control-rg',
  Medium: '',
  Large: ' form-control-lg',
};

const ValidationClass = {
  None: '',
  Valid: ' is-valid',
  Invalid: ' is-invalid',
};

export default {
  title: 'Components/From Control',
  argTypes: {
    label: {
      type: {
        name: 'string',
        required: true,
      },
      description: 'Specifies a label for for the &lt;input&gt; element',
      table: { category: 'Label' },
      control: { type: 'text' },
      defaultValue: 'Default Form Control',
    },
    labelStyle: {
      name: 'style',
      type: { name: 'string' },
      description: 'Specifies the style in which to display the label<br><em>With a floating label, no placeholders are shown and the input is bound to be large</em>',
      table: {
        category: 'Label',
        defaultValue: { summary: 'Floating' },
      },
      control: { type: 'radio' },
      options: Object.keys(LabelStyle),
      defaultValue: 'Floating',
      mapping: LabelStyle,
    },
    id: {
      type: {
        name: 'string',
        required: true,
      },
      description: 'Specifies a unique id for the &lt;input&gt; element',
      table: { category: 'Input' },
      control: { type: 'text' },
      defaultValue: 'formControlInput',
    },
    type: {
      type: {
        name: 'string',
        required: true,
      },
      description: 'Specifies the type of &lt;input&gt; element to display',
      table: { category: 'Input' },
      control: { type: 'select' },
      options: [ 'text', 'email', 'password', 'number', 'search', 'tel', 'url' ],
      defaultValue: 'text',
    },
    size: {
      type: { name: 'string' },
      description: 'Specifies the size of the &lt;input&gt; element',
      table: {
        category: 'Input',
        defaultValue: { summary: 'Medium' },
      },
      if: {
        arg: 'labelStyle',
        neq: 'Floating',
      },
      control: { type: 'select' },
      options: Object.keys(SizeClass),
      defaultValue: 'Medium',
      mapping: SizeClass,
    },
    placeholder: {
      type: { name: 'string' },
      description: 'Specifies a short hint that describes the expected value of the &lt;input&gt; element',
      table: { category: 'Input' },
      if: {
        arg: 'labelStyle',
        neq: 'Floating',
      },
      control: { type: 'text' },
      defaultValue: 'Placeholder text',
    },
    disabled: {
      type: { name: 'boolean' },
      description: 'Specifies that an &lt;input&gt; element should be disabled',
      table: { category: 'Input' },
      control: { type: 'boolean' },
      defaultValue: false,
    },
    hint: {
      type: { name: 'string' },
      description: 'Specifies a in-context description that clarifies the expected value of the &lt;input&gt; element',
      table: { category: 'Hint' },
      control: { type: 'text' },
      defaultValue: '',
    },
    hintId: {
      name: 'id',
      type: { name: 'string', required: true },
      description: 'Specifies a unique id for the hint<br><em>This id is used to explicitly associate the hint with the form control it relates to using the aria-describedby attribute</em>',
      if: {
        arg: 'hint',
        neq: '',
      },
      table: { category: 'Hint' },
      control: { type: 'text' },
      defaultValue: 'formControlHint',
    },
    validation: {
      type: { name: 'string' },
      description: 'Enables or disables form validation',
      table: {
        category: 'Validation',
        defaultValue: { summary: 'None' },
      },
      control: { type: 'radio' },
      options: Object.keys(ValidationClass),
      defaultValue: 'None',
      mapping: ValidationClass,
    },
    validationMessage: {
      name: 'validation message',
      type: { name: 'string' },
      description: 'Specifies valuable and actionable feedback regarding the validation state of the &lt;input&gt; element',
      table: { category: 'Validation' },
      if: {
        arg: 'validation',
        neq: 'None',
      },
      control: { type: 'text' },
      defaultValue: 'Validation message',
    },
  },
};

const InputTemplate = (args) => {
  let extraAttributes = '';

  if (args.labelStyle === LabelStyle.Hidden) {
    extraAttributes += ` aria-label="${args.label}"`;
  }

  if (args.hintId) {
    extraAttributes += ` aria-describedby="${args.hintId}"`;
  }

  if (args.disabled) {
    extraAttributes += ' disabled';
  }

  if (args.labelStyle === LabelStyle.Floating) {
    args.size = '';
    args.placeholder = ' ';
  }

  return `<input type="${args.type}" class="form-control${args.size}${args.validation}" id="${args.id}" placeholder="${args.placeholder}"${extraAttributes}>`;
};

const LabelTemplate = (args) => {
  let extraAttributes = '';

  if (args.labelStyle !== LabelStyle.Floating) {
    extraAttributes += ' class="form-label"';
  }

  return `<label for="${args.id}"${extraAttributes}>${args.label}</label>`;
};

const DefaultTemplate = (args) => {
  let formControlCompound;
  let indent = '';

  switch (args.labelStyle) {
    case LabelStyle.Floating:
      indent = `    `;
      formControlCompound = `${indent}${InputTemplate(args)}\n${indent}${LabelTemplate(args)}`;
      break;
    case LabelStyle.Static:
      formControlCompound = `${LabelTemplate(args)}\n${InputTemplate(args)}`;
      break;
    case LabelStyle.Hidden:
      formControlCompound = InputTemplate(args);
  }

  if (args.validationMessage) {
    const feedbackClass = args.validation === ValidationClass.Valid ? 'valid-feedback' : 'invalid-feedback';
    formControlCompound += `\n${indent}<div class="${feedbackClass}">${args.validationMessage}</div>`;
  }

  if (args.hint) {
    formControlCompound += `\n${indent}<div id="${args.hintId}" class="form-text">${args.hint}</div>`;
  }

  if (args.labelStyle === LabelStyle.Floating) {
    return `<div class="form-floating">\n${formControlCompound}\n</div>`;
  }

  return formControlCompound;
};

export const DefaultFormControl = DefaultTemplate.bind({});
