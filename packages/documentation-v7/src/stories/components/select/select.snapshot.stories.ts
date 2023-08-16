import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, FloatingLabel, Size, Validation } from './select.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Select: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg}"
              style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: start; padding: 1rem;"
            >
              ${bombArgs({
                size: context.argTypes.size.options,
                validation: context.argTypes.validation.options,
                floatingLabel: [false, true],
                multiple: [false, true],
                disabled: [false, true],
              }).map((args: Args) =>
                Default.render?.({ ...context.args, ...args, animated: false }, context),
              )}
              <div class="mt-big w-100"></div>
              ${FloatingLabel.render?.({ ...context.args, ...FloatingLabel.args }, context)}
              <div class="mt-big w-100"></div>
              ${Size.render?.({ ...context.args, ...Size.args }, context)}
              <div class="mt-big w-100"></div>
              ${Validation.render?.({ ...context.args, ...Validation.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
