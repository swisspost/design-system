import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta, { PointerEvents, UserSelect } from './interactions.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Interactions: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="snapshot-example">
          <h1>Snapshot with Interactions</h1>

          <h2>Pointer events</h2>
          <div class="d-flex flex-column">
            ${PointerEvents.render?.({ ...context.args }, context)}
          </div>

          <h2>User select</h2>
          <div class="d-flex flex-column">${UserSelect.render?.({ ...context.args }, context)}</div>
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
