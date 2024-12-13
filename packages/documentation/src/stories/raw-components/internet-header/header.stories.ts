import { Args, StoryContext, StoryObj, WebComponentsRenderer } from '@storybook/web-components';
import { html } from 'lit';
import { spreadArgs } from '@/utils';
import customConfig from './config/custom-config';
import osFlyoutOverrides from './config/os-flyout-overrides';
import languageSwitchOverrides from './config/language-switch-overrides';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'ebb11274-091b-4cb7-9a3f-3e0451c9a865',
  title: 'Raw Components/Internet Header',
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
            <p class="fake-content my-32"></p>
            <p class="fake-content my-32"></p>
            <p class="fake-content my-32"></p>
            <p class="fake-content my-32"></p>
            <p class="fake-content my-32"></p>
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

export const CssVariables = {
  render: (args: Args, context: StoryContext<WebComponentsRenderer>) => {
    return html`
      <style>
        #my-div {
          z-index: 1000;
          top: 0;
          transition: var(--post-header-slide-in-transition);
        }

        swisspost-internet-header.scrolling-up + #my-div {
          top: var(--post-header-height);
        }
      </style>
      ${meta.render && meta.render(args, context)}
      <p id="my-div" class="position-sticky bg-dark p-16">
        I am sticky! I am always positioned right below the header when you scroll up and down.
      </p>
    `;
  },
};

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
    innerHTML: `<p class="mx-16 mb-0" slot="main">Hello, User!</p>`,
  },
};
