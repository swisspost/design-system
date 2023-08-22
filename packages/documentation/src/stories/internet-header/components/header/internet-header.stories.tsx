import { Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../../.storybook/constants';
import { getAttributes } from '../../../../utils';
import './internet-header.styles.scss';

const meta: Meta<HTMLSwisspostInternetHeaderElement> = {
  title: 'Internet Header/Header Component',
  component: 'swisspost-internet-header',
  render: renderInternetHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
      },
    },
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
    controls: {
      exclude: ['config-proxy']
    },
  },
  args: {
    'project': 'test'
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
        <swisspost-internet-breadcrumbs/>
        <h1 class="mt-huge-r mb-big-r bold">Swiss Post Internet Header</h1>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer/>
    </div>
  `;
}

function zoom(story: any) {
  const headerMinWidth = 2000;
  const storyWrapper = document.body.parentElement;

  if (storyWrapper && storyWrapper.clientWidth < headerMinWidth) {
    document.body.style.width = `${headerMinWidth}px`;
    document.body.style.height = `${headerMinWidth}px`;
    document.body.style.transform = `scale(${storyWrapper.clientWidth / headerMinWidth})`;
    document.body.style.transformOrigin = 'left top 0px';
  }

  return html`
    ${story()}
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
  decorators: [ mockPage ],
  parameters: {
    docs: {
      story: {
        height: '40em',
      },
      source: {
        code: `<swisspost-internet-header project="your-project-id"></swisspost-internet-header>`
      },
    },
  },
};


export const NotFullWidth: Story = {
  decorators: [ zoom ],
};


export const FullWidth: Story = {
  decorators: [ zoom ],
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
