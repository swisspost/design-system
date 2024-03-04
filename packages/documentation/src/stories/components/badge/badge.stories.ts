import { useArgs } from '@storybook/preview-api';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { mapClasses } from '../../../utils';
import { MetaExtended } from '../../../../types/storybook';

const meta: MetaExtended = {
  id: 'bec68e8b-445e-4760-8bd7-1b9970206d8d',
  title: 'Components/Badge',
  render: renderBadge,
  decorators: [externalControl],
  parameters: {
    badges: [],
  },
  args: {
    text: 'Insigno',
    size: 'default',
    nestedBadge: false,
    interactionType: 'none',
    checked: false,
    dismissed: false,
  },
  argTypes: {
    text: {
      name: 'Text',
      description: 'The text contained in the badge.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      description: 'The size of the badge.',
      control: {
        type: 'radio',
        labels: {
          'default': 'Default',
          'badge-sm': 'Small',
        },
      },
      options: ['default', 'badge-sm'],
      table: {
        category: 'General',
      },
    },
    nestedBadge: {
      name: 'Nested Badge',
      description: 'If `true`, a nested badge is displayed inside the main badge.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    interactionType: {
      name: 'Interaction Type',
      description: 'Defines how the badge can be interacted with.',
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
      description: 'If `true`, the badge is checked otherwise it is unchecked.',
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
      description: 'If `true`, the badge is removed from the page otherwise it is displayed.',
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
      Show badge
    </a>
  `;

  return html` ${args.dismissed ? button : nothing} ${story()} `;
}

// RENDERER
function getDefaultContent(args: Args) {
  return html`
    <span>${args.text}</span>
    ${args.nestedBadge ? html` <span class="badge">10</span> ` : nothing}
  `;
}

function getCheckableContent(args: Args, updateArgs: (args: Args) => void, context: StoryContext) {
  const checkboxId = `badge-example--${context.name.replace(/ /g, '-').toLowerCase()}`;
  const labelClasses = mapClasses({
    'badge-check-label': true,
    [args.size]: args.size !== 'default',
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
      class="badge-check-input"
      type="checkbox"
      ?checked="${args.checked}"
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

function renderBadge(args: Args, context: StoryContext) {
  const [_, updateArgs] = useArgs();

  if (args.dismissed) return html` ${nothing} `;

  const isCheckable = args.interactionType === 'checkable';
  const isDismissible = args.interactionType === 'dismissible';

  const badgeClasses = mapClasses({
    'badge': !isCheckable,
    'badge-check': isCheckable,
    [args.size]: args.size !== 'default' && !isCheckable,
  });

  return html`
    <div class="${badgeClasses}">
      ${isCheckable ? getCheckableContent(args, updateArgs, context) : getDefaultContent(args)}
      ${isDismissible ? getDismissButton(updateArgs) : nothing}
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
