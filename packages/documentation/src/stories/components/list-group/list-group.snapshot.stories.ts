import type { StoryObj } from '@storybook/web-components';
import meta, { renderListGroup } from './list-group.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ListGroup: Story = {
  render: () => {
    return html`
      <div class="bg-white list-group-example">
        ${renderListGroup({ listType: 'links' })} ${renderListGroup({ listType: 'documents' })}
        ${renderListGroup({ listType: 'switch' })}
      </div>
    `;
  },
};
