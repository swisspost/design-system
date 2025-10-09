import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { useArgs } from 'storybook/preview-api';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaComponent } from '@root/types';
import { getLabelText, getValidationMessages } from '@/utils/form-elements';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: 'bc251cd0-5173-463b-8729-586bb1bf1e1a',
  title: 'Components/Form Select',
  tags: ['package:Styles', 'status:Stable'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=21-183',
    },
  },
  args: {
    label: 'Label',
    floatingLabel: true,
    hiddenLabel: false,
    value: undefined,
    options: 5,
    multiple: false,
    multipleSize: 4,
    hint: 'This is helpful text that provides guidance or additional information to assist the user in filling out this field correctly.',
    disabled: false,
    validation: 'null',
    requiredOptional: 'null',
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
        'Renders the component with or without a visible label.<post-banner data-size="sm"><p>There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/13fb5dfe-6c96-4246-aa6a-6df9569f143f--docs">form labels guidelines</a>.</p></post-banner>',
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
    value: {
      name: 'Value',
      description: 'The value of the component.',
      control: {
        type: 'text',
      },
      table: {
        disable: true,
      },
    },
    options: {
      name: 'Options',
      description: 'Amount of `option` elements to render in the component.',
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    multiple: {
      name: 'Multiple',
      description: 'When set, allows multiple options to be selected (multi-select).',
      control: {
        type: 'boolean',
      },
      table: {
        disable: true,
      },
    },
    multipleSize: {
      name: 'Multiple Size',
      description:
        'When set to a number larger than 0, will set the number of display option rows.<post-banner type="error" data-size="sm"><p>Note: not all browser will respect this setting.</p></post-banner>',
      if: {
        arg: 'multiple',
      },
      control: {
        type: 'number',
        min: 0,
        max: 10,
        step: 1,
      },
      table: {
        disable: true,
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility issues with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description:
        'Defines the validation state of the select box and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#select">validation guidelines here</a>.</p></post-banner> ',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'is-valid': 'Valid',
          'is-invalid': 'Invalid',
        },
      },
      if: {
        arg: 'disabled',
        truthy: false,
      },
      options: ['null', 'is-valid', 'is-invalid'],
      table: {
        category: 'States',
      },
    },
    requiredOptional: {
      name: 'Required / Optional',
      description: 'Whether the field is required or optional.',
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          required: 'Required',
          optional: 'Optional',
        },
      },
      options: ['null', 'required', 'optional'],
      table: {
        category: 'States',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const Template: Story = {
  render: (args: Args, context: StoryContext) => {
    const [_, updateArgs] = useArgs();
    const classes = [
      'form-select',
      args.validation,
      args.floatingLabelPlaceholder && !args.value ? 'form-select-empty' : null,
    ]
      .filter(c => c && c !== 'null')
      .join(' ');
    const useAriaLabel = !args.floatingLabel && args.hiddenLabel;

    const label = !useAriaLabel
      ? html` <label for="${context.id}" class="form-label">${getLabelText(args)}</label> `
      : null;
    const optionElements = Array.from({ length: args.options - 1 }, (_, i) => i + 2).map(
      (key: number) => html` <option value="value_${key}">Option ${key}</option> `,
    );
    const options = [
      ...[
        args.floatingLabelPlaceholder
          ? html` <option></option> `
          : html` <option>Choose an option...</option> `,
      ],
      ...optionElements,
    ];

    const contextuals = getValidationMessages(args, context);

    const ariaDescribedByParts = [
      args.hint ? 'form-hint-' + context.id : '',
      args.validation !== 'null' ? `${args.validation}-id-${context.id}` : '',
    ].filter(Boolean);

    const ariaDescribedBy =
      args.hint || args.validation !== 'null' ? ariaDescribedByParts.join(' ') : nothing;

    const control = html`
      <select
        id="${context.id}"
        class="${classes}"
        ?multiple="${args.multiple}"
        size="${args.multipleSize ?? nothing}"
        ?disabled="${args.disabled}"
        aria-label="${useAriaLabel ? args.label : nothing}"
        aria-invalid="${ifDefined(VALIDATION_STATE_MAP[args.validation])}"
        aria-describedby="${ariaDescribedBy}"
        @change="${(e: Event) => {
          updateArgs({ value: (e.target as HTMLSelectElement).value });
        }}"
        ?required="${args.requiredOptional === 'required'}"
      >
        ${[
          options[0],
          options
            .slice(1)
            .map(
              (option, index) => html`
                <option value="value_${index + 1}" ?selected="${index === args.selectedOption - 2}">
                  Option ${index + 2}
                </option>
              `,
            ),
        ]}
      </select>
    `;

    if (args.floatingLabel) {
      return html`
        <div class="form-floating">
          ${[control, label, ...contextuals].filter(el => el !== null)}
        </div>
      `;
    } else {
      return html`${[label, control, ...contextuals].filter(el => el !== null)}`;
    }
  },
};

export const Default: Story = {
  ...Template,
};

export const FloatingLabel: Story = {
  ...Template,
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Options', 'Multiple', 'Helper Text', 'Disabled', 'Validation'],
    },
  },
  args: {
    floatingLabel: true,
    hint: '',
  },
};

export const FloatingLabelPlaceholder: Story = {
  ...Template,
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Options', 'Multiple', 'Helper Text', 'Disabled', 'Validation'],
    },
  },
  args: {
    floatingLabel: true,
    floatingLabelPlaceholder: true,
    hint: '',
  },
};

export const Validation: Story = {
  ...Template,
  parameters: {
    controls: {
      exclude: [
        'Label',
        'Floating Label',
        'Hidden Label',
        'Options',
        'Multiple',
        'Helper Text',
        'Disabled',
      ],
    },
  },
  args: {
    validation: 'is-invalid',
    hint: '',
  },
};
