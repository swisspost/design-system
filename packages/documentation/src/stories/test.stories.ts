import { Args, Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import backgroundColors from '@/shared/background-colors.module.scss';
import chipMeta from '@/stories/components/chip/chip.stories';

const meta = {
  id: '0ca1c56d-805a-44d9-9b8c-3ef8bfbe494b',
  title: 'Components/Badge (auto doc)',
  component: 'badge',
  parameters: {
    docs: {
      description: {
        component: 'Highlight a numerical characteristic or mark an item with a status.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18172-73431&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  //👇 Enables auto-generated documentation for this component and includes all stories in this file
  tags: ['autodocs'],
  render: renderBadge,
  args: {
    showNumber: true,
    number: 1,
    size: 'large',
  },
  argTypes: {
    showNumber: {
      name: 'Show Number',
      description: 'If `true`, the badge contains a number otherwise it is empty.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    number: {
      name: 'Number',
      description: 'The number contained in the badge.',
      if: {
        arg: 'showNumber',
        truthy: true,
      },
      control: {
        type: 'number',
        min: 0,
      },
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      description: 'The size of the badge.',
      if: {
        arg: 'showNumber',
        truthy: true,
      },
      control: {
        type: 'radio',
        labels: {
          'large': 'Large',
          'badge-sm': 'Small',
        },
      },
      options: ['large', 'badge-sm'],
      table: {
        category: 'General',
      },
    },
    background: {
      name: 'Background',
      description: 'You can use the background classes to color the cards',
      control: {
        type: 'select',
      },
      options: Object.keys(backgroundColors),
      table: {
        category: 'General',
      },
    },
  },
} satisfies Meta<typeof HTMLPostClosebuttonElement>;

export default meta;

// RENDERER
function renderBadge(args: Args) {
  const sizingClass = args.showNumber && args.size !== 'large' ? ` ${args.size}` : '';
  const bgClass = args.background && args.background !== 'bg-danger' ? ` ${args.background}` : '';
  return html`
    <div class=${`badge${sizingClass}${bgClass}`}>${args.showNumber ? args.number : nothing}</div>
  `;
}

type Story = StoryObj<HTMLPostClosebuttonElement>;

export const Default: Story = {};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'You can change the badge color simply by applying a `.bg-*` class to it.'
      }
    }
  },
  render: args => html`
    ${renderBadge({ ...args, background: 'bg-info' })}
    ${renderBadge({ ...args, background: 'bg-success' })}
    ${renderBadge({ ...args, background: 'bg-warning' })}
    ${renderBadge({ ...args, background: 'bg-yellow' })}
  `,
};

export const LargeNumber: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A large number will extend the badge with. To prevent the badge from being too large you can simply use the `+` notation as shown hereafter.'
      }
    }
  },
  render: args => html`
    ${renderBadge({ ...args, number: 256 })} ${renderBadge({ ...args, number: '+99' })}
  `,
};

export const Position: Story = {
  parameters: {
    docs: {
      description: {
        story: 'As inline elements, the badges can be placed inside other element such as tags. They can also be place absolutely to appear above other elements such as icons for example.'
      }
    }
  },
  render: (_args, context) => html`
    ${chipMeta.render?.({ ...chipMeta.args, badge: true }, context)}

    <div class="position-relative d-inline">
      <post-icon name="2026" scale="1.5"></post-icon>
      <div class="badge badge-sm position-absolute top-0 start-100 translate-middle">3</div>
    </div>
  `,
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="d-flex gap-24 align-items-center">${story(args, context)}</div>
    `,
  ],
};
