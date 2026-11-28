import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './card.stories';
import { html } from 'lit';
import { schemes } from '@preview/utils/snapshots/schemes';
import { bombArgs } from '@preview/utils/bomb-args';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Card: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="row">
          ${bombArgs({
            interactive: [false, true],
            hiddenLink: [true, false],
            action: ['none', 'link', 'buttons'],
          })
            .filter(args => !(args.interactive && args.action !== 'link'))
            .filter(args => !(!args.interactive && args.hiddenLink))
            .map(
              args => html`
                <div class="col-6 col-md-4 p-16">
                  ${meta.render && meta.render({ ...meta.args, ...args }, context)}
                </div>
              `,
            )}
        </div>
      `,
    );
  },
};
