import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './menu-button.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostMenuElement>;

export const MenuButtonSnapshots: Story = {
  render: (_args: Partial<HTMLPostMenuElement>, context: StoryContext<HTMLPostMenuElement>) => {
    const placements = [
      'bottom', 'bottom-end', 'bottom-start',
      'left', 'left-start', 'left-end',
      'right', 'right-start', 'right-end',
      'top', 'top-start', 'top-end'
    ];

    return html`
      <div class="d-flex flex-wrap gap-16 align-items-start">
        ${placements.map(
          placement => html`
              <p>Placement: ${placement}</p>
              <div>
                ${meta.render?.(
                  { ...context.args, placement, id: `menu-${placement}` },
                  context,
                )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
