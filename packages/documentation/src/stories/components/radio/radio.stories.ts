import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { useArgs } from 'storybook/preview-api';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getLabelText, getValidationMessages } from '@/utils/form-elements';

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  'null': undefined,
  'is-valid': false,
  'is-invalid': true,
};

const meta: MetaComponent = {
  id: '151242aa-a074-4a55-a81c-db597c83cdad',
  title: 'Components/Form Radio Button',
  tags: ['package:Styles', 'status:Stable'],
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
    validation: 'null',
    requiredOptional: 'null',
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
        'Renders the component with or without a visible label.<post-banner data-size="sm"><p>There are accessibility concerns with hidden labels.<br/>Please read our <a href="/?path=/docs/13fb5dfe-6c96-4246-aa6a-6df9569f143f--docs">form labels guidelines</a>.</p></post-banner>',
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
    disabled: {
      name: 'Disabled',
      description:
        'When set to `true`, disables the component\'s functionality and places it in a disabled state.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
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
        'Defines the validation state of the radio button and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#radio-button">validation guidelines here</a>.</p></post-banner> ',
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
  render: render,
};

function render(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const id = context.id ?? `${context.viewMode}_${context.name.replace(/\s/g, '-')}_ExampleRadio`;

  const radioClass = args.validation !== 'null' ? args.validation : undefined;

  const groupClasses = ['form-check', args.size].filter(c => c && c !== 'null').join(' ');

  const useAriaLabel = args.hiddenLabel;

  const label: TemplateResult | null = !useAriaLabel
    ? html` <label for="${id}">${getLabelText(args)}</label> `
    : null;

  const contextual: (TemplateResult | null)[] = getValidationMessages(args, context, false);

  const control = html`
    <input
      id="${id}"
      class="${ifDefined(radioClass)}"
      type="radio"
      ?checked="${args.checked}"
      .checked="${args.checked}"
      ?disabled="${args.disabled}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      ?aria-invalid="${VALIDATION_STATE_MAP[args.validation]}"
      aria-describedby="${args.validation != 'null'
        ? `${args.validation}-id-${context.id}`
        : nothing}"
      @change="${(e: Event) => updateArgs({ checked: (e.target as HTMLInputElement).checked })}"
      ?required="${args.requiredOptional === 'required'}"
    />
  `;

  return html`
    <div class="${groupClasses}">${[control, label, ...contextual].filter(el => el !== null)}</div>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export function renderGroup(args: Args, context: Partial<StoryContext>) {
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
      <div class="form-check ${args.inline ? 'form-check-inline' : ''}">
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
      <div class="form-check ${args.inline ? 'form-check-inline' : ''}">
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
      <div class="form-check ${args.inline ? 'form-check-inline' : ''}">
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
      <div class="form-check ${args.inline ? 'form-check-inline' : ''}">
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

export const Grouped: Story = {
  render: renderGroup,
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

export const Inline: Story = {
  render: renderGroup,
  parameters: {
    controls: {
      exclude: ['Hidden Label', 'Checked', 'Disabled', 'Validation'],
    },
  },
  args: {
    checkedRadio: null,
    inline: true,
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
