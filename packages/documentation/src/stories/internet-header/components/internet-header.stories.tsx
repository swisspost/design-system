import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../.storybook/constants';
import './internet-header.styles.scss';

const meta: Meta<HTMLSwisspostInternetHeaderElement> = {
  title: 'Internet Header/Header component',
  component: 'swisspost-internet-header',
  render: renderInternetHeader,
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
    controls: {
      exclude: ['config-proxy'],
    },
  },
  args: {
    project: 'test',
    language: 'de',
  },
  argTypes: {
    activeRoute: {
      name: 'active-route',
      control: 'text',
    },
    customConfig: {
      name: 'custom-config',
      control: 'object',
    },
    language: {
      control: 'select',
      options: ['de', 'fr', 'it', 'en'],
    },
    languageCookieKey: {
      name: 'language-cookie-key',
      control: 'text',
    },
    languageLocalStorageKey: {
      name: 'language-local-storage-key',
      control: 'text',
    },
    languageSwitchOverrides: {
      name: 'language-switch-overrides',
      control: 'object',
    },
    osFlyoutOverrides: {
      name: 'os-flyout-overrides',
      control: 'object',
    },
    stickyness: {
      control: 'select',
    },
  },
};

export default meta;

// DECORATORS
function mockPage(story: any) {
  return html`
    <div class="page-wrapper">
      ${story()}
      <main class="container mt-huge-r">
        <swisspost-internet-breadcrumbs />
        <h1 class="mt-huge-r mb-big-r bold">Design System Internet Header</h1>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  `;
}

// RENDERER
function renderInternetHeader(args: HTMLSwisspostInternetHeaderElement) {
  const attributes = getAttributes(args, arg => arg !== null && arg !== undefined);
  return html`
    <swisspost-internet-header ${spread(attributes)}></swisspost-internet-header>
  `;
}

// STORIES
type Story = StoryObj<HTMLSwisspostInternetHeaderElement>;

export const Default: Story = {
  decorators: [mockPage],
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '40em',
      },
    },
  },
};

export const FullWidth: Story = {
  decorators: [mockPage],
  args: {
    fullWidth: true,
  },
};

export const CustomNavigation: Story = {
  args: {
    customConfig: {
      de: {
        header: {
          navMain: [
            {
              title: 'Meine Links (custom config)',
              text: 'Meine Links',
              url: '#',
              flyout: [
                {
                  title: 'Google',
                  linkList: [
                    { url: 'https://maps.google.com', title: 'Google Maps', target: '_blank' },
                    { url: 'https://translate.google.com', title: 'Google Translate' },
                  ],
                },
              ],
            },
          ],
        },
      },
      fr: {
        header: {
          navMain: [
            {
              title: 'Meine Links (custom config)',
              text: 'Meine Links',
              url: '#',
              flyout: [
                {
                  title: 'Google',
                  linkList: [
                    { url: 'https://maps.google.com', title: 'Google Maps', target: '_blank' },
                    { url: 'https://translate.google.com', title: 'Google Translate' },
                  ],
                },
              ],
            },
          ],
        },
      },
      it: {
        header: {
          navMain: [
            {
              title: 'Meine Links (custom config)',
              text: 'Meine Links',
              url: '#',
              flyout: [
                {
                  title: 'Google',
                  linkList: [
                    { url: 'https://maps.google.com', title: 'Google Maps', target: '_blank' },
                    { url: 'https://translate.google.com', title: 'Google Translate' },
                  ],
                },
              ],
            },
          ],
        },
      },
      en: {
        header: {
          navMain: [
            {
              title: 'Meine Links (custom config)',
              text: 'Meine Links',
              url: '#',
              flyout: [
                {
                  title: 'Google',
                  linkList: [
                    { url: 'https://maps.google.com', title: 'Google Maps', target: '_blank' },
                    { url: 'https://translate.google.com', title: 'Google Translate' },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export const CustomOnlineServiceFlyout: Story = {
  decorators: [mockPage],
  args: {
    osFlyoutOverrides: {
      title: 'Custom OS Flyout',
      text: 'Custom OS Flyout',
      url: '#',
      flyout: [
        {
          title: 'A title',
          linkList: [
            {
              url: '#bla',
              title: 'Another link',
            },
          ],
        },
        {
          title: 'Another column',
          linkList: [
            {
              url: '#foo',
              title: 'Foo',
            },
          ],
        },
      ],
    },
  },
};

// TODO: move to utils
const getAttributes = (args: Args, condition?: (arg: any) => boolean): Args => {
  const attrs: { [key: string]: any } = {};

  for (const key in args) {
    if (args.hasOwnProperty(key) && condition && condition(args[key])) {
      const attrKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      // Cast boolean false to string so it's displayed in the docs code block. False values are otherwise omitted
      attrs[attrKey] = args[key] === false ? 'false' : args[key];
      if (typeof args[key] === 'object') {
        attrs[attrKey] = JSON.stringify(args[key]);
      }
    }
  }

  return attrs;
};
