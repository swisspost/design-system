import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './slider.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Slider: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap align-items-start gap-16">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex  flex-wrap align-items-start flex-column gap-16 p-16"
              data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
            >
              ${[
                ...bombArgs({
                  label: [
                    'Label',
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
                  ],
                  disabled: [false, true],
                  validation: context.argTypes.validation.options,
                  showValue: context.argTypes.showValue.options,
                })
                  //makes sure only one of those 3 Properties has a non default value
                  .filter(
                    (args: Args) =>
                      (!args.disabled || args.validation === 'null') &&
                      (!args.disabled || args.showValue === 'none') &&
                      (args.validation === 'null' || args.showValue === 'none'),
                  )
                  // makes sure only one label with long text
                  .filter(
                    (args: Args) =>
                      (args.validation === 'null' && args.showValue === 'none' && !args.disabled) ||
                      args.label !==
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
                  ),
                ...bombArgs({
                  hiddenLabel: [true],
                }),
              ].map((args: Args) => {
                context.id = `${bg}-${crypto.randomUUID()}`;
                return meta.render?.({ ...context.args, ...args }, context);
              })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
