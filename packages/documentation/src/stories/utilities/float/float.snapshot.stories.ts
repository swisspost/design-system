import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { Float as F } from './float.stories';
import './float.styles.scss';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

console.log(F.argTypes?.floatPosition?.options);
export const Float: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="float-example">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} p-16">
              ${(F.argTypes?.floatBreakPoint?.options ?? []).map((breakpoint: string) => {
                return html`
                  <h2>Breakpoint ${breakpoint}</h2>
                  <div>
                    ${bombArgs({
                      floatPosition: [...(F.argTypes?.floatPosition?.options ?? [])],
                    }).map((args: Args) => F.render?.({ ...context.args, ...args }, context))}
                  </div>
                `;
              })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
