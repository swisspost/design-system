import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../../../.storybook/constants';
import { html } from 'lit';
import { spreadArgs } from '../../../../../utils';
import customConfig from './config/custom-config';
import osFlyoutOverrides from './config/os-flyout-overrides';
import languageSwitchOverrides from './config/language-switch-overrides';

const meta: Meta = {
  title: 'Components/Internet Header/Header',
  component: 'swisspost-internet-header',
  parameters: {
    badges: [BADGE.STABLE],
    layout: 'fullscreen',
    controls: { sort: 'alpha' },
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
      control: {
        type: 'text',
      },
      table: {
        category: 'Optional props',
      },
    },
    configProxy: {
      control: false,
      table: {
        category: 'Deprecated',
      },
    },
    languageCookieKey: {
      control: false,
      table: {
        category: 'Optional props',
      },
    },
    logoutUrl: {
      control: false,
      table: {
        category: 'Optional props',
      },
    },
    languageLocalStorageKey: {
      control: false,
      table: {
        category: 'Optional props',
      },
    },
    login: {
      table: {
        category: 'Optional props',
      },
    },
    meta: {
      table: {
        category: 'Optional props',
      },
    },
    search: {
      table: {
        category: 'Optional props',
      },
    },
    skiplinks: {
      table: {
        category: 'Optional props',
      },
    },
    stickyness: {
      control: {
        labels: {
          full: 'full (deprecated, use "main")',
          minimal: 'minimal',
          main: 'main',
          none: 'none',
        },
      },
      table: {
        category: 'Optional props',
      },
    },
    language: {
      table: {
        category: 'Optional props',
      },
    },
    customConfig: {
      control: 'object',
      table: {
        category: 'Optional props',
        subcategory: 'Overrides',
        type: {
          summary: 'ICustomConfig',
          detail: JSON.stringify(customConfig),
        },
      },
    },
    languageSwitchOverrides: {
      control: {
        type: 'object',
      },
      table: {
        category: 'Optional props',
        subcategory: 'Overrides',
        type: {
          summary: 'IAvailableLanguage[]',
          detail: JSON.stringify(languageSwitchOverrides),
        },
      },
    },
    osFlyoutOverrides: {
      control: 'object',
      table: {
        category: 'Optional props',
        subcategory: 'Overrides',
        type: {
          summary: 'NavMainEntity',
          detail: JSON.stringify(osFlyoutOverrides),
        },
      },
    },
  },
  decorators: [
    story =>
      html`
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
  return html`
    <swisspost-internet-header ${spreadArgs(args)}></swisspost-internet-header>
  `;
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
