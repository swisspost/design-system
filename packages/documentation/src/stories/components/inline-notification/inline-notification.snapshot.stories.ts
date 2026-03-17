import { Args, StoryObj, StoryContext } from '@storybook/web-components-vite';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import meta from './inline-notification.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const InlineNotification: Story = {
  render: (args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 mb-32">
          ${['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((headingLevel: string) =>
            meta.render?.(
              {
                ...args,
                variant: 'info',
                layout: 'multi-line',
                headingLevel,
                title: `Title with ${headingLevel}`,
                message: 'The title should have the same size regardless of the heading tag.',
              },
              context,
            ),
          )}
        </div>

        ${bombArgs({
          variant: context.argTypes.variant.options,
          hasTitle: [false, true],
        }).map(
          (bombedArgs: Args) =>
            html`<div class="mb-16">
              ${meta.render?.(
                {
                  ...args,
                  variant: bombedArgs.variant,
                  title: bombedArgs.hasTitle ? 'Notification Title' : '',
                  message: 'This is a notification message.',
                },
                context,
              )}
            </div>`,
        )}
      `,
    );
  },
};
