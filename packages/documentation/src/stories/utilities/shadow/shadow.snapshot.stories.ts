import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import meta from './shadow.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Shadow: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex gap-32 flex-column">
          ${(context.argTypes.shadow.options as string[]).map(shadow =>
            meta.render?.({ ...meta.args, shadow }, context),
          )}
        </div>
      `,
    );
  },
};
