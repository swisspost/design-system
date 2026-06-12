import type { StoryObj } from '@storybook/web-components-vite';
import meta, { renderSidenavigation } from './sidenavigation.stories';
import { html } from 'lit';
import {
  linkOnly,
  nested,
  collapsibleNotLinked,
  collapsibleLinked,
} from './sidenavigation.examples';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PostSidenavigation: Story = {
  render: () => {
    return schemes(() => html`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 1rem;">
        <div>
          <h3>Link Only</h3>
          ${renderSidenavigation(linkOnly, { textClose: 'Close' })}
        </div>
        <div>
          <h3>Nested</h3>
          ${renderSidenavigation(nested, { textClose: 'Close' })}
        </div>
        <div>
          <h3>Collapsible Not Linked</h3>
          ${renderSidenavigation(collapsibleNotLinked, { textClose: 'Close' })}
        </div>
        <div>
          <h3>Collapsible Linked</h3>
          ${renderSidenavigation(collapsibleLinked, { textClose: 'Close' })}
        </div>
      </div>
    `);
  },
};