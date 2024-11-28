import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import meta from './float.stories';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Float: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="snapshot-example">
          <h1>Snapshot with Float</h1>

          ${(meta.argTypes?.floatBreakPoint?.options ?? []).map((breakpoint: string) => {
            return html`
              <h2>Breakpoint ${breakpoint}</h2>
              <div>
                ${bombArgs({
                  floatPosition: [...(meta.argTypes?.floatPosition?.options ?? [])],
                  floatBreakPoint: [breakpoint],
                }).map((args: Args) => {
                  return html`
                    <div class="clearfix">
                      ${meta.render?.({ ...context.args, ...args, breakpoint }, context)}
                    </div>
                  `;
                })}
              </div>
            `;
          })}
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
