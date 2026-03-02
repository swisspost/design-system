import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const MOCK_SESSION = {
  name: 'Jane',
  surname: 'Doe',
  email: 'jane.doe@post.ch',
  userType: 'private',
};

const originalFetch = window.fetch;
let currentMockSession: typeof MOCK_SESSION | null = null;

/**
 * Decorator that intercepts the KLP session fetch and returns mock session data,
 * so the logged-in state of <post-login-widget> can be previewed without a real session.
 */
function withMockSession(session: typeof MOCK_SESSION | null) {
  return (story: StoryFn, context: StoryContext) => {
    // Set the current mock session before rendering
    currentMockSession = session;

    // Override fetch to use the current mock session
    window.fetch = function (url, options) {
      if (url.toString().includes('/v1/session/subscribe')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: currentMockSession }),
        } as Response);
      }
      return originalFetch(url, options);
    } as typeof fetch;

    const result = story(context.args, context);

    // Clean up after story renders
    setTimeout(() => {
      window.fetch = originalFetch;
      currentMockSession = null;
    }, 100);

    return result;
  };
}

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
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="d-flex justify-content-start">
        ${story(context.args, context)}
      </div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

const widgetTemplate = (args: Args, context: StoryContext) => {
  // Use story name as key to force component remount when switching stories
  const storyKey = context.story?.name || 'default';
  return html`
    <post-login-widget
      key=${storyKey}
      login-url=${args.loginUrl}
      logout-url=${args.logoutUrl}
      text-user-profile=${args.textUserProfile}
      text-messages=${args.textMessages}
      text-settings=${args.textSettings}
      text-logout=${args.textLogout}
    ></post-login-widget>
  `;
};

export const Default: Story = {
  decorators: [withMockSession(null)],
  render: widgetTemplate,
};

export const LoggedIn: Story = {
  decorators: [withMockSession(MOCK_SESSION)],
  render: widgetTemplate,
};