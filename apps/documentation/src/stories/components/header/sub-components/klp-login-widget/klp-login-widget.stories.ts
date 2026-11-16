import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';
import type { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import {
  installKlpPlatformFake,
  KLP_FAKE_SESSION_LABELS,
  KlpFakeSession,
  uninstallKlpPlatformFake,
} from './klp-platform.fake';
import {
  KLP_LOGIN_WIDGET_TEXTS,
  KlpLoginWidgetRenderOptions,
  renderKlpLoginWidget,
} from './klp-login-widget.renderer';

interface KlpLoginWidgetArgs
  extends Pick<
    HTMLPostKlpLoginWidgetElement,
    | 'environment'
    | 'service'
    | 'app'
    | 'language'
    | 'initialState'
    | 'inIframe'
    | 'textCurrentUser'
    | 'textUserLinks'
    | 'keepAliveDisabled'
    | 'keepAliveUrl'
    | 'keepAliveInterval'
    | 'keepAliveEvents'
    | 'urlLogin'
    | 'urlAccountSwitch'
    | 'urlCompanySwitch'
    | 'urlMyProfile'
    | 'urlMessages'
    | 'urlSettings'
    | 'urlLogout'
  > {
  session?: KlpFakeSession;
  unread?: number;
  texts?: NonNullable<KlpLoginWidgetRenderOptions['texts']>;
  customItems?: NonNullable<KlpLoginWidgetRenderOptions['customItems']>;
}

const renderWidget = (args: KlpLoginWidgetArgs) =>
  renderKlpLoginWidget({
    environment: args.environment,
    service: args.service,
    app: args.app,
    language: args.language,
    initialState: args.initialState,
    inIframe: args.inIframe,
    textCurrentUser: args.textCurrentUser,
    textUserLinks: args.textUserLinks,
    keepAliveDisabled: args.keepAliveDisabled,
    keepAliveUrl: args.keepAliveUrl,
    keepAliveInterval: args.keepAliveInterval,
    keepAliveEvents: args.keepAliveEvents,
    urlLogin: args.urlLogin,
    urlAccountSwitch: args.urlAccountSwitch,
    urlCompanySwitch: args.urlCompanySwitch,
    urlMyProfile: args.urlMyProfile,
    urlMessages: args.urlMessages,
    urlSettings: args.urlSettings,
    urlLogout: args.urlLogout,
    texts: args.texts,
    customItems: args.customItems,
  });

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
  // The order of the keys is the order of the controls table.
  args: {
    environment: 'int01',
    service: 'design-system',
    app: undefined,
    language: 'en',
    initialState: undefined,
    inIframe: false,
    ...KLP_LOGIN_WIDGET_TEXTS,
    keepAliveDisabled: false,
    keepAliveUrl: undefined,
    keepAliveInterval: 9,
    keepAliveEvents: 'click touchstart keydown',
    urlLogin: undefined,
    urlAccountSwitch: undefined,
    urlCompanySwitch: undefined,
    urlMyProfile: undefined,
    urlMessages: undefined,
    urlSettings: undefined,
    urlLogout: undefined,
    session: 'anonymous',
    unread: 0,
  },
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['de', 'fr', 'it', 'en'],
    },
    texts: { table: { disable: true } },
    customItems: { table: { disable: true } },
    session: {
      name: 'Session',
      description:
        'Not a property of the component. Replaces the KLP platform with a fake answering as the selected user, so each kind of user can be seen without a real session.',
      control: { type: 'select', labels: KLP_FAKE_SESSION_LABELS },
      options: Object.keys(KLP_FAKE_SESSION_LABELS),
      table: { category: 'Storybook' },
    },
    unread: {
      name: 'Unread messages',
      description:
        'Not a property of the component. Number of unread messages the fake platform pushes once the user is signed in.',
      control: { type: 'number', min: 0 },
      table: { category: 'Storybook' },
    },
  },
  decorators: [
    (story: StoryFn, context: StoryContext<KlpLoginWidgetArgs>) => html`
      <div class="header-story-wrapper klp-login-widget-story">
        <div class="virtual-body">
          <post-header text-menu="Menu">
            <post-logo slot="post-logo" url="/">Homepage</post-logo>
            ${story(context.args, context)}
          </post-header>
          ${fakeContent()}
        </div>
      </div>
    `,
  ],
  // Removes the fake once a story is torn down, so it never leaks into the next one.
  beforeEach: () => uninstallKlpPlatformFake,
  // Keyed on the args, so a changed control mounts a new widget, which asks the fake again.
  render: args => {
    installKlpPlatformFake({
      user: args.session === 'anonymous' ? null : (args.session ?? null),
      unread: args.unread,
    });
    return html`${keyed(JSON.stringify(args), renderWidget(args))}`;
  },
};

export default meta;

type Story = StoryObj<KlpLoginWidgetArgs>;

export const Default: Story = {};

/**
 * The fake never answers, so the widget keeps the state it shows before the session is known.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const InitialState: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 350 } },
  },
  args: {
    initialState: 'authenticated',
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
  render: args => {
    installKlpPlatformFake({ user: null, pending: true });
    return html`${keyed(JSON.stringify(args), renderWidget(args))}`;
  },
};

/**
 * A signed-in user with unread messages: the trigger is marked and the messages entry shows the count.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const WithMessages: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  args: {
    session: 'b2c',
    unread: 3,
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
};

/**
 * A support user signed in on behalf of a customer: the avatar carries the support icon.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const WithServiceIcon: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  args: {
    session: 'support',
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
};

/**
 * Own targets and texts for some entries, and an entry of the application's own listed between
 * settings and logout; the other entries keep their defaults.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const Entries: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  args: {
    session: 'b2b-multi-account',
    urlMyProfile: '/my-account',
    texts: { 'text-my-profile': 'My account', 'text-logout': 'Sign out' },
    customItems: [{ href: '/orders', icon: 'parcel', text: 'My orders' }],
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
};
