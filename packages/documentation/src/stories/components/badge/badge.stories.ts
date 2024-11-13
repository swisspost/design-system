import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import backgroundColors from '@/shared/background-colors.module.scss';
import { coloredBackground } from '@/shared/decorators/dark-background';
import chipMeta from '@/stories/components/chip/chip.stories';

const meta: MetaComponent = {
  id: 'bec68e8b-445e-4760-8bd7-1b9970206d8d',
  title: 'Components/Badge',
  tags: ['package:HTML'],
  render: renderBadge,
  decorators: [adaptiveBackground],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18172-73431&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
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
      name: 'Backround',
      description: 'You can use the Background classes to color the cards',
      control: {
        type: 'select',
      },
      options: Object.keys(backgroundColors),
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// DECORATORS
function adaptiveBackground(story: StoryFn, context: StoryContext) {
  const { args } = context;
  const isLight = ['bg-white', 'bg-light', 'bg-gray'].includes(args.background as string);
  return isLight ? coloredBackground(story, context, 'dark') : story(args, context);
}

// RENDERER
function renderBadge(args: Args) {
  const sizingClass = args.showNumber && args.size !== 'large' ? ` ${args.size}` : '';
  const bgClass = args.background && args.background !== 'bg-danger' ? ` ${args.background}` : '';
  return html`
    <div class=${`badge${sizingClass}${bgClass}`}>${args.showNumber ? args.number : nothing}</div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const Colors: Story = {
  render: args => html`
    ${renderBadge({ ...args, background: 'bg-info' })}
    ${renderBadge({ ...args, background: 'bg-success' })}
    ${renderBadge({ ...args, background: 'bg-warning' })}
    ${renderBadge({ ...args, background: 'bg-yellow' })}
  `,
};

export const LargeNumber: Story = {
  render: args => html`
    ${renderBadge({ ...args, number: 256 })} ${renderBadge({ ...args, number: '+99' })}
  `,
};

export const Position: Story = {
  render: (_args, context) => html`
    ${chipMeta.render?.({ ...chipMeta.args, badge: true }, context)}

    <div class="position-relative d-inline">
      <post-icon name="2026" class="fs-large"></post-icon>
      <div class="badge badge-sm position-absolute top-0 start-100 translate-middle">3</div>
    </div>
  `,
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="d-flex gap-24 align-items-center">${story(args, context)}</div>
    `,
  ],
};
