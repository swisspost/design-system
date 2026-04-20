import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

import meta from './footer.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostFooterElement>;

export const Footer: Story = {
  render: (args: Args, context: StoryContext<HTMLPostFooterElement>) => {
    return schemes(() => html` ${meta.render?.(args, context)} `, {
      // dark mode is not yet implemented corretly
      filter: scheme => scheme === 'light',
    });
  },
};
