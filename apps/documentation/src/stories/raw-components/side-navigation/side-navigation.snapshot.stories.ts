import type { StoryObj } from '@storybook/web-components-vite';
import meta, { renderSideNavigation } from './side-navigation.stories';
import { html } from 'lit';
import {
  linkOnly,
  nested,
  collapsibleNotLinked,
  collapsibleLinked,
  activeItem,
} from './side-navigation.examples';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

const args = { textClose: 'Close', showIcons: false };

let schemeIndex = 0;

export const PostSideNavigation: Story = {
  render: () => {
    schemeIndex = 0;
    return schemes(() => {
      const base = ++schemeIndex * 10;
      return html`
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 1rem;">
          <div>${renderSideNavigation(linkOnly, args, undefined, `Link Only Navigation ${base}`)}</div>
          <div>${renderSideNavigation(nested, args, undefined, `Nested Navigation ${base + 1}`)}</div>
          <div>${renderSideNavigation(collapsibleNotLinked, args, undefined, `Collapsible Navigation ${base + 2}`)}</div>
          <div>${renderSideNavigation(collapsibleLinked, args, undefined, `Collapsible Linked Navigation ${base + 3}`)}</div>
          <div>${renderSideNavigation(activeItem, args, undefined, `Active Item Navigation ${base + 4}`)}</div>
        </div>
      `;
    });
  },
};