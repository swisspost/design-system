import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './post-rating.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bomb-args';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PostRating: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap align-items-start gap-regular">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex  flex-wrap align-items-start flex-column gap-regular p-regular"
            >
              ${[
                //variants for max 3
                ...bombArgs({
                  max: [3, 5, 10, 25],
                  disabled: [false, true],
                  readonly: [false, true],
                  currentRating: [0, 1, 3, 5, 10, 25],
                })
                  //make sure currentRating is not set higher than the max
                  .filter(
                    (args: Args) =>
                      !(
                        args.max === 3 &&
                        (args.currentRating === 5 ||
                          args.currentRating === 10 ||
                          args.currentRating === 25)
                      ) &&
                      !(
                        args.max === 5 &&
                        (args.currentRating === 1 ||
                          args.currentRating === 10 ||
                          args.currentRating === 25)
                      ) &&
                      !(
                        args.max === 10 &&
                        (args.currentRating === 1 ||
                          args.currentRating === 3 ||
                          args.currentRating === 25)
                      ) &&
                      !(
                        args.max === 25 &&
                        (args.currentRating === 1 ||
                          args.currentRating === 3 ||
                          args.currentRating === 5)
                      ),
                  )
                  //make sure if disabled is true, readonly is only false
                  .filter((args: Args) => !(args.disabled === true && args.readonly === true)),
              ].map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
