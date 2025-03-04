import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './containers.stories';
import { html } from 'lit';
import { StoryFn } from '@storybook/web-components';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Containers: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`${['container', 'container-fluid'].map(containerClass =>
      meta.render({ containerClass }, context),
    )}`;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="container-snapshots">${story(context.args, context)}</div>
    `,
  ],
};
