import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
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
    return schemes((scheme: string) => {
      const formControlId = `example-id-${scheme}`;
      return html` ${renderHint({ ..._args }, context, formControlId)}`;
    });
  },
};
