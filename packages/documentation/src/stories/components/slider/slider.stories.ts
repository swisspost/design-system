import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { useArgs } from '@storybook/preview-api';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: '4c5a4537-d663-4d2b-9c49-17af95443696',
  title: 'Components/Form Slider',
  tags: ['package:HTML'],
  render: render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18201-21381&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    label: 'Label',
    hiddenLabel: false,
    value: 50,
    useBoundaries: false,
    min: 0,
    max: 100,
    step: 1,
    showValue: 'none',
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
    hiddenLabel: {
      name: 'Hidden Label',
      description:
        'Renders the component with or without a visible label.<span className="mt-8 banner banner-info banner-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#labels">label accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    value: {
      name: 'Value',
      description: 'Holds the current input value.',
      control: {
        type: 'number',
      },
      table: {
        disable: true,
      },
    },
    useBoundaries: {
      name: 'Boundaries',
      description: 'Render the component with or without `min`, `max` and `step` attributes.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    min: {
      name: 'Minimum Value',
      description: 'Controls the `min` attribute of the component.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
      },
    },
    max: {
      name: 'Maximum Value',
      description: 'Controls the `max` attribute of the component.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
      },
      table: {
        category: 'General',
      },
    },
    step: {
      name: 'Step',
      description:
        'Controls the `step` attribute of the component. You can also use fractional numbers.',
      if: {
        arg: 'useBoundaries',
      },
      control: {
        type: 'number',
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    showValue: {
      name: 'Show Value',
      description: 'Render the component with or without a visible value.',
      control: {
        type: 'radio',
        labels: {
          none: 'None',
          text: 'Text',
          input: 'Input',
        },
      },
      options: ['none', 'text', 'input'],
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-8 banner banner-info banner-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</span>',
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
        'Defines the validation state of the slider and controls the display of the corresponding return message. <span className="mt-8 banner banner-info banner-sm">Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#select">validation guidelines here</a>.</span> ',
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
  const [_, updateArgs] = useArgs();

  const id = context.id ?? `${context.viewMode}_${context.name.replace(/\s/g, '-')}_ExampleRange`;
  const classes = ['form-range', args.validation].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label: TemplateResult | null = !useAriaLabel
    ? html` <label class="form-label" for="${id}">${args.label}</label> `
    : null;

  const contextual: (TemplateResult | null)[] = [
    args.validation === 'is-valid' ? html` <p class="valid-feedback">Ggranda sukceso!</p> ` : null,
    args.validation === 'is-invalid' ? html` <p class="invalid-feedback">Eraro okazis!</p> ` : null,
  ];

  const control: TemplateResult = html`
    <input
      id="${id}"
      class="${classes}"
      type="range"
      value="${args.value}"
      .value="${args.value}"
      min="${args.useBoundaries ? args.min : nothing}"
      max="${args.useBoundaries ? args.max : nothing}"
      step="${args.useBoundaries ? args.step : nothing}"
      ?disabled="${args.disabled}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      aria-describedby="${args.showValue === 'text' ? 'form-hint-' + id : ''}"
      @input="${(e: MouseEvent) => updateArgs({ value: (e.target as HTMLInputElement).value })}"
    />
  `;

  let valueElement: TemplateResult | null = null;

  if (args.showValue === 'input') {
    const inputId = context.id
      ? `${context.id}_input`
      : `${context.viewMode}_${context.name.replace(/\s/g, '-')}_ExampleRangeInput`;

    return html`
      <div class="row align-items-end">
        <div class="col">${[label, control, ...contextual].filter(el => el !== null)}</div>
        <div class="col-auto">
          <label class="form-label visually-hidden" for="${inputId}">Range controller</label>
          <input
            id="${inputId}"
            class="form-control min-w-80"
            type="text"
            inputmode="decimal"
            value="${args.value}"
            .value="${args.value}"
            ?disabled="${args.disabled}"
            @input="${(e: Event) => updateArgs({ value: (e.target as HTMLInputElement).value })}"
          />
        </div>
      </div>
    `;
  } else if (args.showValue === 'text') {
    valueElement = html`<p class="form-hint" id="form-hint-${id}">${args.value}</p> `;
  }

  return html`${[label, control, valueElement, ...contextual].filter(el => el !== null)}`;
}

export const Default: Story = {};

export const Boundaries: Story = {
  name: 'Min, Max & Steps',
  parameters: {
    controls: {
      exclude: ['Label', 'Hidden Label', 'Boundaries', 'Show Value', 'Disabled', 'Validation'],
    },
  },
  args: {
    value: 5.1,
    useBoundaries: true,
    min: 0,
    max: 10,
    step: 0.1,
    showValue: 'text',
  },
};

export const Validation: Story = {
  parameters: {
    controls: {
      exclude: ['Label', 'Hidden Label', 'Boundaries', 'Disabled'],
    },
  },
  args: {
    validation: 'is-invalid',
  },
};
