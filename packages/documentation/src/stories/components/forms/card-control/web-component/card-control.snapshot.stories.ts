import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './card-control.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostCardControlElement>;

export const PostCardControl: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostCardControlElement>) => {
    return html`
      <div id="Snapshots">
        <h1 class="h4">CardControl</h1>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg}">
              ${context.argTypes.type.options.map(
                (type: string) => html`
                  <div class="d-flex flex-column gap-16 p-16 mt-16">
                    <h2 class="h5">type: ${type}</h2>
                    ${bombArgs({
                      icon: ['1001'],
                      validity: ['null', true, false],
                      disabled: [false, true],
                      checked: [false, true],
                      type: [type],
                      label: ['Label'],
                    }).map((args: Args) => {
                      const description = Object.entries(args)
                        .filter(([key]) => !['label', 'type', 'icon'].includes(key))
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');

                      return Default.render?.({ ...context.args, ...args, description }, context);
                    })}
                  </div>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
