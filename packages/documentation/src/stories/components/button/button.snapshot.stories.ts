import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './button.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Button: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-wrap align-items-start gap-16">
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
        </div>
      `,
    );
  },
};
