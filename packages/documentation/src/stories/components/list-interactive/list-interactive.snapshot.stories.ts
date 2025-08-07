import type { Args, StoryObj } from '@storybook/web-components-vite';
import meta, { renderListGroup } from './list-interactive.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ListInteractive: Story = {
  render: () => {
    return schemes(
      () => html`
        <div class="list-interactive-example">
          ${bombArgs({
            listType: ['link', 'document', 'switch'],
            label: [
              'Label',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            ],
          }).map((args: Args) => renderListGroup(args))}
        </div>
      `,
    );
  },
};
