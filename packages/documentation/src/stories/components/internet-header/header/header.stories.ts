import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { addDeprecation, spreadArgs } from '@/utils';
import customConfig from './config/custom-config';
import osFlyoutOverrides from './config/os-flyout-overrides';
import languageSwitchOverrides from './config/language-switch-overrides';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'ebb11274-091b-4cb7-9a3f-3e0451c9a865',
  title: 'Components/Internet Header/Header',
  tags: ['package:InternetHeader'],
  component: 'swisspost-internet-header',
  parameters: {
    badges: [],
    layout: 'fullscreen',
    controls: { sort: 'alpha' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=19536-26512&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
  render,
  args: {
    project: 'test',
    environment: 'int01',
    language: 'en',
  },
  argTypes: {
    project: {
      control: false,
      table: {
        category: 'Required props',
      },
      type: {
        name: 'string',
        required: true,
      },
    },
    environment: {
      control: false,
      table: {
        category: 'Optional props',
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Optional props',
      },
    },
    activeRoute: {
      description: addDeprecation('swisspost-internet-header', 'activeRoute', 'boolean values will no longer be accepted in the next major release. Use "none" for false and "auto" for true. All other values remain unchanged.'),
      control: {
        type: 'text',
      },
      table: {
        category: 'Optional props',
      },
    },
    configProxy: {
      description: addDeprecation('swisspost-internet-header', 'configProxy', 'this functionality will no longer be provided in the next major release and was deprecated previously.'),
      control: false,
      table: {
        category: 'Deprecated props',
      },
    },
    languageCookieKey: {
      description: addDeprecation('swisspost-internet-header', 'languageCookieKey', 'this will no longer be supported in the next major release due to low usage, in favor of a project-specific solution.'),
      control: false,
      table: {
        category: 'Deprecated props',
      },
    },
    logoutUrl: {
      description: addDeprecation('swisspost-internet-header', 'logoutUrl', 'use the new configuration API to specify the logout URL. This option will be removed in the next major release.'),
      control: false,
      table: {
        category: 'Deprecated props',
      },
    },
    languageLocalStorageKey: {
      description: addDeprecation('swisspost-internet-header', 'languageLocalStorageKey', 'this will no longer be supported in the next major release due to low usage, in favor of a project-specific solution.'),
      control: false,
      table: {
        category: 'Deprecated props',
      },
    },
    login: {
      description: addDeprecation('swisspost-internet-header', 'login', 'use the new configuration API to show or hide the login. This option will be removed in the next major release.'),
      table: {
        category: 'Deprecated props',
      },
    },
    meta: {
      description: addDeprecation('swisspost-internet-header', 'meta', 'use the new configuration API to show or hide the meta navigation links. This option will be removed in the next major release.'),
      table: {
        category: 'Deprecated props',
      },
    },
    search: {
      description: addDeprecation('swisspost-internet-header', 'search', 'use the new configuration API to show or hide the search. This option will be removed in the next major release.'),
      table: {
        category: 'Deprecated props',
      },
    },
    skiplinks: {
      description: addDeprecation('swisspost-internet-header', 'skiplinks', 'please implement the skiplinks component. This option will be removed in the next major release.'),
      table: {
        category: 'Deprecated props',
      },
    },
    stickyness: {
      description: addDeprecation('swisspost-internet-header', 'stickyness', 'this option will no longer be configurable with the new header in the next major release.'),
      control: {
        labels: {
          full: 'full',
          minimal: 'minimal',
          main: 'main',
          none: 'none',
        },
      },
      table: {
        category: 'Deprecated props',
      },
    },
    language: {
      table: {
        category: 'Optional props',
      },
    },
    customConfig: {
      description: addDeprecation('swisspost-internet-header', 'customConfig', 'use the main navigation slot to add custom menu entries. This option will be removed in the next major release.'),
      control: 'object',
      table: {
        category: 'Deprecated props',
        type: {
          summary: 'ICustomConfig',
          detail: JSON.stringify(customConfig),
        },
      },
    },
    selfAdminOrigin: {
      description: addDeprecation('swisspost-internet-header', 'selfAdminOrigin', 'use the new configuration API to specify these URLs. This option will be removed in the next major release.'),
      control: {
        type: 'text',
      },
      table: {
        category: 'Deprecated props',
      },
    },
    languageSwitchOverrides: {
      description: addDeprecation('swisspost-internet-header', 'languageSwitchOverrides', 'use the language menu slot to override the language switch and specify custom URLs. This option will be removed in the next major release.'),
      control: {
        type: 'object',
      },
      table: {
        category: 'Deprecated props',
        type: {
          summary: 'IAvailableLanguage[]',
          detail: JSON.stringify(languageSwitchOverrides),
        },
      },
    },
    osFlyoutOverrides: {
      description: addDeprecation('swisspost-internet-header', 'stickyness', 'the new header will no longer include this flyout in the next major release. Use the main navigation slot to add application-specific menu items.'),
      control: 'object',
      table: {
        category: 'Deprecated props',
        type: {
          summary: 'NavMainEntity',
          detail: JSON.stringify(osFlyoutOverrides),
        },
      },
    },
    'method-getCurrentLanguage': {
      name: 'getCurrentLanguage',
      description: addDeprecation('swisspost-internet-header', 'getCurrentLanguage', 'use `document.documentElement.lang` instead.')
    }
  },
  decorators: [
    story => html`
      <div
        class="header-story-wrapper"
        style="--header-z-index: 1;overflow: auto;max-height: 100svh;"
      >
        ${story()}
        <div class="container">
          <p class="fake-content my-big"></p>
          <p class="fake-content my-big"></p>
          <p class="fake-content my-big"></p>
          <p class="fake-content my-big"></p>
          <p class="fake-content my-big"></p>
        </div>
      </div>
    `,
  ],
};

function render({ innerHMTL, ...args }: Args) {
  return html` <swisspost-internet-header ${spreadArgs(args)}></swisspost-internet-header> `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const LanguageSwitchOverrides: Story = {
  args: {
    languageSwitchOverrides,
  },
  parameters: {
    controls: {
      include: ['languageSwitchOverrides'],
    },
  },
};

export const CustomConfig: Story = {
  args: {
    customConfig,
  },
  parameters: {
    controls: {
      include: ['customConfig'],
    },
  },
};

export const OSFlyoutOverrides: Story = {
  args: {
    osFlyoutOverrides,
  },
  parameters: {
    controls: {
      include: ['osFlyoutOverrides'],
    },
  },
};

export const CustomContent: Story = {
  args: {
    innerHTML: `<p class="mx-regular mb-0" slot="main">Hello, User!</p>`,
  },
};
