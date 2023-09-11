import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './radio.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Radio: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex gap-3 flex-column p-3">
              ${[
                ...bombArgs({
                  label: [
                    'Label',
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
                  ],
                  checked: [false, true],
                  disabled: [false, true],
                  validation: context.argTypes.validation.options,
                }),
                ...bombArgs({
                  hiddenLabel: [true],
                  disabled: [false, true],
                  validation: context.argTypes.validation.options,
                }),
              ]
                // remove disabled & validated examples
                .filter((args: Args) => !(args.disabled && args.validation !== 'null'))
                .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
