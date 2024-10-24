import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  id: '43481535-5b39-40b5-a273-478b07dc3b31',
  title: 'Utilities/Accent',
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
    accent: 'Default',
  },
  argTypes: {
    accent: {
      name: 'Accent',
      description: 'The accent variant.',
      control: {
        type: 'radio',
        labels: {
          default: 'Default',
          alternate: 'Alternate',
          brand: 'Brand',
          emphasis: 'Emphasis',
        },
      },
      options: ['default', 'alternate', 'brand', 'emphasis'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// RENDERER
function renderAccent(args: Args) {
  return html`
    <div class="accent-${args.accent} p-24">
      <p>I use the body color.</p>
      <p style="accent-text">
        I use a text color specific to the accent (which can be the same as the body color depending
        on the theme).
      </p>
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};
