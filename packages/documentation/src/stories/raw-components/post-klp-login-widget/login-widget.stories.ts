import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  title: 'Components/Login Widget',
  component: 'post-login-widget',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level',
    },
  },
  args: {
    loginUrl: 'https://account.post.ch/login',
    logoutUrl: 'https://account.post.ch/logout',
    textUserProfile: 'My Profile',
    textMessages: 'Messages',
    textSettings: 'Settings',
    textLogout: 'Logout',
  },
  argTypes: {
    loginUrl: {
      name: 'login-url',
      description: 'The URL to redirect to when the user clicks the login link.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    logoutUrl: {
      name: 'logout-url',
      description:
        'The URL emitted as the payload of the `postLogout` event. The consumer is responsible for handling the redirect.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    textUserProfile: {
      name: 'text-user-profile',
      description: 'Label for the "My Profile" menu item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    textMessages: {
      name: 'text-messages',
      description: 'Label for the "Messages" menu item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    textSettings: {
      name: 'text-settings',
      description: 'Label for the "Settings" menu item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    textLogout: {
      name: 'text-logout',
      description: 'Label for the "Logout" button.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <post-login-widget
      login-url=${args.loginUrl}
      logout-url=${args.logoutUrl}
      text-user-profile=${args.textUserProfile}
      text-messages=${args.textMessages}
      text-settings=${args.textSettings}
      text-logout=${args.textLogout}
    ></post-login-widget>
  `,
};