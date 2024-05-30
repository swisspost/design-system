import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './toast.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Toast: Story = {
  render: (_args: Args, context: StoryContext) => {
    const shortText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
    const longText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia. Sequi excepturi quia voluptate nesciunt cum veritatis? Quas molestias nostrum temporibus saepe porro facilis tempora natus non modi fugiat, vitae facere quos placeat maiores incidunt illo itaque sequi dolore! Temporibus recusandae, veritatis eos vitae optio porro magni rem culpa enim provident sed. Libero blanditiis delectus voluptatibus, temporibus alias laudantium ad tempora iure, sunt minima maiores qui ut? Aliquam quis obcaecati id, officiis accusamus voluptas rerum magnam, est a culpa voluptatum tenetur ab, asperiores vel dolor ipsum alias tempore sint aliquid? Eum architecto laboriosam dolor inventore deleniti? Repellat perferendis ratione dolorem, amet deleniti minima repudiandae eos iure maiores, dicta sequi architecto ipsa sit ab laudantium praesentium maxime asperiores molestiae ad nulla ullam est saepe vero. Qui ratione vero dicta nisi molestiae rem consectetur, natus ipsam facilis repellendus animi ullam debitis temporibus sapiente quam.';
    return html`
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-regular p-regular">
              ${bombArgs({
                title: ['Title', shortText],
                content: [shortText, longText],
                variant: context.argTypes.variant.options,
                noIcon: [false, true],
                dismissible: [false, true],
              })
                .filter(
                  (args: Args) =>
                    (args.title === 'Title' && args.content === shortText) ||
                    (args.title === shortText && args.content === longText),
                )
                .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
