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
    | 'language'
    | 'textCurrentUser'
    | 'textUserLinks'
    | 'initialState'
    | 'urlLogin'
    | 'urlMyProfile'
  > {
  session?: KlpFakeSession;
  unread?: number;
  texts?: NonNullable<KlpLoginWidgetRenderOptions['texts']>;
  customItems?: NonNullable<KlpLoginWidgetRenderOptions['customItems']>;
}

const renderWidget = (args: KlpLoginWidgetArgs) =>
  renderKlpLoginWidget({
    environment: args.environment,
    language: args.language,
    textCurrentUser: args.textCurrentUser,
    textUserLinks: args.textUserLinks,
    initialState: args.initialState,
    urlLogin: args.urlLogin,
    urlMyProfile: args.urlMyProfile,
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
  args: {
    environment: 'int01',
    language: 'en',
    ...KLP_LOGIN_WIDGET_TEXTS,
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
      <div class="header-story-wrapper">
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
 * Own targets and texts for some entries; the others keep their defaults.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const Overrides: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  args: {
    session: 'b2b-multi-account',
    urlMyProfile: '/my-account',
    texts: { 'text-my-profile': 'My account', 'text-logout': 'Sign out' },
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
};

/**
 * An entry of the application's own, listed between settings and logout.
 * In a window of its own: a window holds one fake at a time, and the Default story already uses it.
 */
export const CustomItems: Story = {
  parameters: {
    docs: { story: { inline: false, iframeHeight: 500 } },
  },
  args: {
    session: 'b2c',
    customItems: [{ href: '/orders', icon: 'parcel', text: 'My orders' }],
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
};

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
