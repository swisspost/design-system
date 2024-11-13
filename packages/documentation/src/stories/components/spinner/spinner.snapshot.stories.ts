import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './spinner.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Spinner: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap align-items-start gap-16">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-16 p-16">
              ${bombArgs({
                size: context.argTypes.size.options,
              }).map((args: Args) => {
                return html`<div class="position-relative" style="width: 100px;height: 100px;">
                  ${meta.render?.({ ...context.args, ...args }, context)}
                </div>`;
              })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
