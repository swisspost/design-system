import type { StoryObj } from '@storybook/web-components';
import meta, { renderBadge } from './app-store-badge.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const AppStoreBadge: Story = {
  render: () => {
    const appStoreDarkBadge = '/assets/images/apple-store-badge.svg';
    const appStoreLightBadge = '/assets/images/apple-store-badge-white.svg';
    const googlePlayBadge = '/assets/images/google-play-badge.svg';

    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start flex-column">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex gap-4 p-4 m-4"
              data-color-mode="${bg === 'bg-white' ? 'light' : 'dark'}"
            >
              ${bg === 'bg-white'
                ? renderBadge('apple-store')
                : renderBadge('apple-store')}
              ${renderBadge('google-play')}
            </div>
          `,
        )}
      </div>
    `;
  },
};
