import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './icon.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostIconElement>;

export const Icon: Story = {
  render: (_args: HTMLPostIconElement, context: StoryContext<HTMLPostIconElement>) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16">${meta.render?.({ ...context.args }, context)}</div>
      `,
    );
  },
};
