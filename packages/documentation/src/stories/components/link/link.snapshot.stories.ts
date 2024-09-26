import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './link.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Link: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column gap-regular p-regular mt-regular">
              ${bombArgs({
                text: ['Link Text', 'Lorem ipsum dolor sit amet consectetur'],
                href: ['https://example.com', 'https://imgur.com/FKmX7dt'],
              }).map((args: Args) =>
                Default.render?.(
                  { ...context.args, ...args, text: `${args.text}`, href: `${args.href}` },
                  context,
                ),
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
