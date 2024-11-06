import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';

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
    floatingLabel: false,
    hiddenLabel: false,
    placeholder: 'Placeholder',
    type: 'text',
    size: 'form-control-lg',
    sizeFloatingLabel: 'form-control-lg',
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
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
    size: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      control: {
        type: 'select',
        labels: {
          'form-control-sm': 'Small',
          'form-control-rg': 'Regular (deprecated)',
          'null': 'Middle (deprecated)',
          'form-control-lg': 'Large',
        },
      },
      options: ['form-control-sm', 'form-control-rg', 'null', 'form-control-lg'],
      table: {
        category: 'General',
      },
    },
    sizeFloatingLabel: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      if: {
        arg: 'floatingLabel',
        truthy: true,
      },
      control: {
        type: 'select',
        labels: {
          'form-control-sm': 'Small',
          'form-control-lg': 'Large',
        },
      },
      options: ['form-control-sm', 'form-control-lg'],
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

function render(args: Args, context: StoryContext) {
  const id = context.id ?? `ExampleTextarea_${context.name}`;
  const classes = [
    'form-control',
    args.size,
    args.floatingLabel ? args.sizeFloatingLabel : '',
    args.validation,
  ]
    .filter(c => c && c !== 'null')
    .join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label: TemplateResult | null = !useAriaLabel
    ? html` <label for="${id}" class="form-label">${args.label}</label> `
    : null;

  if (args.floatingLabel && !args.placeholder) {
    args.placeholder = ' '; // a placeholder must always be defined for the floating label to work properly
  }

  const contextual: (TemplateResult | null)[] = [
    args.validation === 'is-valid' ? html` <p class="valid-feedback">Ggranda sukceso!</p> ` : null,
    args.validation === 'is-invalid' ? html` <p class="invalid-feedback">Eraro okazis!</p> ` : null,
    args.hint !== '' ? html` <p class="form-text">${args.hint}</p> ` : null,
  ];

  const control: TemplateResult = html`
    <input
      id="${id}"
      class="${classes}"
      type="${args.type}"
      placeholder="${args.placeholder || nothing}"
      ?disabled="${args.disabled}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      value="${args.value ? args.value : nothing}"
    />
  `;
  if (args.floatingLabel) {
    return html`
      <div class="form-floating">${[control, label, ...contextual].filter(el => el !== null)}</div>
    `;
  } else {
    return html`${[label, control, ...contextual].filter(el => el !== null)}`;
  }
}

export const Default: Story = {};

export const FloatingLabel: Story = {
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Size', 'Helper Text', 'Disabled', 'Validation'],
    },
  },
  args: {
    floatingLabel: true,
    hint: '',
  },
};

export const Size: Story = {
  parameters: {
    controls: {
      exclude: ['Label', 'Floating Label', 'Hidden Label', 'Helper Text', 'Disabled', 'Validation'],
    },
  },
  args: {
    size: 'form-control-sm',
    hint: '',
  },
};

export const Validation: Story = {
  parameters: {
    controls: {
      exclude: ['Label', 'Floating Label', 'Hidden Label', 'Size', 'Helper Text', 'Disabled'],
    },
  },
  args: {
    validation: 'is-invalid',
    hint: '',
  },
};
