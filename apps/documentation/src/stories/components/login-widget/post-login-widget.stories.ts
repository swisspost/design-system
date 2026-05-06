import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'a3f8b2c1-1d4e-4f6a-9b0c-2e7d8f3a5c6b',
  title: 'Components/Login Widget',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-login-widget',
  render,
  parameters: {
    badges: [],
    design: {},
  },
};

export default meta;

// RENDERERS

export function renderLoginLink() {
  return html`
    <a slot="login-link" href="/login">
      <span>Login</span>
      <post-icon name="login" aria-hidden="true"></post-icon>
    </a>
  `;
}

export function renderUserMenuLinks() {
  return html`
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="profile"></post-icon>
        My Profile
      </a>
    </post-menu-item>
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="letter"></post-icon>
        Messages
      </a>
    </post-menu-item>
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="gear"></post-icon>
        Settings
      </a>
    </post-menu-item>
    <post-menu-item>
      <button type="button">
        <post-icon aria-hidden="true" name="logout"></post-icon>
        Logout
      </button>
    </post-menu-item>
  `;
}

function render() {
  return html`
    <post-login-widget
      text-current-user="Current user is {user}."
      text-user-menu-trigger="Access user links"
    >
      ${renderLoginLink()}
      <div slot="user-links">${renderUserMenuLinks()}</div>
    </post-login-widget>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [story => html`<div style="padding-top: 1rem">${story()}</div>`],
  parameters: {
    docs: {
      story: { inline: false, height: '110px' },
    },
  },
};

export const Authenticated: Story = {
  loaders: [
    async () => {
      const originalFetch = window.fetch;
      window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
        const url = input instanceof Request ? input.url : String(input);
        if (url.includes('n.account.post.ch/v1/session/subscribe')) {
          return Promise.resolve(
            new Response(
              JSON.stringify({ data: { name: 'John', surname: 'Doe', email: 'john.doe@post.ch' } }),
              { status: 200, headers: { 'Content-Type': 'application/json' } },
            ),
          );
        }
        return originalFetch(input, init);
      }) as typeof fetch;
      return originalFetch;
    },
  ],
  render: () => html`
    <post-login-widget
      text-current-user="Current user is {user}."
      text-user-menu-trigger="Access user links"
    >
      ${renderLoginLink()}
      <div slot="user-links">${renderUserMenuLinks()}</div>
    </post-login-widget>
  `,
};
