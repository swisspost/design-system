import type { StoryObj } from '@storybook/web-components';
import meta, { Default } from './card.stories';

export default {
  ...meta,
  title: 'Hidden/demos/components/Card',
};

type Story = StoryObj;

export const BackgroundImage: Story = {
  ...Default,
  parameters: {
    controls: {
      include: [],
    },
  },
  args: {
    showImage: false,
    customBody: `<img class="card-img" src="https://picsum.photos/id/20/300/200" alt="Card image" />
  <div class="card-img-overlay">
    <div class="card-body">
      <h5 class="card-title">Titulum</h5>

      <p class="card-text">Contentus momentus vero siteos et accusam iretea et justo.</p>

      <button class="btn btn-primary btn-animated">
        <span>Butonon teksto</span>
      </button>
    </div>
  </div>`
  }
}
