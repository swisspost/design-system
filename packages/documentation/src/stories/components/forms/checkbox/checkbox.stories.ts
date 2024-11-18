import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mapClasses } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'e6ecc86f-d148-413b-b796-614a89da54be',
  title: 'Components/Forms/Checkbox',
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
    label: 'Etikedo',
    hiddenLabel: false,
    checked: 'unchecked',
    disabled: false,
    size: 'null',
    validation: 'null',
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
        '<span className="mt-8 alert alert-info alert-sm">' +
        'Shown or hidden, a label must always be defined.<br/>' +
        'More details in our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs">accessibility docs</a>.' +
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
        '<span className="mt-8 alert alert-info alert-sm">' +
        'There are accessibility concerns with the disabled state.<br/>' +
        'More details in our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs">accessibility docs</a>.' +
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
        'Defines the validation state of the checkbox and controls the display of the corresponding return' +
        ' message.',
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

function getLabel({ label }: Args, { id }: StoryContext) {
  return html` <label for="${id}">${label}</label> `;
}

function getValidationFeedback({ validation }: Args) {
  return html`
    <p class="${validation + '-feedback'}">
      ${validation === 'valid' ? 'Ggranda sukceso!' : 'Eraro okazis!'}
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

  const validationClass = args.validation !== 'null' ? `is-${args.validation}` : undefined;

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
        ?disabled="${args.disabled}"
        .checked="${CHECKED_STATE_MAP[args.checked]}"
        @change="${handleChange}"
      />
      ${args.hiddenLabel ? nothing : getLabel(args, context)}
      ${args.validation !== 'null' ? getValidationFeedback(args) : nothing}
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
      ${['Unua Etikedo', 'Dua Etikedo', 'Tria Etikedo', 'Kvara  Etikedo'].map((label, index) =>
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
      ${['Unua Etikedo', 'Dua Etikedo', 'Tria Etikedo', 'Kvara  Etikedo'].map((label, index) =>
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
