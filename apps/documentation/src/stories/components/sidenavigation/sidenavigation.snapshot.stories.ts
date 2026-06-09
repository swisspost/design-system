import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

import meta, { DefaultNavContent, renderSidenav } from './sidenavigation.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PostSidenavigation: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(scheme => html`
      <div class="p-16">
        ${renderSidenav(DefaultNavContent, context.args, `${scheme}-${crypto.randomUUID()}`, `Navigation - ${scheme}`)}
      </div>
    `);
  },
};