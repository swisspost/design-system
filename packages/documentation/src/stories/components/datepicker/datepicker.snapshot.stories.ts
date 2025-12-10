import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './datepicker.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Datepicker: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 p-16">
          ${meta.render?.({ ...context.args}, context)}
        </div>
      `,
    );
  },
};
