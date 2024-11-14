import type { StoryObj } from '@storybook/web-components';
import meta from './back-to-top.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const BackToTopLight: Story = {
  render: () => {
    return html`<div data-color-scheme="light" class="back-to-top-example bg-white">
      <div class="header-story-wrapper" style="--header-z-index: 1;overflow: auto; ">
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
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <post-back-to-top />
        </div>
      </div>
    </div>`;
  },
};

export const BackToTopDark: Story = {
  render: () => {
    return html`<div data-color-scheme="dark" class="back-to-top-example bg-dark">
      <div class="header-story-wrapper" style="--header-z-index: 1;overflow: auto; ">
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
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <p class="fake-content my-32"></p>
          <post-back-to-top />
        </div>
      </div>
    </div>`;
  },
};
