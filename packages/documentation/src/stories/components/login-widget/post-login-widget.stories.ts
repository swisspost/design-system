import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'a3f8b2c1-1d4e-4f6a-9b0c-2e7d8f3a5c6b',
  title: 'Components/Login Widget',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-login-widget',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level',
    },
  },
  argTypes: {
    postLoginChange: {
      name: 'post-login-change',
      description:
        'Emitted whenever the authentication state changes. Payload: <code>{ authenticated: boolean }</code>.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ authenticated: boolean }>' },
      },
    },
    refresh: {
      description:
        'Re-fetches the authentication state from the session API and updates the rendered slot accordingly.',
      control: false,
      table: {
        category: 'Methods',
        type: { summary: 'refresh(): Promise<void>' },
      },
    },
  },
};

export default meta;

function renderUserMenu() {
  return html`
    <post-menu-trigger for="user-menu-widget">
      <button class="btn btn-link" type="button">
        <post-avatar
          firstname="John"
          lastname="Doe"
          description="Current user is John Doe."
        ></post-avatar>
        <span class="visually-hidden">Access user links.</span>
      </button>
    </post-menu-trigger>
    <post-menu id="user-menu-widget" label="User links">
      <div slot="header">
        <post-avatar firstname="John" lastname="Doe" aria-hidden="true"></post-avatar>
        John Doe
      </div>
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
    </post-menu>
  `;
}

type Story = StoryObj;

export const Unauthenticated: Story = {
  render: () => html`
    <post-login-widget authenticated="false">
      <a slot="unauthenticated" href="/login">
        <span>Login</span>
        <post-icon name="arrow-right" aria-hidden="true"></post-icon>
      </a>
    </post-login-widget>
  `,
};

export const Authenticated: Story = {
  render: () => html`
    <post-login-widget authenticated>
      <div slot="authenticated">${renderUserMenu()}</div>
    </post-login-widget>
  `,
};