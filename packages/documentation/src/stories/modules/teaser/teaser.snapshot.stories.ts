import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

import meta from './teaser.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Teaser: Story = {
  render: (args: Args, context: StoryContext) => {
    return schemes(() => html` ${meta.render?.(args, context)} `);
  },
};
