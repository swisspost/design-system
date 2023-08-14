/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../.storybook/constants';
import './internet-header.styles.scss';

const meta: Meta<HTMLSwisspostInternetHeaderElement> = {
  title: 'Internet Header/Header Component',
  component: 'swisspost-internet-header',
  render: renderInternetHeader,
  decorators: [ mockPage ],
  parameters: {
    layout: 'fullscreen',
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
    controls: {
      exclude: ['config-proxy']
    }
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

// RENDERER
function renderInternetHeader(args: HTMLSwisspostInternetHeaderElement) {
  console.log(args);
  const filteredArgs = filterArgs(args, arg => arg !== null && arg !== undefined);
  return html`
    <swisspost-internet-header ${spread(filteredArgs)}></swisspost-internet-header>
  `;
}

// STORIES
type Story = StoryObj<HTMLSwisspostInternetHeaderElement>;

export const Default: Story = {};

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

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

// TODO: move to utils
const filterArgs = (obj: Args, predicate: (arg: any) => boolean): Args => {
  let result: Args = {},
    key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      // Cast boolean false to string so it's displayed in the docs code block. False values are otherwise omitted
      result[key] = obj[key] === false ? 'false' : obj[key];
      if (typeof obj[key] === 'object') {
        result[key] = JSON.stringify(obj[key]);
      }
    }
  }

  return result;
};
