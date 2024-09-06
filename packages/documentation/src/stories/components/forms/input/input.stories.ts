import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';
import { classMap } from 'lit-html/directives/class-map.js';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: '2df77c32-5e33-402e-bd2e-54d54271ce19',
  title: 'Components/Forms/Input',
  tags: ['package:HTML'],
  render: render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21923-74274&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    label: 'Label',
    floatingLabel: true,
    hiddenLabel: false,
    placeholder: 'Placeholder',
    type: 'text',
    sizeFloatingLabel: 'form-control-lg',
    disabled: false,
    validation: 'null',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Describes the content/topic of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    floatingLabel: {
      name: 'Floating Label',
      description: 'Defines how the components label is rendered.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Renders the component with or without a visible label.<span className="mt-mini alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#labels">label accessibility guide</a>.</span>',
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Defines the text displayed in the input when it is empty.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      description: 'The components `type` attribute.',
      control: {
        type: 'select',
        labels: {},
      },
      options: [
        'text',
        'number',
        'email',
        'tel',
        'url',
        'password',
        'date',
        'datetime-local',
        'month',
        'week',
        'time',
      ],
      table: {
        category: 'General',
      },
    },
    hint: {
      name: 'Helper Text',
      description: 'Text to place in the help text area of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
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

// RENDERERS
function getFormLabel(id: string, args: Args, versionSuffix: string) {
  return html` <label for="${id}" class="form-label${versionSuffix}">${args.label}</label> `;
}

function getFormControl(id: string, args: Args, versionSuffix: string) {
  const validationClass = args.validation !== 'null' ? ` ${args.validation}${versionSuffix}` : '';

  if (args.floatingLabel && !args.placeholder) {
    args.placeholder = ' '; // a placeholder must always be defined for the floating label to work properly
  }

  return html`
    <input
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      aria-label="${args.hiddenLabel ? args.label : nothing}"
      class="form-control${versionSuffix}${validationClass}"
      ?disabled="${args.disabled}"
      id="${id}"
      placeholder="${args.placeholder || nothing}"
      type="${args.type}"
      value="${args.value ? args.value : nothing}"
    />
  `;
}

function getFormFloating(id: string, args: Args, messages: TemplateResult, versionSuffix: string) {
  return html`
    <div class="form-floating${versionSuffix}">
      ${getFormControl(id, args, versionSuffix)} ${getFormLabel(id, args, versionSuffix)}
      ${messages}
    </div>
  `;
}

function render(args: Args, context: StoryContext) {
  const id = context.id ?? `ExampleTextarea_${context.name}`;
  const versionSuffix = args.floatingLabel ? '-v2' : '';

  const messages = html`
    ${args.validation === 'is-valid'
      ? html` <p class="valid-feedback${versionSuffix}">Ggranda sukceso!</p> `
      : nothing}
    ${args.validation === 'is-invalid'
      ? html` <p class="invalid-feedback${versionSuffix}">Eraro okazis!</p> `
      : nothing}
    ${args.hint !== ''
      ? html` <div class="form-text${versionSuffix}">${args.hint}</div> `
      : nothing}
  `;

  if (args.floatingLabel) {
    return getFormFloating(id, args, messages, versionSuffix);
  }

  return html`
    ${args.hiddenLabel ? nothing : getFormLabel(id, args, versionSuffix)}
    ${getFormControl(id, args, versionSuffix)} ${messages}
  `;
}

export const Default: Story = {
  args: {
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
  },
};

export const StandardLabel: Story = {
  args: {
    floatingLabel: false,
  },
};

export const Validation: Story = {
  args: {
    validation: 'is-invalid',
  },
};
