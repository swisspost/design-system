import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  title: 'Raw components/KLP Login Widget',
  component: 'post-klp-login-widget',
  tags: ['package:WebComponents', 'status:InProgress'],
  parameters: {
    badges: [],
  },
  args: {
    loginUrl: '/login',
    logoutUrl: '/logout',
    textUserProfile: 'My Profile',
    textMessages: 'Messages',
    textSettings: 'Settings',
    textLogout: 'Logout',
  },
  argTypes: {
    loginUrl: {
      description: 'The URL to redirect to when the user clicks the login link.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    logoutUrl: {
      description:
        'The URL to redirect to after the user logs out. Emitted as the payload of the `postLogout` event so the consumer can handle the redirect.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    textUserProfile: {
      description: 'Label for the "My Profile" menu item.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    textMessages: {
      description: 'Label for the "Messages" menu item.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    textSettings: {
      description: 'Label for the "Settings" menu item.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    textLogout: {
      description: 'Label for the "Logout" button.',
      control: 'text',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <post-klp-login-widget
      login-url=${args.loginUrl}
      logout-url=${args.logoutUrl}
      text-user-profile=${args.textUserProfile}
      text-messages=${args.textMessages}
      text-settings=${args.textSettings}
      text-logout=${args.textLogout}
    ></post-klp-login-widget>
  `,
};

export const LoggedOut: Story = {
  name: 'Logged Out (Login Link)',
  parameters: {
    docs: {
      description: {
        story:
          'When no active session is found, the widget renders a login link pointing to `loginUrl`.',
      },
    },
    mockData: [
      {
        url: 'https://n.account.post.ch/v1/session/subscribe',
        method: 'GET',
        status: 401,
        response: { data: null },
      },
    ],
  },
  render: (args: Args) => html`
    <post-klp-login-widget
      login-url=${args.loginUrl}
      logout-url=${args.logoutUrl}
      text-user-profile=${args.textUserProfile}
      text-messages=${args.textMessages}
      text-settings=${args.textSettings}
      text-logout=${args.textLogout}
    ></post-klp-login-widget>
  `,
};

export const LoggedIn: Story = {
  name: 'Logged In (User Menu)',
  parameters: {
    docs: {
      description: {
        story:
          'When a valid session is found, the widget renders an avatar button that opens a user menu with profile, messages, settings, and logout options.',
      },
    },
    mockData: [
      {
        url: 'https://n.account.post.ch/v1/session/subscribe',
        method: 'GET',
        status: 200,
        response: {
          data: {
            name: 'Maria',
            surname: 'Muster',
            email: 'maria.muster@example.com',
            userType: 'private',
          },
        },
      },
    ],
  },
  render: (args: Args) => html`
    <post-klp-login-widget
      login-url=${args.loginUrl}
      logout-url=${args.logoutUrl}
      text-user-profile=${args.textUserProfile}
      text-messages=${args.textMessages}
      text-settings=${args.textSettings}
      text-logout=${args.textLogout}
    ></post-klp-login-widget>
  `,
};