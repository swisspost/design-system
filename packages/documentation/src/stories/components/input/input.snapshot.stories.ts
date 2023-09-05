import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './input.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Input: Story = {
  render: (_args: Args, context: StoryContext) => {
    const shortText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.';
    const longText =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia. Sequi excepturi quia voluptate nesciunt cum veritatis? Quas molestias nostrum temporibus saepe porro facilis tempora natus non modi fugiat, vitae facere quos placeat maiores incidunt illo itaque sequi dolore! Temporibus recusandae, veritatis eos vitae optio porro magni rem culpa enim provident sed. Libero blanditiis delectus voluptatibus, temporibus alias laudantium ad tempora iure, sunt minima maiores qui ut? Aliquam quis obcaecati id, officiis accusamus voluptas rerum magnam, est a culpa voluptatum tenetur ab, asperiores vel dolor ipsum alias tempore sint aliquid? Eum architecto laboriosam dolor inventore deleniti? Repellat perferendis ratione dolorem, amet deleniti minima repudiandae eos iure maiores, dicta sequi architecto ipsa sit ab laudantium praesentium maxime asperiores molestiae ad nulla ullam est saepe vero. Qui ratione vero dicta nisi molestiae rem consectetur, natus ipsam facilis repellendus animi ullam debitis temporibus sapiente quam.';

    return html`
      <div class="d-flex flex-wrap align-items-start gap-regular">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex gap-3 flex-column p-3">
              ${[
                ...bombArgs({
                  label: [shortText, longText],
                  hint: [shortText, longText],
                  floatingLabel: [false, true],
                  hiddenLabel: [false, true],
                })
                  .filter(
                    (args: Args) =>
                      !args.hiddenLabel ||
                      (args.label === shortText && !args.floatingLabel && !args.disabled),
                  )
                  .filter((args: Args) => args.label == args.hint),
                ...bombArgs({
                  type: ['text', 'date', 'datetime-local', 'month', 'week', 'time', 'color'],
                  validation: context.argTypes.validation.options,
                  size: context.argTypes.size.options,
                  disabled: [false, true],
                })
                  .filter(
                    (args: Args) =>
                      !args.disabled || (args.size === 'null' && args.validation === 'null'),
                  )
                  .filter(
                    (args: Args) =>
                      (args.validation === 'null' || args.size === 'null') &&
                      (args.type === 'text' || args.size === 'null') &&
                      (args.validation === 'null' || args.type === 'text'),
                  ),
              ].map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
