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
      ${['white', 'dark'].map(
        bg => html`
          <div class=${'list-group-example bg-' + bg}>
            ${renderListGroup({ listType: 'link' })} ${renderListGroup({ listType: 'document' })}
            ${renderListGroup({ listType: 'switch' })}
          </div>
        `,
      )}
    `;
  },
};
