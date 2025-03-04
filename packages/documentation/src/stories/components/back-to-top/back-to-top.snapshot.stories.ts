import type { StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import meta from './back-to-top.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PostBackToTop: Story = {
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => {
      return schemes(() => html`${story(args, context)}`);
    },
  ],
};
