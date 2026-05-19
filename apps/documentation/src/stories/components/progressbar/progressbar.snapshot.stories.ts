import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import meta from './progressbar.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Progressbar: Story = {
  render: (_args: Args, context: StoryContext) => {
    const combinations = bombArgs({
      state: ['neutral', 'success', 'error', 'warning'],
      hiddenLabel: [false, true],
      showValue: [true, false],
      ariaValueText: ['', '11 of 17'],
    }).filter((args: Args) => {
      // Hidden label implies no visible value
      if (args.hiddenLabel && args.showValue) return false;
      return true;
    });

    return schemes(
      () => html`
        <div class="d-flex flex-wrap gap-32 p-16">
          ${combinations.map((args: Args) => {
            const statusMessage = args.state !== 'neutral' ? 'Status message' : '';
            const combinedArgs = {
              ...context.args,
              ...args,
              label: 'Loading packages',
              value: 11,
              max: 17,
              min: 0,
              labelIcon: args.state === 'neutral' ? 'import' : '',
              helperMessage: 'Filename and type',
              statusMessage,
            };
            return html`
              <div style="min-width: 280px; max-width: 360px; flex: 1 1 280px;">
                <p class="h6 mb-8">
                  ${args.state} / ${args.hiddenLabel ? 'hidden label' : 'visible label'} /
                  ${args.showValue ? 'with value' : 'no value'} /
                  ${args.ariaValueText ? 'custom value text' : 'percentage'}
                </p>
                ${meta.render?.(combinedArgs, context)}
              </div>
            `;
          })}
        </div>
      `,
    );
  },
};
