import type { Args, StoryContext, StoryObj, StoryFn } from '@storybook/web-components';
import meta from './back-to-top.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const BackToTop: Story = {
  render: () => {
    return html`
      ${['bg-white', 'bg-dark'].map(bg => {
        const id = `${bg}-${crypto.randomUUID()}`; // Unique ID for each background
        return html`
          ${[80, 50, 0].map(
            threshold => html`<post-back-to-top threshold="${threshold}"></post-back-to-top> `,
          )}
        `;
      })}
    `;
  },
  decorators: [
    () => {
      const storyTemplate = html`<div
        class="header-story-wrapper"
        style="--header-z-index: 1;overflow: auto; "
      >
        <swisspost-internet-header
          project="test"
          environment="int01"
          language="en"
        ></swisspost-internet-header>
        <div class="container">
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
        </div>
      </div>`;
      return storyTemplate;
    },
  ],
};
