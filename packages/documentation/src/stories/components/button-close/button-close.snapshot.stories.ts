import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './button-close.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostClosebuttonElement>;

export const PostClosebutton: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostClosebuttonElement>) => {
    return schemes(() => html` ${Default.render?.({ ...context.args }, context)} `);
  },
};
