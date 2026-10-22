import { fakeContent } from '@/utils';
import { MetaComponent } from '@root/types';
import type { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import {
  installKlpPlatformFake,
  uninstallKlpPlatformFake,
} from '../klp-login-widget/klp-platform.fake';
import {
  KLP_LOGIN_WIDGET_MESSAGES_DEFAULTS,
  renderKlpLoginWidget,
} from '../klp-login-widget/klp-login-widget.renderer';

interface KlpLoginWidgetMessagesArgs
  extends Pick<HTMLPostKlpLoginWidgetMessagesElement, 'url' | 'text' | 'textUnread'> {
  unread: number;
}

const meta: MetaComponent<KlpLoginWidgetMessagesArgs> = {
  id: '28eee16f-1128-4aae-9d02-7e4eb7a3f572',
  title: 'Components/Header/Sub Components/KLP Login Widget Messages',
  tags: ['package:WebComponents', 'status:New'],
  component: 'post-klp-login-widget-messages',
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=ywmfJhyvd2euoiGI-1',
    },
    // The entry only exists inside a signed-in widget, which needs the fake platform and so a
    // window of its own.
    docs: {
      story: { inline: false, iframeHeight: 300 },
      source: {
        // Shows the element this page documents, not the widget around it.
        transform: (_code: string, { args }: StoryContext<KlpLoginWidgetMessagesArgs>) =>
          `<post-klp-login-widget-messages
  slot="menu-links"
  url="${args.url}"
  text="${args.text}"
  text-unread="${args.textUnread}"
></post-klp-login-widget-messages>`,
      },
    },
  },
  args: {
    ...KLP_LOGIN_WIDGET_MESSAGES_DEFAULTS,
    unread: 3,
  },
  argTypes: {
    unread: {
      name: 'Unread messages',
      description:
        'Not a property of the component. Number of unread messages the fake platform reports for the signed-in user.',
      control: { type: 'number', min: 0 },
      table: { category: 'Storybook' },
    },
  },
  // Restores the native `fetch` and `WebSocket` once a story is torn down, so the fake never leaks
  // into stories rendered later in the same window.
  beforeEach: () => uninstallKlpPlatformFake,
  decorators: [
    (story: StoryFn, context: StoryContext<KlpLoginWidgetMessagesArgs>) => {
      installKlpPlatformFake({ user: 'b2c', unread: context.args.unread });

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
        messages: { url: args.url, text: args.text, textUnread: args.textUnread },
      }),
    )}`,
};

export default meta;

type Story = StoryObj<KlpLoginWidgetMessagesArgs>;

export const Default: Story = {};
