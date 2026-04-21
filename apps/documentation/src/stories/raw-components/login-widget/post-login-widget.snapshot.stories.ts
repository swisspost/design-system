import type { StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './post-login-widget.stories';
import { renderUserMenu } from './post-login-widget.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const LoginWidget: Story = {
  render: (_: unknown, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-24 p-16">
          <div>
            <h3>Unauthenticated</h3>
            <a href="/login">
              <span>Login</span>
              <post-icon name="login" aria-hidden="true"></post-icon>
            </a>
          </div>
          <div>
            <h3>Authenticated</h3>
            ${renderUserMenu('snapshot-user-menu')}
          </div>
        </div>
      `,
    );
  },
};