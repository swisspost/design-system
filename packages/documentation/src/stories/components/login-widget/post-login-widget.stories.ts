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
        'Reflects the current authentication state. Managed internally — do not set manually in production. <code>null</code> while the API call is in progress, <code>true</code> when logged in, <code>false</code> when logged out.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean | null' },
        defaultValue: { summary: 'null' },
      },
    },
    refresh: {
      description:
        '<p>Call the public <code>refresh()</code> method to re-fetch the session state programmatically — for example after the user logs out via the user menu.</p>',
      table: {
        category: 'Methods',
        type: { summary: '(): Promise<void>' },
      },
    },
    'post-login-change': {
      description:
        '<p>An event emitted whenever the authentication state changes.</p><p>The event payload is a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent">CustomEvent</a> whose detail contains an <code>authenticated</code> boolean: <code>true</code> if the user is logged in, <code>false</code> if logged out.</p>',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ authenticated: boolean }>' },
      },
    },
  },
};

export default meta;

// RENDERERS
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

function render(args: Args) {
  return html`
    <post-login-widget authenticated=${args.authenticated}>
      <a slot="unauthenticated" href="/login">
        <span>Login</span>
        <post-icon name="login" aria-hidden="true"></post-icon>
      </a>

      <div slot="authenticated">${renderUserMenu()}</div>
    </post-login-widget>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const Authenticated: Story = {
  args: {
    authenticated: true,
  },
};