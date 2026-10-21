import { MetaComponent } from '@root/types';
import type { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import {
  installKlpPlatformFake,
  KLP_FAKE_USERS,
  KlpFakeUser,
  uninstallKlpPlatformFake,
} from './klp-platform.fake';
import { KLP_LOGIN_WIDGET_TEXTS, renderKlpLoginWidget } from './klp-login-widget.renderer';

type Session = 'live' | 'anonymous' | KlpFakeUser;

interface KlpLoginWidgetArgs
  extends Pick<
    HTMLPostKlpLoginWidgetElement,
    'environment' | 'textCurrentUser' | 'textUserLinks' | 'textAccessUserLinks' | 'initialState'
  > {
  session: Session;
  unread: number;
}

/** Applies the `session` control: `live` asks the platform, everything else answers with a fake. */
function applySession({ session, unread }: KlpLoginWidgetArgs) {
  if (session === 'live') {
    uninstallKlpPlatformFake();
  } else {
    installKlpPlatformFake({ user: session === 'anonymous' ? null : session, unread });
  }
}

const meta: MetaComponent<KlpLoginWidgetArgs> = {
  id: '787282bd-aea2-49e5-b98d-3bf852ca9dd7',
  title: 'Components/Header/Sub Components/KLP Login Widget',
  tags: ['package:WebComponents', 'status:New'],
  component: 'post-klp-login-widget',
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=ywmfJhyvd2euoiGI-1',
    },
  },
  args: {
    environment: 'prod',
    session: 'live',
    unread: 0,
    ...KLP_LOGIN_WIDGET_TEXTS,
  },
  argTypes: {
    session: {
      name: 'Session',
      description:
        'Not a property of the component. `live` asks the KLP platform of the selected environment for the real session; the other options replace the platform with a fake, so the signed-in states can be seen without one.',
      control: { type: 'select' },
      options: ['live', 'anonymous', ...Object.keys(KLP_FAKE_USERS)],
      table: { category: 'Storybook' },
    },
    unread: {
      name: 'Unread messages',
      description:
        'Not a property of the component. Number of unread messages the fake platform pushes once the user is signed in.',
      control: { type: 'number', min: 0 },
      if: { arg: 'session', neq: 'live' },
      table: { category: 'Storybook' },
    },
  },
  // Restores the native `fetch` and `WebSocket` once a story is torn down, so a fake never leaks
  // into stories rendered later in the same window.
  beforeEach: () => uninstallKlpPlatformFake,
  decorators: [
    (story: StoryFn, context: StoryContext<KlpLoginWidgetArgs>) => {
      applySession(context.args);

      return html`
        <post-header text-menu="Menu">
          <post-logo slot="post-logo" url="/">Homepage</post-logo>
          ${story(context.args, context)}
        </post-header>
      `;
    },
  ],
  // Keyed on the args, so a changed control mounts a new widget, which asks for the session again.
  render: args =>
    html`${keyed(
      JSON.stringify(args),
      renderKlpLoginWidget({
        environment: args.environment,
        textCurrentUser: args.textCurrentUser,
        textUserLinks: args.textUserLinks,
        textAccessUserLinks: args.textAccessUserLinks,
        initialState: args.initialState,
      }),
    )}`,
};

export default meta;

type Story = StoryObj<KlpLoginWidgetArgs>;

/** Every story but the live one installs a fake, so each gets a window of its own. */
function inIframe(iframeHeight: number) {
  return { docs: { story: { inline: false, iframeHeight } } };
}

export const Default: Story = {};

export const Anonymous: Story = {
  parameters: inIframe(120),
  args: { session: 'anonymous' },
};

export const SignedIn: Story = {
  parameters: inIframe(420),
  args: { session: 'ada', unread: 3 },
};

export const SwitchCompany: Story = {
  parameters: inIframe(420),
  args: { session: 'grace' },
};

export const PrivateCustomer: Story = {
  parameters: inIframe(380),
  args: { session: 'alan' },
};
