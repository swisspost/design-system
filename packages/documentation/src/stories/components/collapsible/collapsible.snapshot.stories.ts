import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { bombArgs } from '@/utils';

import meta from './collapsible.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCollapsibleElement>;

export const Collapsible: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCollapsibleElement>) => {
    return schemes(
      scheme => html`
        <div class="row">
          ${bombArgs({
            collapsed: [false, true],
          }).map(
            (args: Args, i: number) => html`
              <div class="col-6 p-16 d-flex flex-column gap-16">
                <p class="m-0">collapsed: ${args.collapsed}</p>
                ${meta.render?.(
                  { ...context.args, ...args },
                  { ...context, id: `${context.id}-${scheme}-${i}` },
                )}
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};
