import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { getLabelText, getValidationMessages, VALIDATION_STATE_MAP } from '@/utils/form-elements';
import { repeat } from 'lit-html/directives/repeat.js';

const meta: MetaComponent = {
  id: 'd5f43fa8-42ba-4cb9-98c7-9386d4c939bb',
  title: 'Components/Form Number Input',
  component: 'post-number-input',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {},
  render,
  args: {
    label: 'Quantity',
    floatingLabel: true,
    hiddenLabel: false,
    size: 'null',
    disabled: false,
    validation: 'null',
    requiredOptional: 'null',
    hint: 'This is helpful text that provides guidance or additional information to assist the user in filling out this field correctly.',
  },
  argTypes: {
    floatingLabel: {
      name: 'Floating Label',
      description: 'If true, the label floats over the input field.',
      type: {
        name: 'boolean',
      },
      table: {
        category: 'Input',
      },
    },
    hiddenLabel: {
      name: 'Hidden Label',
      description: 'If true, the label is visually hidden.',
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      type: {
        name: 'boolean',
      },
      table: {
        category: 'Input',
      },
    },
    label: {
      name: 'Label',
      description: 'A caption for the number input.',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      name: 'Placeholder',
      description:
        'A brief hint to the user as to what kind of information is expected in the field.',
      type: {
        name: 'string',
      },
      table: {
        category: 'Input',
      },
    },
    value: {
      name: 'Value',
      description: 'The value of the number entered into the input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    min: {
      name: 'Min',
      description: 'The minimum value to accept for this input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    max: {
      name: 'Max',
      description: 'The maximum value to accept for this input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    step: {
      name: 'Step',
      description: 'The granularity that the value must adhere to.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    size: {
      name: 'Size',
      description:
        'Defines the size of the number input. A small number input cannot have a floating label.',
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          small: 'Small',
        },
      },
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      options: ['null', 'small'],
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled state accessibility guide</a>.</p></post-banner>',
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
        'Defines the validation state of the input and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#input">validation guidelines here</a>.</p></post-banner> ',
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

function render(args: Args, context: StoryContext) {
  const key = `${args.disabled}-${args.validation}-${args.size}`;
  const id = `number-input--${context.name.toLowerCase().replaceAll(' ', '-')}`;

  const classes = ['form-control', args.validation, args.size === 'small' && 'form-control-sm']
    .filter(c => c && c !== 'null')
    .join(' ');

  const defaultPlaceholder = args.floatingLabel ? '' : nothing;

  const contextual = getValidationMessages(args, context);

  const ariaDescribedByParts = [
    args.hint ? 'form-hint-' + context.id : '',
    args.validation !== 'null' ? `${args.validation}-id-${context.id}` : '',
  ].filter(Boolean);

  const ariaDescribedBy =
    args.hint || args.validation !== 'null' ? ariaDescribedByParts.join(' ') : nothing;

  const input = html`
    <input
      id=${!args.hiddenLabel ? id : nothing}
      type="number"
      class="${classes}"
      ?disabled="${args.disabled}"
      aria-label=${args.hiddenLabel ? args.label : nothing}
      placeholder=${args.placeholder ?? defaultPlaceholder}
      aria-describedby="${ariaDescribedBy}"
      value=${args.value ?? nothing}
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      step=${args.step ?? nothing}
      min=${args.min ?? nothing}
      max=${args.max ?? nothing}
      ?required="${args.requiredOptional === 'required'}"
    />
  `;

  const label = !args.hiddenLabel
    ? html` <label class="form-label" for=${id}>${getLabelText(args)}</label> `
    : nothing;

  // repeat forces rerender and updates the story on args change
  return repeat(
    [key],
    k => k,
    () => html`
      ${args.floatingLabel ? nothing : label}
      <post-number-input class=${args.floatingLabel ? 'form-floating' : nothing}>
        ${args.floatingLabel ? [input, label] : input}
      </post-number-input>
      ${contextual}
    `,
  );
}

export const Default: Story = {};

export const FloatingLabel: Story = {
  args: {
    floatingLabel: true,
    hint: '',
  },
};

export const Small: Story = {
  args: {
    floatingLabel: false,
    size: 'small',
  },
};
