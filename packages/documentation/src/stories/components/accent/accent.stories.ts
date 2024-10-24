import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  id: '43481535-5b39-40b5-a273-478b07dc3b31',
  title: 'Components/Accent',
  tags: ['package:HTML'],
  render: renderAccent,
  parameters: {
    accents: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18172-73431&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    accent: 'default',
  },
  argTypes: {
    accent: {
      name: 'Accent',
      description: 'The accent variant.',
      control: {
        type: 'radio',
      },
      options: ['default', 'alternate', 'brand', 'emphasis'],
      table: {
        category: 'Generaly',
      },
    },
  },
};

export default meta;

// RENDERER
function renderAccent(args: Args) {
  return html`
    <div class="accent-${args.accent} p-24">
      <p style="color: var(--post-accent-fg)">I use the accent foreground color.</p>
      <p>I use the body color.</p>
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};
