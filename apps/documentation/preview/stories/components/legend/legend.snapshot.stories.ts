import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import meta from './legend.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

export const Legend: StoryObj = {
  render: (args: Args, context: StoryContext) =>
    schemes(
      () => html` ${['default', 'large'].map(size => meta.render?.({ ...args, size }, context))} `,
    ),
};
