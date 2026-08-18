import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './date-picker.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const DatePicker: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="row">
          <h1>Date Picker</h1>
          ${bombArgs({
            inline: [true, false],
            range: [true, false],
          }).map((args: Args) => {
            return html`
              <div class="col-md-6 mb-32">
                <h2 class="h4">
                  ${args.range ? 'Range' : 'Simple'} ${args.inline ? 'inline' : 'input'} datepicker
                </h2>
                ${meta.render?.({ ...context.args, ...args }, context)}
              </div>
            `;
          })}
        </div>
      `,
    );
  },
};
