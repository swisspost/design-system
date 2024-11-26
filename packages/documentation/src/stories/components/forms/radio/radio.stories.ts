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
  id: '151242aa-a074-4a55-a81c-db597c83cdad',
  title: 'Components/Forms/Radio Button',
  tags: ['package:HTML'],
  parameters: {
    controls: {
      exclude: ['Hidden Legend'],
    },
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21786-25016&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    hiddenLegend: false,
    label: 'Label',
    hiddenLabel: false,
    checked: false,
    disabled: false,
    size: 'null',
    validation: 'null',
  },
  argTypes: {
    hiddenLegend: {
      name: 'Hidden Legend',
      description: 'Render the group with or without a visible legend.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
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
        'Renders the component with or without a visible label.<span className="mt-8 alert alert-info alert-sm">There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#labels">label accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      description: 'When set to `true`, places the component in the checked state.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    size: {
      name: 'Size',
      description: "Sets the size of the component's appearance.",
      control: {
        type: 'select',
        labels: {
          'form-check-sm': 'Small',
          'null': 'Large',
        },
      },
      options: ['form-check-sm', 'null'],
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<span className="mt-8 alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</span>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'States',
      },
    },
    validation: {
      name: 'Validation',
      description: "Controls the display of the component's validation state.",
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
  render: render,
};

function render(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const id = context.id ?? `${context.viewMode}_${context.name.replace(/\s/g, '-')}_ExampleRadio`;
  const classes = ['form-check-input', args.validation].filter(c => c && c !== 'null').join(' ');
  const groupClasses = ['form-check', args.size].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;
  const label: TemplateResult | null = !useAriaLabel
    ? html` <label for="${id}" class="form-check-label">${args.label}</label> `
    : null;

  const contextual: (TemplateResult | null)[] = [
    args.validation === 'is-valid' ? html` <p class="valid-feedback">Ggranda sukceso!</p> ` : null,
    args.validation === 'is-invalid' ? html` <p class="invalid-feedback">Eraro okazis!</p> ` : null,
  ];

  const control = html`
    <input
      id="${id}"
      class="${classes}"
      type="radio"
      ?checked="${args.checked}"
      .checked="${args.checked}"
      ?disabled="${args.disabled}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      @change="${(e: Event) => updateArgs({ checked: (e.target as HTMLInputElement).checked })}"
    />
  `;

  return html`
    <div class="${groupClasses}">${[control, label, ...contextual].filter(el => el !== null)}</div>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export function renderInline(args: Args, context: Partial<StoryContext>) {
  const [_, updateArgs] = useArgs();
  const baseId = `${context.viewMode}_${context.name?.replace(/\s/g, '-')}_ExampleRadio`;
  const id1 = baseId + '1';
  const id2 = baseId + '2';
  const id3 = baseId + '3';
  const id4 = baseId + '4';

  function onChange(e: Event, value: number) {
    const changeTarget = e.target as HTMLElement;
    updateArgs({ checkedRadio: value });

    if (document.activeElement === changeTarget) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${changeTarget.id}`);
        if (element) element.focus();
      }, 25);
    }
  }

  return html`
    <fieldset>
      <legend class="${args.hiddenLegend ? 'visually-hidden' : undefined}">Legend</legend>
      <div class="form-check form-check-inline">
        <input
          id="${id1}"
          name="Inline_ExampleRadio_Group"
          class="form-check-input"
          type="radio"
          ?checked="${args.checkedRadio === 1}"
          @change="${(e: Event) => onChange(e, 1)}"
        />
        <label for="${id1}" class="form-check-label">${args.label}</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          id="${id2}"
          name="Inline_ExampleRadio_Group"
          class="form-check-input"
          type="radio"
          ?checked="${args.checkedRadio === 2}"
          @change="${(e: Event) => onChange(e, 2)}"
        />
        <label for="${id2}" class="form-check-label">${args.label}</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          id="${id3}"
          name="Inline_ExampleRadio_Group"
          class="form-check-input"
          type="radio"
          ?checked="${args.checkedRadio === 3}"
          @change="${(e: Event) => onChange(e, 3)}"
        />
        <label for="${id3}" class="form-check-label">${args.label}</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          id="${id4}"
          name="Inline_ExampleRadio_Group"
          class="form-check-input"
          type="radio"
          ?checked="${args.checkedRadio === 4}"
          @change="${(e: Event) => onChange(e, 4)}"
        />
        <label for="${id4}" class="form-check-label">${args.label}</label>
      </div>
    </fieldset>
  `;
}

export const Size: Story = {
  render,
  args: {
    size: 'form-check-sm',
    checkedRadio: null,
  },
};

export const Inline: Story = {
  render: renderInline,
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Checked', 'Disabled', 'Validation'],
    },
  },
  args: {
    checkedRadio: null,
  },
  argTypes: {
    checkedRadio: {
      table: {
        disable: true,
      },
    },
  },
};

export const Validation: Story = {
  parameters: {
    controls: {
      exclude: ['Hidden Legend', 'Label', 'Hidden Label', 'Disabled'],
    },
  },
  args: {
    validation: 'is-invalid',
  },
};
