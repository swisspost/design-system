import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './tabs.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostTabsElement>;

export const Tabs: Story = {
  render: (_args: HTMLPostTabsElement, context: StoryContext<HTMLPostTabsElement>) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16">
          ${bombArgs({
            activePanel: [undefined, 'tria'],
          }).map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    );
  },
};
