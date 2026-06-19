import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import meta from './side-navigation.stories';
import { schemes } from '@/shared/snapshots/schemes';
import { defaultNav } from './side-navigation.examples';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj;

export const PostSideNavigation: Story = {
  render: () => {
    const snapshotId = crypto.randomUUID();
    let schemeIndex = 0;

    return schemes(() => {
      const navLabel = `Main navigation ${++schemeIndex}`;

      return html`
        <post-side-navigation-trigger for="${snapshotId}">
          <button>
            <span>Menu</span>
            <post-icon aria-hidden="true" name="burger"></post-icon>
          </button>
        </post-side-navigation-trigger>

        <post-side-navigation id="${snapshotId}" text-close="Close">
          <nav aria-label="${navLabel}">
            ${unsafeHTML(defaultNav)}
          </nav>
        </post-side-navigation>
      `;
    });
  },
};