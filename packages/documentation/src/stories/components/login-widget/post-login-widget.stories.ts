import type { Args, StoryObj } from '@storybook/web-components-vite';
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level',
    },
  },
  args: {
    authenticated: false,
  },
  argTypes: {
    authenticated: {
      control: {
        type: 'inline-radio',
      },
      options: [true, false],
      description:
        'Reflects the current authentication state. <code>null</code> while the API call is in progress, <code>true</code> when logged in, <code>false</code> when logged out.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

export default meta;

// RENDERERS
function renderUserMenu(id = 'user-menu-widget') {
  return html`
    <post-menu-trigger for="${id}">
      <button class="btn btn-link" type="button">
        <post-avatar
          firstname="John"
          lastname="Doe"
          description="Current user is John Doe."
        ></post-avatar>
        <span class="visually-hidden">Access user links.</span>
      </button>
    </post-menu-trigger>
    <post-menu id="${id}" label="User links">
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

function render(args: Args) {
  return html`
    <post-login-widget authenticated=${args.authenticated}>
      <a slot="unauthenticated" href="/login">
        <span>Login</span>
        <post-icon name="login" aria-hidden="true"></post-icon>
      </a>
      <div slot="authenticated">${renderUserMenu('user-menu-default')}</div>
    </post-login-widget>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const Authenticated: Story = {
  render: () => html`
    <post-login-widget authenticated>
      <div slot="authenticated">${renderUserMenu('user-menu-authenticated')}</div>
    </post-login-widget>
  `,
};