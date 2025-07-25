import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './tabs.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<HTMLPostTabsElement>;

export const Tabs: Story = {
  render: (_args: HTMLPostTabsElement, context: StoryContext<HTMLPostTabsElement>) => {
    return schemes(
      () => html`
          ${['container', 'container-fluid', ''].map(
            containerClass => html`
              <div class="${containerClass}">
                ${bombArgs({
                  activePanel: [undefined, 'third'],
                  fullWidth: [false, true],
                })
                  .filter(args => !(containerClass === '' && args.fullWidth === true))
                  .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
              </div>
            `,
          )}
        </div>
      `,
      {
        // dark mode is not yet designed/implemented
        filter: scheme => scheme === 'light',
      },
    );
  },
};
