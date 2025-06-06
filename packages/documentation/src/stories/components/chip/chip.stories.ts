import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '12576d97-52c3-49ec-be7b-6d37728b75f5',
  title: 'Components/Chip',
  tags: ['package:HTML'],
  render: renderChip,
  parameters: {
    controls: {
      exclude: ['dismissed', 'number', 'radio'],
    },
  },
  args: {
    text: 'Chip',
    size: 'Large',
    type: 'filter',
    disabled: false,
    active: false,
    badge: false,
    dismissed: false,
    number: 1,
    radio: false,
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'The text contained in the chip.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      description: 'The size of the chip.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      description: 'Defines how the chip can be interacted with.',
      control: {
        type: 'radio',
        labels: {
          filter: 'Filter Chip',
          dismissible: 'Dismissible Chip',
        },
      },
      options: ['filter', 'dismissible'],
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'If `true`, the chip is disabled.<div className="mt-8 banner banner-info banner-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</div>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    active: {
      name: 'Active',
      description:
        'If `true`, the chip is active.<div className="mt-8 banner banner-info banner-sm">Disabling active chips can result in confusing or unexpected behavior and should be avoided.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</div>',
      if: {
        arg: 'type',
        eq: 'filter',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    badge: {
      name: 'Nested Badge',
      description: 'If `true`, a badge is displayed inside the chip.',
      if: {
        arg: 'type',
        eq: 'filter',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  const button = html`
    <a
      href="#"
      @click="${(e: Event) => {
        e.preventDefault();
        updateArgs({ dismissed: false });
      }}"
    >
      Show chip
    </a>
  `;

  return html` ${context.args.dismissed ? button : nothing} ${story(context.args, context)} `;
}

// RENDERER
function getFilterChip(
  args: Args,
  updateArgs: (args: Args) => void,
  context: StoryContext,
  index?: number,
) {
  const inputName = `chip-example--${context.name.replace(/ /g, '-').toLowerCase()}`;
  const inputId = typeof index !== 'undefined' ? `${inputName}-${index}` : inputName;

  const handleChange = (e: Event) => {
    updateArgs({ active: !args.active });

    if (document.activeElement === e.target) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${inputId}`);
        if (element) element.focus();
      }, 25);
    }
  };

  return html`
    <div class="chip${args.size === 'Large' ? '' : ' chip-sm'} chip-filter">
      <input
        id="${inputId}"
        name="${args.radio ? inputName : inputId}"
        class="chip-filter-input"
        type="${args.radio ? 'radio' : 'checkbox'}"
        ?checked="${args.active}"
        ?disabled="${args.disabled}"
        @change="${handleChange}"
      />
      <label class="chip-filter-label" for="${inputId}">
        <span class="chip-text">${args.text}</span>
        ${args.badge ? html` <span class="badge">${args.number}</span> ` : nothing}
      </label>
    </div>
  `;
}

function getDismissibleChip(args: Args, updateArgs: (args: Args) => void) {
  return html`
    <button
      class="chip${args.size === 'Large' ? '' : ' chip-sm'} chip-dismissible"
      @click="${() => updateArgs({ dismissed: true })}"
      ?disabled="${args.disabled}"
    >
      <span class="chip-text">${args.text}</span>
      <span class="visually-hidden">Dismiss</span>
    </button>
  `;
}

function renderChip(args: Args, context: StoryContext, index?: number) {
  const [_, updateArgs] = useArgs();

  if (args.dismissed) return html` ${nothing} `;

  if (args.type === 'dismissible') return getDismissibleChip(args, updateArgs);

  return getFilterChip(args, updateArgs, context, index);
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [externalControl],
};

export const FilterCheckboxChip: Story = {
  render: ({ active, ...args }, context) => {
    const checkboxChips = [
      { text: 'Adventure', active: true },
      { text: 'Family' },
      { text: 'Sights' },
    ];

    return html`
      <fieldset>
        <legend>Travel Itineraries</legend>
        <div class="d-flex flex-wrap gap-8">
          ${checkboxChips.map(({ text, active }, index) =>
            renderChip({ ...args, text, active }, context, index),
          )}
        </div>
      </fieldset>
    `;
  },
  decorators: [story => html`<div class="d-flex gap-56">${story()}</div>`],
  args: {
    type: 'filter',
  },
};

export const FilterRadioChip: Story = {
  render: ({ active, ...args }, context) => {
    const radioChips = [
      { number: 253, text: 'All' },
      { number: 12, text: 'Articles', active: true },
      { number: 5, text: 'Tools' },
      { number: 236, text: 'Documents' },
    ];

    return html`
      <fieldset>
        <legend class="">Search Results</legend>
        <div class="d-flex flex-wrap gap-8">
          ${radioChips.map(({ text, number, active }, index) =>
            renderChip({ ...args, text, number, active }, context, index),
          )}
        </div>
      </fieldset>
    `;
  },
  decorators: [story => html`<div class="d-flex gap-56">${story()}</div>`],
  args: {
    type: 'filter',
    radio: true,
    size: 'Small',
    badge: true,
  },
};

export const Dismissible: Story = {
  render: ({ dismissed, ...args }, context) => html`
    <div class="d-flex flex-wrap gap-8">
      ${renderChip({ ...args, text: 'First user input' }, context)}
      ${renderChip({ ...args, text: 'Second user input' }, context)}
      ${renderChip({ ...args, text: 'Third user input' }, context)}
      ${renderChip({ ...args, text: 'Fourth user input' }, context)}
    </div>
  `,
  args: {
    type: 'dismissible',
  },
};
