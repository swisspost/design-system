import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';
import type { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { installKlpPlatformFake, KlpFakeUser, uninstallKlpPlatformFake } from './klp-platform.fake';
import { KLP_LOGIN_WIDGET_TEXTS, renderKlpLoginWidget } from './klp-login-widget.renderer';

type Session = 'live' | 'anonymous' | KlpFakeUser;

const SESSION_LABELS: Record<Session, string> = {
  'live': 'Live (KLP platform)',
  'anonymous': 'Anonymous',
  'b2c': 'B2C user',
  'b2b-multi-account': 'B2B user (multi account)',
  'b2b-multi-company': 'B2B user (multi company)',
};

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
        'Not a property of the component. `Live` asks the KLP platform of the selected environment for the real session; the other options replace the platform with a fake, so each kind of user can be seen without one.',
      control: { type: 'select', labels: SESSION_LABELS },
      options: Object.keys(SESSION_LABELS),
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
        <div class="header-story-wrapper">
          <div class="virtual-body">
            <post-header text-menu="Menu">
              <post-logo slot="post-logo" url="/">Homepage</post-logo>
              ${story(context.args, context)}
            </post-header>
            ${fakeContent()}
          </div>
        </div>
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

/**
 * Every story but the live one installs a fake, which patches the window, so each gets a window of
 * its own. The iframe is as tall as the Default story's scroll wrapper, so all examples look alike.
 */
const IN_IFRAME = { docs: { story: { inline: false, iframeHeight: 300 } } };

export const Default: Story = {};

export const Anonymous: Story = {
  parameters: IN_IFRAME,
  args: { session: 'anonymous', initialState: 'anonymous' },
};

export const SignedIn: Story = {
  parameters: IN_IFRAME,
  args: { session: 'b2b-multi-account', unread: 3 },
};

export const SwitchCompany: Story = {
  parameters: IN_IFRAME,
  args: { session: 'b2b-multi-company' },
};

export const PrivateCustomer: Story = {
  parameters: IN_IFRAME,
  args: { session: 'b2c' },
};
