import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';

const meta: Meta = {
  id: '43481535-5b39-40b5-a273-478b07dc3b31',
  title: 'Brand Identity/Palettes',
  tags: ['package:HTML'],
  render: renderPalette,
  parameters: {
    palettes: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18172-73431&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    palette: 'default',
  },
  argTypes: {
    palette: {
      name: 'Palette',
      description: 'The set of colors used for a section of the page.',
      control: {
        type: 'radio',
        labels: {
          default: 'Default',
          alternate: 'Alternate',
          brand: 'Brand',
          accent: 'Accent',
        },
      },
      options: ['default', 'alternate', 'accent', 'brand'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// RENDERER
function renderPalette(args: Args) {
  return html`
    <div class="palette-${args.palette} p-24" data-color-scheme=${args.colorScheme ?? nothing}>
      <h2 class="palette-text">
        I use a specific color from the palette (it might be the same as the body color).
      </h2>
      <p>I use the main body color.</p>
      <button class="btn btn-primary">Primary button</button>
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};
