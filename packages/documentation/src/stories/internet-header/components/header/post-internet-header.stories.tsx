import { Meta, Args, Story } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { filterArgs } from '../../../utilities/filterArgs';
import docsPage from './internet-header.docs.mdx';
import './internet-header.styles.scss';

export default {
  title: 'Internet Header/Components/Header',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: docsPage,
    },
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
  },
  args: {
    'project': 'test',
    'environment': 'int01',
    'language': 'de',
    'stickyness': 'minimal',
    'login': true,
    'search': true,
    'meta': true,
    'skiplinks': true,
    'language-switch-overrides': null,
    'language-cookie-key': '',
    'language-local-storage-key': 'swisspost-internet-header-language',
    'active-route': 'auto',
    'full-width': false,
    'custom-config': null,
    'os-flyout-overrides': null,
  },
  argTypes: {
    'project': {
      name: 'Project',
      control: {
        type: 'text',
      },
      description:
        'Your project id, previously passed as query string parameter (serviceId) when loading the old header script, e.g. &lt;script src="https://post.ch/api/staticasset?serviceId=kvm&file=head.js&minified=true" type="text/javascript"&gt;&lt;/script&gt;.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    'language': {
      name: 'Language',
      control: {
        type: 'select',
      },
      options: ['de', 'fr', 'it', 'en'],
      description:
        'Set the current language. If this parameter is not set, the header will try to autodetect it from various sources such as the lang URL parameter, any /de/ URL parts, the document language, cookies/localStorage, user preferred language in the browser or use the first available language from the Post portal config as default.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'automatically detected',
        },
      },
    },
    'language-cookie-key': {
      name: 'Language Cookie Key',
      control: { type: 'text' },
      description:
        'The header will use this key to set the language code (e.g. "de") as cookie. By default, the header will not set any cookie.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    'language-local-storage-key': {
      name: 'Language Local Storage Key',
      control: { type: 'text' },
      description:
        'The header will use this key to set the language code (e.g. "de") in local storage. By default, the header will use "swisspost-internet-header-language" as key to set the current language choice.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'swisspost-internet-header-language',
        },
      },
    },
    'environment': {
      name: 'Environment',
      control: {
        type: 'select',
      },
      options: ['int01', 'int02', 'prod'],
      description:
        'Set your environment. This is used to load the correct config file from the post portal.',
      table: {
        type: {
          summary: 'int01 | int02 | prod',
        },
        defaultValue: {
          summary: 'prod',
        },
      },
    },
    'stickyness': {
      name: 'Stickyness',
      control: {
        type: 'select',
        labels: { none: 'none', minimal: 'minimal', main: 'main', full: 'full (deprecated)' },
      },
      options: ['none', 'minimal', 'main', 'full'],
      description:
        '**None**: No part of the header is ever sticky, you have to scroll back to the top to use the navigation. \n\r **Minimal**: The header disappears when scrolling down. When scrollin up, only the main part of the header becomes visible. \n\r **Main**: The main part of the navigation is always sticky, the meta navigation will be hidden when scrolling down. To use the meta navigation, the user has to scroll back to the top. \n\r **Full**: The whole header is always sticky.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'minimal',
        },
      },
    },
    'login': {
      name: 'Login',
      control: {
        type: 'boolean',
      },
      description: 'Show or hide the KLP Login Widget',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    'search': {
      name: 'Search',
      control: {
        type: 'boolean',
      },
      description: 'Show or hide the search dropdown',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    'meta': {
      name: 'Meta',
      control: {
        type: 'boolean',
      },
      description: 'Show or hide the meta navigation',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    'skiplinks': {
      name: 'Skiplinks',
      control: {
        type: 'boolean',
      },
      description: 'Render the skiplinks',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    'language-switch-overrides': {
      name: 'Language Switch Overrides',
      control: {
        type: 'object',
      },
      description:
        'Override the language config with custom language settings, most likely links to translated pages. If **url** is set, the page will be reloaded on click. If URL is not set or set to null, the event `languageChanged` will be thrown on `<swisspost-internet-header />`. You can listen to this event by adding an event listener to the header:\r\n`document.querySelector("swisspost-internet-header").addEventListener("languageChanged", (event) => console.log(event.detail))`',
      table: {
        type: {
          summary: '{ lang: string, url?: string, title?: string, text?: string }',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    'custom-config': {
      name: 'Custom Config',
      control: {
        type: 'object',
      },
      description: 'Allows for custom menu entries or custom links in the footer',
      table: {
        type: {
          summary: '{ [key: "de" | "fr" | "it" | "en"]: { ... }',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    'active-route': {
      name: 'Active Route',
      control: {
        type: 'text',
      },
      options: [
        false,
        'auto',
        'https://post.ch/de/briefe-versenden/flyer',
        'https://post.ch/de/kundencenter/kundencenter',
      ],
      description:
        "Choose how the header should highlight the active route. \n\r **false**: The header won't try to highlight the active route. The Post Portal Config might still choose to highlight a navigation element. \n\r **auto**: If the Post Portal Config sets any highlights they will apply. As a fallback, the Internet Header will try to figure out the currently active route by matching the current URL to all navigation links. Partial matches are possible if the current URL is deeper than the navigation link. \n\r **exact**: A link in the navigation has to exactly match the current browser URL to be highlighted. \n\r **[string]**: You can specify a current route to match against the navigation links for maximum flexibility. This setting will take precedence over the Post Portal Conifg settings.",
      table: {
        type: {
          summary: 'false | "auto" | "exact" | string',
        },
        defaultValue: {
          summary: '"auto"',
        },
      },
    },
    'os-flyout-overrides': {
      name: 'OS-Flyout Overrides',
      control: {
        type: 'object',
      },
      description: 'Allows for custom menu entries in the special online-service flyout',
      table: {
        type: {
          summary: `{
              title: string,
              text: string,
              flyout: Array<{
                title: string,
                linkList: Array<{url: string, title: string }>
              }>
            }`,
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    'full-width': {
      name: 'Full Width',
      control: {
        type: 'boolean',
      },
      description: 'Display the header at full width instead of containerized.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta;

const Template = (args: Args) => {
  // Filter arguments that don't need to be rendered
  const filteredArgs = filterArgs(args, arg => arg !== null && arg !== undefined);
  return (
    <div className="page-wrapper">
      <swisspost-internet-header {...filteredArgs} />
      <main className="container mt-huge-r">
        <swisspost-internet-breadcrumbs />
        <h1 className="mt-huge-r mb-big-r bold">Design System Internet Header</h1>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  );
};

export const Default: Story = Template.bind({});

export const CustomNavigation: Story = Template.bind({});
CustomNavigation.args = {
  'custom-config': {
    de: {
      header: {
        navMain: [
          {
            title: 'Meine Links (custom config)',
            text: 'Meine Links',
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
};

export const CustomOnlineServiceFlyout: Story = Template.bind({});
CustomOnlineServiceFlyout.args = {
  'os-flyout-overrides': {
    title: 'Custom OS Flyout',
    text: 'Custom OS Flyout',
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
};

export const FullWidth: Story = Template.bind({});
FullWidth.args = {
  'full-width': true,
};
