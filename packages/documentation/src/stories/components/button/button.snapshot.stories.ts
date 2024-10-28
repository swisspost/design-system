import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, SignalColors } from './button.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Button: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-16 p-16">
              ${bombArgs({
                variant: context.argTypes.variant.options,
                size: context.argTypes.size.options,
                tag: context.argTypes.tag.options,
                disabled: [false, true],
                iconOnly: [false, true],
                icon: ['null', '2069'],
                iconPosition: context.argTypes.iconPosition.options,
              })
                .filter(
                  (args: Args) =>
                    !(
                      args.iconOnly === true &&
                      (args.icon === 'null' || args.iconPosition === 'end' || args.tag === 'input')
                    ),
                )
                .filter(args => !(args.icon === 'null' && args.iconPosition === 'end'))
                .filter(args => !(args.icon !== 'null' && args.tag === 'input'))
                .map((args: Args) => (args.tag === 'input' ? { ...args, type: 'button' } : args))
                .map((args: Args) =>
                  Default.render?.({ ...context.args, ...args, animated: false }, context),
                )}
              <div class="mt-32 w-100"></div>
              ${SignalColors.render?.({ ...context.args, ...SignalColors.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
