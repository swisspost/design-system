import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './heading.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Heading: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16">
          ${bombArgs({
            title: [
              'Lorem ipsum dolor sit',
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, libero. Dolore possimus ut atque quaerat nobis iusto vero, reiciendis sapiente',
            ],
            level: context.argTypes.level.options,
            showSubtitle: [false, true],
            subtitle: [
              'Lorem ipsum dolor sit amet',
              'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veniam inventore nulla saepe veritatis ut',
            ],
          })
            .filter((args: Args) => !(!args.showSubtitle && args.subtitle.length > 30))
            .map((args: Args) =>
              Default.render?.(
                { ...context.args, ...args, title: `${args.level} - ${args.title}` },
                context,
              ),
            )}
        </div>
      `,
    );
  },
};
