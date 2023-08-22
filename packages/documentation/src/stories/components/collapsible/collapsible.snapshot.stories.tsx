import { html } from 'lit';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { bombArgs } from '../../../utils/bombArgs';

import meta, { Default } from './collapsible.stories';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCollapsibleElement>;

export const collapsible: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCollapsibleElement>) => {
    const templateVariants = bombArgs({
      innerHTML: [
        `<span slot="header">Titulum</span><p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
        `<p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
      ],
      collapsed: [false, true],
      headingLevel: [1, 2, 3, 4, 5, 6],
    }).map((args: Args) => {
      return html`
        <div class="col-6 p-3">
          ${meta.render?.({ ...context.args, ...Default.args, ...args }, context)}
        </div>
      `;
    });

    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div class=${'row bg-' + bg}>${templateVariants}</div>
          `,
        )}
      </div>
    `;
  },
};
