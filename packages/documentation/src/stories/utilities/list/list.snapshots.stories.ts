import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './list.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const OrderedList: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex">
              <ol>
                ${bombArgs({
                  text: ['This is an ordered list', 'This is an ordered list'],
                  size: context.argTypes.size.options,
                })
                  .filter(args => !(args.type !== 'filter' && args.active === true))
                  .filter(args => !(args.type !== 'filter' && args.badge === true))
                  .map(
                    (args: Args) => html`
                      <li>${meta.render?.({ ...context.args, ...args }, context)}</li>
                    `,
                  )}
              </ol>
            </div>
          `,
        )}
      </div>
    `;
  },
};
