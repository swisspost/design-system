import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './card-control.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCardControlElement>;

export const PostCardControl: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCardControlElement>) => {
    return schemes(
      () => html`
        ${context.argTypes.type.options?.map(
          (type: string) => html`
            <div class="d-flex flex-column gap-16 mt-32">
              <h2 class="h5">type: ${type}</h2>
              ${bombArgs({
                icon: ['1001'],
                validity: ['null', true, false],
                disabled: [false, true],
                checked: [false, true],
                type: [type],
                label: ['Label'],
              }).map((args: Args) => {
                const description = Object.entries(args)
                  .filter(([key]) => !['label', 'type', 'icon'].includes(key))
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ');

                return Default.render?.({ ...context.args, ...args, description }, context);
              })}
            </div>
          `,
        )}
      `,
    );
  },
};
