import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';
import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, render } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { until } from 'lit/directives/until.js';
import {
  installKlpPlatformFake,
  KlpFakeUser,
  otherKlpLoginWidgetsLoaded,
  uninstallKlpPlatformFake,
} from './klp-platform.fake';
import { KLP_LOGIN_WIDGET_TEXTS, renderKlpLoginWidget } from './klp-login-widget.renderer';

const USER_LABELS: Record<KlpFakeUser, string> = {
  'b2c': 'B2C user',
  'b2b-multi-account': 'B2B user (multi account)',
  'b2b-multi-company': 'B2B user (multi company)',
};

interface KlpLoginWidgetArgs
  extends Pick<
    HTMLPostKlpLoginWidgetElement,
    'environment' | 'textCurrentUser' | 'textUserLinks' | 'textAccessUserLinks' | 'initialState'
  > {
  session?: KlpFakeUser | 'anonymous';
  unread?: number;
}

const renderWidget = (args: KlpLoginWidgetArgs) =>
  renderKlpLoginWidget({
    environment: args.environment,
    textCurrentUser: args.textCurrentUser,
    textUserLinks: args.textUserLinks,
    textAccessUserLinks: args.textAccessUserLinks,
    initialState: args.initialState,
  });

const LIT_EXPRESSION_COMMENTS = /<!--\?lit\$[0-9]+\$-->|<!--\??-->/g;

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
    ...KLP_LOGIN_WIDGET_TEXTS,
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
  // Keyed on the args, so a changed control mounts a new widget, which asks for the session again.
  render: (args: Args) => html`${keyed(JSON.stringify(args), renderWidget(args))}`,
};

export default meta;

type Story = StoryObj<KlpLoginWidgetArgs>;

/**
 * Replaces the platform with a fake answering as the selected `session`. The docs page shows these
 * stories next to the live Default story, in the same window, so the widget is only rendered once
 * every other widget on the page has asked the real platform. The fake is removed again when the
 * story is torn down.
 */
const FAKED_SESSION: Story = {
  argTypes: {
    session: {
      name: 'Session',
      description:
        'Not a property of the component. Replaces the KLP platform with a fake answering as the selected user, so each kind of user can be seen without a real session.',
      control: { type: 'select', labels: USER_LABELS },
      options: Object.keys(USER_LABELS),
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
  parameters: {
    docs: {
      source: {
        // The widget is rendered asynchronously, which the generated source cannot wait for.
        transform: (_code: string, { args }: StoryContext<KlpLoginWidgetArgs>) => {
          const container = document.createElement('div');
          render(renderWidget(args), container);
          return container.innerHTML.replace(LIT_EXPRESSION_COMMENTS, '');
        },
      },
    },
  },
  beforeEach: () => uninstallKlpPlatformFake,
  render: args => {
    const widget = otherKlpLoginWidgetsLoaded().then(() => {
      installKlpPlatformFake({
        user: args.session === 'anonymous' ? null : (args.session ?? null),
        unread: args.unread,
      });
      return renderWidget(args);
    });

    return html`${keyed(JSON.stringify(args), until(widget))}`;
  },
};

/** The real platform of the selected environment, which only answers origins on its allowlist. */
export const Default: Story = {};

/**
 * In a window of its own: a window holds one fake at a time, and the Signed in story already uses
 * it. The iframe is as tall as the Default story's scroll wrapper, so all examples look alike.
 */
export const Anonymous: Story = {
  ...FAKED_SESSION,
  parameters: {
    ...FAKED_SESSION.parameters,
    docs: { ...FAKED_SESSION.parameters?.docs, story: { inline: false, iframeHeight: 400 } },
  },
  argTypes: {
    session: { table: { disable: true } },
    unread: { table: { disable: true } },
  },
  args: { session: 'anonymous', initialState: 'anonymous' },
};

export const SignedIn: Story = {
  ...FAKED_SESSION,
  args: { session: 'b2b-multi-account', unread: 0 },
};
