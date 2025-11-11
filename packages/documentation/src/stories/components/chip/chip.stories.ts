import { useArgs } from 'storybook/preview-api';
import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '12576d97-52c3-49ec-be7b-6d37728b75f5',
  title: 'Components/Chip',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderChip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=18-15',
    },
  },
  args: {
    text: 'Chip',
    type: 'selectable',
    disabled: false,
    selected: false,
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
    type: {
      name: 'Type',
      description: 'Defines how the chip can be interacted with.',
      control: {
        type: 'radio',
        labels: {
          selectable: 'Selectable Chip',
          dismissible: 'Dismissible Chip',
        },
      },
      options: ['selectable', 'dismissible'],
      table: {
        category: 'General',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'If `true`, the chip is disabled.<post-banner data-size="sm"><p>There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    selected: {
      name: 'Selected',
      description:
        'If `true`, the chip is selected.<post-banner data-size="sm"><p>Disabling selected chips can result in confusing or unexpected behavior and should be avoided.<br/>Please read our <a href="/?path=/docs/cb34361c-7d3f-4c21-bb9c-874c73e82578--docs">disabled elements guidelines</a>.</p></post-banner>',
      if: {
        arg: 'type',
        eq: 'selectable',
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
      description:
        'If `true`, a badge is displayed inside the chip (only available on selectable chips).',
      if: {
        arg: 'type',
        eq: 'selectable',
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
function getSelectableChip(
  args: Args,
  updateArgs: (args: Args) => void,
  context: StoryContext,
  index?: number,
) {
  const inputName = `chip-example--${context.name.replace(/ /g, '-').toLowerCase()}`;
  const inputId = typeof index !== 'undefined' ? `${inputName}-${index}` : inputName;

  const handleChange = (e: Event) => {
    updateArgs({ selected: !args.selected });

    if (document.activeElement === e.target) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${inputId}`);
        if (element) element.focus();
      }, 25);
    }
  };

  return html`
    <div class="chip chip-selectable">
      <input
        id="${inputId}"
        name="${args.radio ? inputName : inputId}"
        type="${args.radio ? 'radio' : 'checkbox'}"
        ?checked="${args.selected}"
        ?disabled="${args.disabled}"
        @change="${handleChange}"
      />
      <label for="${inputId}">
        <span class="chip-text">${args.text}</span>
        ${args.badge ? html` <span class="badge">${args.number}</span> ` : nothing}
      </label>
    </div>
  `;
}

function getDismissibleChip(args: Args, updateArgs: (args: Args) => void) {
  return html`
    <button
      class="chip chip-dismissible"
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

  return getSelectableChip(args, updateArgs, context, index);
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [externalControl],
};

export const SelectableCheckboxChip: Story = {
  render: ({ selected, ...args }, context) => {
    const checkboxChips = [
      { text: 'Adventure', selected: true },
      { text: 'Family' },
      { text: 'Sights' },
    ];

    return html`
      <fieldset class="chip-selectable-group">
        <legend>Travel Itineraries</legend>
        ${checkboxChips.map(({ text, selected }, index) =>
          renderChip({ ...args, text, selected }, context, index),
        )}
      </fieldset>
    `;
  },
  args: {
    type: 'filter',
  },
};

export const SelectableBadgeChip: Story = {
  render: ({ selected, ...args }, context) => {
    const checkboxChips = [
      { text: 'Adventure', badge: true, number: 5, selected: true },
      { text: 'Family', badge: true, number: 233 },
      { text: 'Sights', badge: true, number: 12 },
    ];

    return html`
      <fieldset class="chip-selectable-group">
        <legend>Travel Itineraries</legend>
        ${checkboxChips.map(({ text, selected, badge, number }, index) =>
          renderChip({ ...args, text, selected, badge, number }, context, index),
        )}
      </fieldset>
    `;
  },
  args: {
    type: 'filter',
  },
};

export const SelectableRadioChip: Story = {
  render: ({ selected, ...args }, context) => {
    const radioChips = [
      { number: 253, text: 'All' },
      { number: 12, text: 'Articles', selected: true },
      { number: 5, text: 'Tools' },
      { number: 236, text: 'Documents' },
    ];

    return html`
      <fieldset class="chip-selectable-group">
        <legend class="">Search Results</legend>
        ${radioChips.map(({ text, number, selected }, index) =>
          renderChip({ ...args, text, number, selected }, context, index),
        )}
      </fieldset>
    `;
  },
  args: {
    type: 'filter',
    radio: true,
    badge: true,
  },
};

export const Dismissible: Story = {
  render: ({ dismissed, ...args }, context) => html`
    <div class="chip-dismissible-group">
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
