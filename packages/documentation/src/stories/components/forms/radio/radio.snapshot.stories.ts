import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './radio.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Radio: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${[
          { bg: 'bg-white', scheme: 'light' },
          { bg: 'bg-dark', scheme: 'dark' },
        ].map(
          ({ bg, scheme }) => html`
            <div data-color-scheme="${scheme}" class="${bg} d-flex gap-16 flex-column p-16">
              ${[
                ...bombArgs({
                  label: [
                    'Label',
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
                  ],
                  checked: [false, true],
                  disabled: [false, true],
                  size: ['null', 'form-check-sm'],
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
                .map((args: Args) => {
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
