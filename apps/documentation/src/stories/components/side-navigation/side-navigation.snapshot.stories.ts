import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import meta from './side-navigation.stories';
import { defaultNav } from './nav-content';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj;

export const PostSideNavigation: Story = {
  render: () => {
    return html`
      <post-header text-menu="Menu">
        <post-logo slot="post-logo" url="/">Homepage</post-logo>
        <p slot="title">[Application Title]</p>
        <ul slot="local-nav">
          <li>
            <post-side-navigation-trigger for="sidenavigation">
              <button>
                <span>Menu</span>
                <post-icon aria-hidden="true" name="burger"></post-icon>
              </button>
            </post-side-navigation-trigger>
          </li>
          <li>
            <a href="#">
              <span>Search</span>
              <post-icon aria-hidden="true" name="search"></post-icon>
            </a>
          </li>
          <li class="local-login">
            <a href="">
              <span>Login</span>
              <post-icon name="login"></post-icon>
            </a>
          </li>
        </ul>
      </post-header>
      <post-side-navigation text-close="Close" id="sidenavigation">
        <nav aria-label="Main navigation">${unsafeHTML(defaultNav)}</nav>
      </post-side-navigation>
      <main class="main-container">
        <div class="d-flex virtual-body"></div>
      </main>
    `;
  },
};
