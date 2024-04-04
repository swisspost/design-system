import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { mapClasses } from '../../../utils';
import { MetaComponent } from '../../../../types';

const meta: MetaComponent = {
  id: '12576d97-52c3-49ec-be7b-6d37728b75f5',
  title: 'Components/Chip',
  tags: ['package:HTML'],
  render: renderChip,
  parameters: {
    controls: {
      exclude: ['dismissed'],
    },
  },
  args: {
    text: 'Insigno',
    size: 'Large',
    badge: false,
    type: 'filter',
    active: false,
    disabled: false,
    dismissed: false,
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
    badge: {
      name: 'Nested Badge',
      description: 'If `true`, a badge is displayed inside the chip.',
      control: {
        type: 'boolean',
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
    active: {
      name: 'Active',
      description: 'If `true`, the chip is active.',
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
    disabled: {
      name: 'Disabled',
      description:
        'If `true`, the chip is disabled.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
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
function externalControl(story: any, { args }: StoryContext) {
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

  return html` ${args.dismissed ? button : nothing} ${story()} `;
}

// RENDERER
let index = 0;
function getFilterChip(args: Args, updateArgs: (args: Args) => void, context: StoryContext) {
  index++;

  const checkboxId = `chip-example--${context.name.replace(/ /g, '-').toLowerCase()}` + index;

  const handleChange = (e: Event) => {
    updateArgs({ active: !args.active });

    if (document.activeElement === e.target) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${checkboxId}`);
        if (element) element.focus();
      }, 25);
    }
  };

  return html`
    <div class="chip${args.size === 'Large' ? '' : ' chip-sm'} chip-filter">
      <input
        id="${checkboxId}"
        name="${checkboxId}"
        class="chip-filter-input"
        type="checkbox"
        ?checked="${args.active}"
        ?disabled="${args.disabled}"
        @change="${handleChange}"
      />
      <label class="chip-filter-label" for="${checkboxId}">
        <span class="chip-text">${args.text}</span>
        ${args.badge ? html` <span class="badge">1</span> ` : nothing}
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
    </button>
  `;
}

function renderChip(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  if (args.dismissed) return html` ${nothing} `;

  if (args.type === 'dismissible') return getDismissibleChip(args, updateArgs);

  return getFilterChip(args, updateArgs, context);
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [externalControl],
};

export const FilterChip: Story = {
  render: ({ active, ...args }, context) => html`
    <div class="d-flex gap-mini">
      ${renderChip({ ...args, active: true, text: 'Ĉiuj' }, context)}
      ${renderChip({ ...args, text: 'Filtru unu' }, context)}
      ${renderChip({ ...args, text: 'Filtrilo du' }, context)}
      ${renderChip({ ...args, text: 'Filtrilo tri' }, context)}
    </div>
  `,
  args: {
    type: 'filter',
  },
};

export const Dismissible: Story = {
  render: ({ dismissed, ...args }, context) => html`
    <div class="d-flex gap-mini">
      ${renderChip({ ...args, text: 'Unua uzanta enigo' }, context)}
      ${renderChip({ ...args, text: 'Dua uzanta enigo' }, context)}
      ${renderChip({ ...args, text: 'Tria uzanta enigo' }, context)}
      ${renderChip({ ...args, text: 'Fora uzanta enigo' }, context)}
    </div>
  `,
  args: {
    type: 'dismissible',
  },
};
