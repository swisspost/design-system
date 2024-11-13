import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './button-group.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ButtonGroup: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-16 p-16">
              ${bombArgs({
                size: context.argTypes.size.options,
                element: context.argTypes.element.options,
                checked: context.argTypes.checked.options,
              }).map((args: Args) => {
                // Substitue checked with selected when element is checkbox
                if (args.element === 'checkbox') {
                  args.selected = [args.checked];
                  delete args.checked;
                }

                const contextName = Object.values({ bg, ...args })
                  .map(val => val.toString().trim())
                  .join('_');

                return meta.render?.(
                  { ...context.args, ...args },
                  { ...context, name: contextName },
                );
              })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
