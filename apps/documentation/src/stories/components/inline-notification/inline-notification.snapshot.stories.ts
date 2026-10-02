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
        <h1>Inline notifications</h1>
        <div class="d-flex flex-column gap-16 mb-16">
          ${bombArgs({
            variant: context.argTypes.variant.options,
            title: ['', 'Title', 'A longer notification title to show more informations'],
            message: [
              'Message',
              'A longer notification message to communicate information which needs higher attention than regular text.',
            ],
            multiline: [false, true],
          })
            .filter(args => !(args.multiline === true && args.title === ''))
            .map((args: Args) => meta.render?.({ ...args }, context))}
        </div>
      `,
    );
  },
};
