import { useArgs } from 'storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';
import { getLabelText } from '@/utils/form-elements';

const meta: MetaComponent = {
  id: 'e6ecc86f-d148-413b-b796-614a89da54be',
  title: 'Components/Form Checkbox',
  tags: ['package:HTML'],
  render: renderCheckbox,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21763-60082&mode=design&t=3lniLiZhl7q9Gqgn-4',
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
        '<span className="mt-8 banner banner-info banner-sm">' +
        'Shown or hidden, a label must always be defined.<br/>' +
        'More details in our <a href="/?path=/docs/13fb5dfe-6c96-4246-aa6a-6df9569f143f--docs">form labels guidelines</a>.' +
        '</span>',
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
        '<span className="mt-8 banner banner-info banner-sm">' +
        'There are accessibility concerns with the disabled state.<br/>' +
        'More details in our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.' +
        '</span>',
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
        'Defines the validation state of the checkbox and controls the display of the corresponding return message. <span className="mt-8 banner banner-info banner-sm">Please read our <a href="/?path=/docs/1aa900d9-aa65-4ae0-b8cd-e6cca6cc3472--docs#checkbox">validation guidelines here</a>.</span> ',
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
          valid: 'Valid',
          invalid: 'Invalid',
        },
      },
      options: ['null', 'valid', 'invalid'],
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

const VALIDATION_STATE_MAP: Record<string, undefined | boolean> = {
  null: undefined,
  valid: false,
  invalid: true,
};

function getValidationFeedback({ validation }: Args, context: StoryContext) {
  return html`
    <p class="${validation + '-feedback'}" id="is-${validation}-id-${context.id}-">
      ${validation === 'valid' ? 'Great success!' : 'An error occurred!'}
    </p>
  `;
}

function renderCheckbox(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const containerClasses = mapClasses({
    'form-check': true,
    [args.size]: args.size,
    'form-check-inline': args.inline,
  });

  const validationClass =
    args.validation !== 'null' ? `${context.id}-is-${args.validation}` : undefined;

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
          ? `is-${args.validation}-id-${context.id}`
          : nothing}"
        ?disabled="${args.disabled}"
        .checked="${CHECKED_STATE_MAP[args.checked]}"
        @change="${handleChange}"
        ?required="${args.requiredOptional === 'required'}"
      />
      ${args.hiddenLabel ? nothing : html`<label for="${context.id}">${getLabelText(args)}</label>`}
      ${args.validation !== 'null' ? getValidationFeedback(args, context) : nothing}
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
    validation: 'invalid',
  },
};

export const Grouped: Story = {
  render: (args: Args, context: StoryContext) => html`
    <fieldset>
      <legend class="${ifDefined(args.hiddenLegend ? 'visually-hidden' : undefined)}">
        Legend
      </legend>
      ${['First Label', 'Second Label', 'Third Label', 'Fourth Label'].map((label, index) =>
        renderCheckbox(
          { ...args, label, checked: false },
          { ...context, id: `${context.id}-${index}` },
        ),
      )}
    </fieldset>
  `,
  parameters: {
    controls: {
      include: ['Hidden Legend'],
    },
  },
};

export const Inline: Story = {
  render: (args: Args, context: StoryContext) => html`
    <fieldset>
      <legend class="${ifDefined(args.hiddenLegend ? 'visually-hidden' : undefined)}">
        Legend
      </legend>
      ${['First Label', 'Second Label', 'Third Label', 'Fourth Label'].map((label, index) =>
        renderCheckbox(
          { ...args, label, checked: false },
          { ...context, id: `${context.id}-${index}` },
        ),
      )}
    </fieldset>
  `,
  parameters: {
    controls: {
      include: ['Hidden Legend'],
    },
  },
  args: {
    inline: true,
  },
};
