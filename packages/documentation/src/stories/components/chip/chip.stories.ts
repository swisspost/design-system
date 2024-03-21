import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { mapClasses } from '../../../utils';
import { MetaComponent } from '../../../../types';

const meta: MetaComponent = {
  id: 'bec68e8b-445e-4760-8bd7-1b9970206d8d',
  title: 'Components/Chip',
  tags: ['package:HTML'],
  render: renderChip,
  decorators: [externalControl],
  parameters: {
    chips: [],
  },
  args: {
    text: 'Insigno',
    size: 'large',
    badge: false,
    interactionType: 'none',
    checked: false,
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
    size: {
      name: 'Size',
      description: 'The size of the chip.',
      control: {
        type: 'radio',
        labels: {
          'large': 'Large',
          'chip-sm': 'Small',
        },
      },
      options: ['large', 'chip-sm'],
      table: {
        category: 'General',
      },
    },
    badge: {
      name: 'Nested Badge',
      description: 'If `true`, a badge is displayed inside the chip.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    interactionType: {
      name: 'Interaction Type',
      description: 'Defines how the chip can be interacted with.',
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          checkable: 'Checkable',
          dismissible: 'Dismissible',
        },
      },
      options: ['none', 'checkable', 'dismissible'],
      table: {
        category: 'Interactions',
      },
    },
    checked: {
      name: 'Checked',
      description: 'If `true`, the chip is checked otherwise it is unchecked.',
      if: {
        arg: 'interactionType',
        eq: 'checkable',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Interactions',
      },
    },
    disabled: {
      name: 'Disabled',
      description:
        'If `true`, the badge is disabled.<div className="mt-mini alert alert-info alert-sm">There are accessibility concerns with the disabled state.<br/>Please read our <a href="/?path=/docs/46da78e8-e83b-4ca1-aaf6-bbc662efef14--docs#disabled-state">disabled state accessibility guide</a>.</div>',
      if: {
        arg: 'interactionType',
        eq: 'checkable',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Interactions',
      },
    },
    dismissed: {
      name: 'Dismissed',
      description: 'If `true`, the chip is removed from the page otherwise it is displayed.',
      if: {
        arg: 'interactionType',
        eq: 'dismissible',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Interactions',
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
function getDefaultContent(args: Args) {
  return html`
    <span>${args.text}</span>
    ${args.badge ? html` <span class="badge">1</span> ` : nothing}
  `;
}

function getCheckableContent(args: Args, updateArgs: (args: Args) => void, context: StoryContext) {
  const checkboxId = `chip-example--${context.name.replace(/ /g, '-').toLowerCase()}`;
  const labelClasses = mapClasses({
    'chip-check-label': true,
    [args.size]: args.size !== 'large',
  });

  const handleChange = (e: Event) => {
    updateArgs({ checked: !args.checked });

    if (document.activeElement === e.target) {
      setTimeout(() => {
        const element: HTMLInputElement | null = document.querySelector(`#${checkboxId}`);
        if (element) element.focus();
      }, 25);
    }
  };

  return html`
    <input
      id="${checkboxId}"
      class="chip-check-input"
      type="checkbox"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      @change="${handleChange}"
    />
    <label class="${labelClasses}" for="${checkboxId}">${getDefaultContent(args)}</label>
  `;
}

function getDismissButton(updateArgs: (args: Args) => void) {
  return html`
    <button class="btn-close" @click="${() => updateArgs({ dismissed: true })}">
      <span class="visually-hidden">Forigi insignon</span>
    </button>
  `;
}

function renderChip(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  if (args.dismissed) return html` ${nothing} `;

  const isCheckable = args.interactionType === 'checkable';
  const isDismissible = args.interactionType === 'dismissible';

  const chipClasses = mapClasses({
    'chip': !isCheckable,
    'chip-check': isCheckable,
    [args.size]: args.size !== 'large' && !isCheckable,
  });

  return html`
    <div class="${chipClasses}">
      ${isDismissible ? getDismissButton(updateArgs) : nothing}
      ${isCheckable ? getCheckableContent(args, updateArgs, context) : getDefaultContent(args)}
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const Checkable: Story = {
  parameters: {
    controls: {
      exclude: ['Interaction Type'],
    },
  },
  args: {
    text: 'Kontrolebla Insigno',
    interactionType: 'checkable',
  },
};

export const Dismissible: Story = {
  parameters: {
    controls: {
      exclude: ['Interaction Type'],
    },
  },
  args: {
    text: 'Malakceptebla Insigno',
    interactionType: 'dismissible',
  },
};
