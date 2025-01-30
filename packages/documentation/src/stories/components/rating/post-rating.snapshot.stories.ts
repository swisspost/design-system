import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './post-rating.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils/bomb-args';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Rating: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex gap-16 mb-16">
          <div class="w-half d-flex gap-4">readonly: false</div>
          <div class="w-half d-flex gap-4">readonly: true</div>
        </div>
        ${bombArgs({
          stars: [3, 5, 10],
          currentRating: [0, 1, 3, 5, 7, 10],
        })
          .filter((args: Args) => args.currentRating <= args.stars)
          .map(
            (args: Args) =>
              html`
                <div class="d-flex gap-16">
                  <div class="w-half">
                    ${meta.render?.({ ...context.args, ...args, readonly: false }, context)}
                  </div>
                  <div class="w-half">
                    ${meta.render?.({ ...context.args, ...args, readonly: true }, context)}
                  </div>
                </div>
              `,
          )}
      `,
    );
  },
};
