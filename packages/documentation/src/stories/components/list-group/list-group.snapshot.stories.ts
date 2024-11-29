import type { Args, StoryObj } from '@storybook/web-components';
import meta, { renderListGroup } from './list-group.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ListGroup: Story = {
  render: () => {
    return html`
      ${['white', 'dark'].map(
        bg => html`
          <div class=${'list-group-example bg-' + bg} data-color-scheme=${bg}>
            ${bombArgs({
              listType: ['link', 'document', 'switch'],
              label: [
                'Label',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              ],
            }).map((args: Args) => {
              return renderListGroup(args);
            })}
          </div>
        `,
      )}
    `;
  },
};
