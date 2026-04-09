import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';
import { getLabelText, getValidationMessages, VALIDATION_STATE_MAP } from '@/utils/form-elements';

const meta: MetaComponent = {
  id: '51471f0b-1bbb-4059-951b-f89aa7339f91',
  title: 'Components/Form Timepicker',
  tags: ['package:Styles', 'status:Stable'],
  render: render,
  parameters: {
    badges: [],
  },
  args: {
    label: 'Label',
    floatingLabel: true,
    hiddenLabel: false,
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
  const id = context.id ?? `ExampleInput_${context.name}`;
  const classes = ['form-control', args.validation].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;

  const label: TemplateResult | null = !useAriaLabel
    ? html` <label for="${id}" class="form-label">${getLabelText(args)}</label> `
    : null;

  const contextual = getValidationMessages(args, context);

  const ariaDescribedByParts = [
    args.hint ? 'form-hint-' + context.id : '',
    args.validation !== 'null' ? `${args.validation}-id-${context.id}` : '',
  ].filter(Boolean);

  const ariaDescribedBy =
    args.hint || args.validation !== 'null' ? ariaDescribedByParts.join(' ') : nothing;

  const control: TemplateResult = html`
    <input
      id="${id}"
      class="${classes}"
      type="time"
      ?disabled="${args.disabled}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      aria-describedby="${ariaDescribedBy}"
      value="${args.value ? args.value : nothing}"
      ?required="${args.requiredOptional === 'required'}"
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
