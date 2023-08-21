import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './tab.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostTabsElement>;

export const Tab: Story = {
  render: (_args: HTMLPostTabsElement, context: StoryContext<HTMLPostTabsElement>) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(bg => html`
          <div
            class="${bg} mt-3"
            style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;"
          >
            ${bombArgs({
              activePanel: [undefined, 'tria'],
            })
              .map((args: Args) =>
                meta.render?.(
                  { ...context.args, ...args },
                  context,
                )
              )}
          </div>
        `)}
      </div>
    `;
  },
};
