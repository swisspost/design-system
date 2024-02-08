import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './badge.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils';
import alertMeta from '../alert/standard-html/alert.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Badge: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-regular p-regular">
              ${bombArgs({
                text: [
                  'Malakceptebla Insigno',
                  'Contentus momentus vero siteos et accusam iretea et justo.',
                ],
                size: context.argTypes.size.options,
                interactionType: context.argTypes.interactionType.options,
                nestedBadge: [false, true],
                checked: [false, true],
                dismissed: [false],
              })
                .filter(args => !(args.interactionType !== 'checkable' && args.checked === true))
                .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
