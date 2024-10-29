import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './palette.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Palette: Story = {
  render: () => {
    return html`${['light', 'dark'].map(
      scheme => html`
        <div class="palette-default p-24" data-color-scheme=${scheme}>
          ${meta.argTypes.palette.options.map(palette => meta.render({ palette }))}
        </div>
      `,
    )}`;
  },
};
