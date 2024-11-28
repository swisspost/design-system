import type { StoryObj } from '@storybook/web-components';
import meta, { renderBadge } from './app-store-badge.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const AppStoreBadge: Story = {
  render: () => {
    return schemes(
      scheme => html`
        ${scheme === 'light'
          ? renderBadge('apple-store')
          : html`
              <a class="app-store-badge" href="#">
                <img
                  src="/assets/images/apple-store-badge-white.svg"
                  alt="Apple App Store badge (white)"
                />
                <span class="visually-hidden">Download the App on the Apple Store</span>
              </a>
            `}
        ${renderBadge('google-play')}
      `,
    );
  },
};
