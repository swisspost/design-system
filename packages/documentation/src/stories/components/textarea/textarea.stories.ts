import { MetaComponent } from '@root/types';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { mapClasses } from '@/utils';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: '152b7268-cce0-43d7-b931-41a57370f9a0',
  title: 'Components/Form Textarea',
  tags: ['package:HTML'],
  render: renderTextarea,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=21-182',
    },
  },
  args: {
    label: 'Label',
    floatingLabel: true,
    hiddenLabel: false,
    value: undefined,
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
        'Renders the component with or without a visible label.<span className="mt-8 banner banner-info banner-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#labels">label accessibility guide</a>.</span>',
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
    rows: {
      name: 'Rows',
      description:
        'Attribute to set the initial height, in lines of text, of the `textarea` element.',
      control: {
        type: 'number',
        min: 2,
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
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<div className="mt-8 banner banner-info banner-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
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
        'Defines the validation state of the textarea and controls the display of the corresponding return message. <span className="mt-8 banner banner-info banner-sm">Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#textarea">validation guidelines here</a>.</span> ',
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
  const classes = mapClasses({
    'form-control': true,
    [args.validation]: args.validation,
  });
  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label = !useAriaLabel
    ? html` <label for=${context.id} class="form-label">${args.label}</label> `
    : null;
  const contextual = [
    args.validation === 'is-valid'
      ? html`<div class="valid-feedback">Ggranda sukceso!</div>`
      : null,
    args.validation === 'is-invalid'
      ? html`<div class="invalid-feedback">Eraro okazis!</div>`
      : null,
    args.hint !== ''
      ? html`<p class="form-hint" id="form-hint-${context.id}">${args.hint}</p>`
      : null,
  ];
  const control = html`
    <textarea
      id=${context.id}
      class=${classes}
      defaultValue=${args.value ?? nothing}
      placeholder=${useAriaLabel ? args.label : 'My placeholder'}
      rows=${args.rows}
      ?disabled=${args.disabled}
      aria-label=${useAriaLabel ? args.label : nothing}
      aria-invalid=${VALIDATION_STATE_MAP[args.validation] ?? nothing}
      aria-describedby="${args.hint ? 'form-hint-' + context.id : ''}"
      style=${args.resize ?? nothing}
    >
${args.textInside ?? nothing}</textarea
    >
  `;
  if (args.floatingLabel) {
    return html`
      <div class="form-floating">${[control, label, ...contextual].filter(el => el !== null)}</div>
    `;
  } else return html`${[label, control, ...contextual].filter(el => el !== null)}`;
}

export const Default: Story = {};

export const FloatingLabel: Story = {
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Rows', 'Helper Text', 'Disabled', 'Validation'],
    },
  },
  args: {
    floatingLabel: true,
    hint: '',
  },
};
