import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './tabs.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostTabsElement>;

export const Tabs: Story = {
  render: (_args: HTMLPostTabsElement, context: StoryContext<HTMLPostTabsElement>) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column gap-16 p-16 mt-16">
              ${bombArgs({
                activePanel: [undefined, 'tria'],
              }).map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
