import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import meta from './palettes.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Palette: Story = {
  render: (_args: Args, context: StoryContext) => {
    const paletteOptions = meta.argTypes?.palette?.options;

    return html`
      ${paletteOptions?.map(palette => (meta.render ? meta.render({ palette }, context) : null))}
    `;
  },
};
