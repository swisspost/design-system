import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './subnavigation.stories';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Subnavigation: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class=" d-flex gap-16 flex-column">
          ${bombArgs({
            palette: ['palette-default', 'palette-accent', 'palette-alternate', 'palette-brand'],
            badges: [false, true],
            itemCount: [2, 5],
          })
            .filter(args => !(args.itemCount !== 5 && args.badges === true))
            .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
      {
        filter: scheme => scheme === COLOR_SCHEMES.light,
      },
    );
  },
};
