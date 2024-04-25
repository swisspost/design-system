import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@/../types';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: '152b7268-cce0-43d7-b931-41a57370f9a0',
  title: 'Components/Forms/Textarea',
  tags: ['package:HTML'],
  render: renderTextarea,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=22194-89755&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    label: 'Label',
    floatingLabel: false,
    hiddenLabel: false,
    value: undefined,
    size: 'null',
    rows: 4,
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
    rows: {
      name: 'Rows',
      description:
        'Attribute to set the initial height, in lines of text, of the `textarea` element.',
      control: {
        type: 'number',
        min: 3,
        max: 10,
        step: 1,
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

function renderTextarea(args: Args, context: StoryContext) {
  const id =
    context.id ?? `${context.viewMode}_${context.story.replace(/\s/g, '-')}_ExampleTextarea`;
  const classes = mapClasses({
    'form-control': true,
    [args.size]: args.size && args.size !== 'null',
    [args.validation]: args.validation && args.validation !== 'null',
  });
  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label = !useAriaLabel
    ? html` <label for=${id} class="form-label">${args.label}</label> `
    : null;
  const contextual = [
    args.validation === 'is-valid'
      ? html` <div class="valid-feedback">Ggranda sukceso!</div> `
      : null,
    args.validation === 'is-invalid'
      ? html` <div class="invalid-feedback">Eraro okazis!</div> `
      : null,
    args.hint !== '' ? html` <div class="form-text">${args.hint}</div> ` : null,
  ];
  const control = html`
    <textarea
      id=${id}
      class=${classes}
      defaultValue=${args.value ?? nothing}
      placeholder=${useAriaLabel ? args.label : ' '}
      rows=${args.rows}
      ?disabled=${args.disabled}
      aria-label=${useAriaLabel ? args.label : nothing}
      aria-invalid=${VALIDATION_STATE_MAP[args.validation] ?? nothing}
      style=${args.resize ?? nothing}
    >
${args.textInside ?? nothing}</textarea
    >
  `;
  if (args.floatingLabel) {
    return html`
      <div class="form-control-wrapper form-floating">
        ${[control, label, ...contextual].filter(el => el !== null)}
      </div>
    `;
  } else
    return html`<div class="form-control-wrapper">
      ${[label, control, ...contextual].filter(el => el !== null)}
    </div>`;
}

export const Default: Story = {};

export const FloatingLabel: Story = {
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Size', 'Rows', 'Helper Text', 'Disabled', 'Validation'],
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
      exclude: [
        'Label',
        'Floating Label',
        'Hidden Label',
        'Rows',
        'Helper Text',
        'Disabled',
        'Validation',
      ],
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
      exclude: [
        'Label',
        'Floating Label',
        'Hidden Label',
        'Size',
        'Rows',
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
