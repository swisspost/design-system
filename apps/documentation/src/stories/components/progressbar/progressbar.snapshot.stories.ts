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
    const state = ['success', 'error', 'warning'];
    const combinations = bombArgs({
      hiddenLabel: [false, true],
      showValue: [true, false],
      valueText: ['', '11 of 17'],
    }).filter((args: Args) => {
      // Hidden label implies no visible value
      if (args.hiddenLabel && args.showValue) return false;
      if (!args.showValue && args.valueText !== '') return false;
      return true;
    });

    return schemes(
      () => html`
        <div class="d-flex flex-column gap-32 p-32">
          <div class="row row-cols-4 align-items-end">
            ${combinations.map(
              (args: Args) => html`
                <div class="col">${meta.render?.({ ...context.args, ...args }, context)}</div>
              `,
            )}
          </div>
          <div class="row row-cols-4 align-items-end">
            ${state.map(state => {
              const statusMessage = 'Status message';
              return html`<div class="col">
                ${meta.render?.({ ...context.args, state, statusMessage }, context)}
              </div>`;
            })}
          </div>
        </div>
      `,
    );
  },
};
