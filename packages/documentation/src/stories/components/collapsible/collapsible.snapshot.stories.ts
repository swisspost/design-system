import { html } from 'lit';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { bombArgs } from '@/utils';

import meta, { Default } from './collapsible.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  decorators: [],
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCollapsibleElement>;

export const Collapsible: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCollapsibleElement>) => {
    const templateVariants = bombArgs({
      collapsed: [false, true],
    }).map((args: Args) => {
      return html`
        <div class="col-6 p-3">
          <p>collapsed: ${args.collapsed}</p>
          ${meta.render?.({ ...context.args, ...Default.args, ...args }, context)}
        </div>
      `;
    });

    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html` <div class=${'row bg-' + bg}>${templateVariants}</div> `,
        )}
      </div>
    `;
  },
};
