import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './radio.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Radio: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      scheme => html`
        <div class="d-flex gap-16 flex-column">
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
              requiredOptional: ['null', 'required', 'optional'],
            }),
            ...bombArgs({
              hiddenLabel: [true],
              disabled: [false, true],
              validation: context.argTypes.validation.options,
              requiredOptional: ['null', 'required', 'optional'],
            }),
          ]
            // remove disabled & validated examples
            .filter(
              (args: Args) =>
                !(args.disabled && args.validation !== 'null') &&
                !(args.requiredOptional === 'required' && args.disabled === true),
            )
            .map((args: Args) => {
              context.id = `${scheme}-${crypto.randomUUID()}`;
              return meta.render?.({ ...context.args, ...args }, context);
            })}
        </div>
      `,
    );
  },
};
