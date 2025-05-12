import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { renderHint } from './hint.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Hint: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(() => html` ${renderHint({ ..._args }, context)} `);
  },
};
