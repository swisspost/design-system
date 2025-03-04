import meta, { Default } from './dialog.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Dialog: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <style>
          dialog {
            position: static;
            margin: 0;
            transition: none !important;
          }
        </style>
        <div class="d-flex flex-wrap align-items-start gap-16">
          ${bombArgs({
            palette: ['palette-default', 'palette-accent', 'palette-alternate', 'palette-brand'],
            size: context.argTypes.size.options,
            icon: ['none', '1034'],
            closeButton: [true, false],
            content: [
              'Content',
              'Contentus momentus vero siteos et accusam iretea et justo. Contentus momentus vero siteos et accusam iretea et justo.',
            ],
            open: [true],
          }).map((args: Args) => Default.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    );
  },
};
