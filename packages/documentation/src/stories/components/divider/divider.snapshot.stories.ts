import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './divider.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Divider: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-32 p-16">
          ${bombArgs({
            marginTop: context.argTypes.marginTop.options,
            marginBottom: context.argTypes.marginBottom.options,
          }).map((args: Args) => {
            return html`
              <div class="position-relative" style="width: 600px;">
                ${meta.render?.({ ...context.args, ...args }, context)}
              </div>
            `;
          })}
        </div>
      `,
    );
  },
};
