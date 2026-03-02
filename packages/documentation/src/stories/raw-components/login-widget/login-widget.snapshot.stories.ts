import type { Args, StoryObj } from '@storybook/web-components-vite';
import meta from './login-widget.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostLoginWidgetElement>;

export const PostLoginWidget: Story = {
  render: (args: Args) => {
    return schemes(() => html`
      <post-login-widget
        login-url=${args.loginUrl}
        logout-url=${args.logoutUrl}
        text-user-profile=${args.textUserProfile}
        text-messages=${args.textMessages}
        text-settings=${args.textSettings}
        text-logout=${args.textLogout}
      ></post-login-widget>
    `);
  },
};
