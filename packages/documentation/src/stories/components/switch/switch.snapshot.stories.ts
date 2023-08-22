import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './switch.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Switch: Story = {
  render: (_args: Args, context: StoryContext) => {
    const templateVariants = bombArgs({
      labelPosition: ['both', 'before', 'after'],
      labelBefore: ['Off', 'this is longer text'],
      labelAfter: ['On', 'this is longer text'],
      hiddenLabel: [false],
      checked: [false, true],
      disabled: [false, true],
      validation: ['null', 'is-valid', 'is-invalid'],
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
