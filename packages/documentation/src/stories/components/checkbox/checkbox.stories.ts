import { useArgs } from 'storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';
import { getLabelText, getValidationMessages, VALIDATION_STATE_MAP } from '@/utils/form-elements';

const meta: MetaComponent = {
  id: 'e6ecc86f-d148-413b-b796-614a89da54be',
  title: 'Components/Form Checkbox',
  tags: ['package:Styles', 'status:Stable'],
  render: renderCheckbox,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=18-14',
    },
  },
  args: {
    hiddenLegend: false,
    inline: false,
    label: 'Label',
    hiddenLabel: false,
    checked: 'unchecked',
    disabled: false,
    validation: 'null',
    requiredOptional: 'null',
    size: 'null',
  },
  argTypes: {
    hiddenLegend: {
      name: 'Hidden Legend',
      description: 'If `true`, the legend of the checkbox group is visually hidden.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    size: {
      name: 'Size',
      description: 'Defines the size of the component.',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'form-check-sm': 'Small',
        },
      },
      options: ['null', 'form-check-sm'],
      table: {
        category: 'General',
      },
    },
    inline: {
      name: 'Inline Layout',
      description:
        'If `true`, checkboxes are displayed in a single row otherwise they are stacked in a column.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      description: 'The text contained in the label that controls the checkbox.',
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
        'If `true`, the checkbox label is set via an `aria-label` attribute and is therefore not visible.' +
        '<post-banner data-size="sm"><p>' +
        'Shown or hidden, a label must always be defined.<br/>' +
        'More details in our <a href="/?path=/docs/13fb5dfe-6c96-4246-aa6a-6df9569f143f--docs">form labels guidelines</a>.' +
        '</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    checked: {
      name: 'Checked',
      description: 'If `true`, the checkbox is checked otherwise it is unchecked.',
      control: {
        type: 'radio',
        labels: {
          unchecked: 'Unchecked',
          checked: 'Checked',
          indeterminate: 'Indeterminate',
        },
      },
      options: ['unchecked', 'checked', 'indeterminate'],
      table: {
        category: 'States',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'If `true`, makes the checkbox appear inactive and disables its functionality.' +
        '<post-banner data-size="sm"><p>' +
        'There are accessibility concerns with the disabled state.<br/>' +
        'More details in our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.' +
        '</p></post-banner>',
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
        'Defines the validation state of the checkbox and controls the display of the corresponding return message. <post-banner data-size="sm"><p>Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#checkbox">validation guidelines here</a>.</p></post-banner> ',
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

// DECORATORS

// RENDERER
const CHECKED_STATE_MAP: Record<string, boolean> = {
  indeterminate: false,
  unchecked: false,
  checked: true,
};

const CHECKED_STATE_TOGGLE_MAP: Record<string, string> = {
  indeterminate: 'checked',
  unchecked: 'checked',
  checked: 'unchecked',
};

function renderCheckbox(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const containerClasses = mapClasses({
    'form-check': true,
    [args.size]: args.size,
    'form-check-inline': args.inline,
  });

  const validationClass = args.validation !== 'null' ? args.validation : undefined;

  const handleChange = () => {
    updateArgs({ checked: CHECKED_STATE_TOGGLE_MAP[args.checked] });
  };

  setTimeout(function () {
    const input: HTMLInputElement | null = document.querySelector(`#${context.id}`);
    if (input !== null) input.indeterminate = args.checked === 'indeterminate';
  });

  return html`
    <div class="${containerClasses}">
      <input
        id="${context.id}"
        class="${ifDefined(validationClass)}"
        type="checkbox"
        aria-invalid="${ifDefined(VALIDATION_STATE_MAP[args.validation])}"
        aria-label="${ifDefined(args.hiddenLabel ? args.label : undefined)}"
        aria-describedby="${args.validation != 'null'
          ? `${args.validation}-id-${context.id}`
          : nothing}"
        ?disabled="${args.disabled}"
        .checked="${CHECKED_STATE_MAP[args.checked]}"
        @change="${handleChange}"
        ?required="${args.requiredOptional === 'required'}"
      />
      ${args.hiddenLabel ? nothing : html`<label for="${context.id}">${getLabelText(args)}</label>`}
      ${args.validation !== 'null' ? getValidationMessages(args, context, false) : nothing}
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ['Hidden Legend', 'Inline Layout'],
    },
  },
};

export const Validation: Story = {
  parameters: {
    controls: {
      include: ['Validation'],
    },
  },
  args: {
    validation: 'is-invalid',
  },
};

export const Grouped: Story = {
  render: renderGroup,
  parameters: {
    controls: {
      include: ['Hidden Legend'],
    },
  },
};

export const Inline: Story = {
  render: renderGroup,
  parameters: {
    controls: {
      include: ['Hidden Legend'],
    },
  },
  args: {
    inline: true,
  },
};

export function renderGroup(args: Args, context: Partial<StoryContext>) {
  const generatedUuid = crypto.randomUUID();
  const uniqueSuffix = context.id ?? generatedUuid;

  const baseId = `${context.viewMode ?? 'view'}_${(context.name ?? '').replace(
    /\s/g,
    '-',
  )}_${uniqueSuffix}_Checkbox`;

  const itemClass = [
    'form-check',
    args.size && args.size !== 'null' ? args.size : undefined,
    args.inline ? 'form-check-inline' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  const labels = ['First Label', 'Second Label', 'Third Label', 'Fourth Label'];

  return html`
    <fieldset>
      <legend class="${args.hiddenLegend ? 'visually-hidden' : undefined}">Legend</legend>

      ${labels.map((label, index) => {
        const id = `${baseId}-${index}`;
        return html`
          <div class="${itemClass}">
            <input
              id="${id}"
              type="checkbox"
              ?disabled="${args.disabled}"
              ?required="${args.requiredOptional === 'required'}"
            />
            <label for="${id}">${label}</label>
          </div>
        `;
      })}
    </fieldset>
  `;
}
