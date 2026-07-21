import {
  renderLoginLink,
  renderMainnavigation,
  renderSideNavigation,
  renderTitle,
  renderUserMenu,
} from '@/stories/components/header/renderers';
import { fakeContent } from '@/utils';
import {
  getSlottedContent,
  SubComponentRenderers,
} from '@root/src/stories/components/header/utils';
import { MetaComponent } from '@root/types';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { forceCompactAppearance } from '../../../../.storybook/helpers';

const meta: MetaComponent = {
  id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
  title: 'Components/Header',
  tags: ['package:WebComponents', 'status:New'],
  component: 'post-header',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=ywmfJhyvd2euoiGI-1',
    },
  },
  args: {
    title: '',
    titleTag: 'p',
    mainNav: true,
    textMenu: 'Menu',
    globalNavSecondary: true,
    globalNavPrimary: true,
    targetGroup: true,
    postLogin: true,
    localNav: false,
    sideNav: false,
    isLoggedIn: false,
    jobs: false,
    fullWidth: false,
    languageMenu: true,
  },
  argTypes: {
    title: {
      name: 'Application title',
      description: 'Title of the webpage or application.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    titleTag: {
      name: 'Application title tag',
      description: 'HTML tag used for the title of the webpage or application.',
      control: {
        type: 'inline-radio',
      },
      options: ['p', 'h1'],
      if: {
        arg: 'title',
        neq: '',
      },
      table: {
        category: 'Content',
      },
    },
    textMenu: {
      description: 'The label of the burger menu button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    mainNav: {
      name: 'Main navigation',
      description: 'Whether or not the main navigation is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    globalNavPrimary: {
      name: 'Global primary navigation',
      description: 'Whether or not the search button in the global header is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    postLogin: {
      name: 'Post login',
      description: 'Whether or not the user menu or login button in the global header is displayed',
      control: {
        type: 'boolean',
      },
      if: { arg: 'title', eq: '' },
      table: {
        category: 'Content',
      },
    },
    globalNavSecondary: {
      name: 'Global secondary navigation',
      description:
        'Whether or not the global secondary navigation is displayed ("jobs" and "create an account").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    targetGroup: {
      name: 'Target group',
      description: 'Whether or not the audience buttons are visible.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    localNav: {
      name: 'Local controls',
      description:
        'Whether or not application-specific controls are displayed ("search" and "login"). Requires either the main navigation or a title to be present.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    sideNav: {
      name: 'Side navigation trigger',
      table: {
        disable: true,
      },
    },
    isLoggedIn: {
      name: 'Is logged in',
      description: 'Whether the user is logged in or not.',
      control: {
        type: 'boolean',
      },
      table: { category: 'state' },
    },
    jobs: {
      name: 'Jobs',
      description: 'Whether the jobs is active or not.',
      control: {
        type: 'boolean',
      },
      table: { category: 'state' },
    },
    languageMenu: {
      name: 'Language menu',
      description: 'Whether or not the language menu is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
  },
  decorators: [
    (story, context) => {
      const showSideNav = context.args.sideNav && context.args.title !== '';

      return html`
        <div class="header-story-wrapper">
          <div class="virtual-body">
            ${story()}
            ${showSideNav
              ? html`<main class="main-container">${fakeContent()}</main>`
              : html`<div>${fakeContent()}</div>`}
          </div>
        </div>
      `;
    },
  ],
  render: getHeaderRenderer(),
};

function getHeaderRenderer(subComponents: SubComponentRenderers = {}) {
  return (args: Args) => {
    return html`
      <post-header text-menu="${args.textMenu}" full-width="${args.fullWidth || nothing}">
        ${getSlottedContent(args, subComponents)}
      </post-header>

      ${args.sideNav && args.title !== '' ? renderSideNavigation() : nothing}
    `;
  };
}

function getIframeParameters(iframeHeight: number) {
  return {
    parameters: {
      docs: {
        story: {
          inline: false,
          iframeHeight,
        },
      },
    },
  };
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const ActiveNavigationItem: Story = {
  ...getIframeParameters(250),
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        renderMainnavigation: () => html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: (args: Args) =>
    renderMainnavigation({ ...args, showActiveLink: true, showMegadropdown: false }),
};

export const Portal: Story = {
  ...getIframeParameters(550),
};

export const Jobs: Story = {
  ...getIframeParameters(550),
  args: {
    jobs: true,
  },
};

export const Microsite: Story = {
  ...getIframeParameters(550),
  args: {
    title: '[Microsite Title]',
    mainNav: true,
    globalNavPrimary: false,
    globalNavSecondary: false,
    postLogin: false,
    targetGroup: false,
    localNav: true,
  },
};

export const OnePager: Story = {
  ...getIframeParameters(250),
  args: {
    title: '[One Pager Title]',
    mainNav: false,
    globalNavSecondary: false,
    globalNavPrimary: false,
    localNav: false,
    postLogin: false,
    targetGroup: false,
  },
};

export const OnePagerH1: Story = {
  ...getIframeParameters(250),
  args: {
    ...OnePager.args,
    titleTag: 'h1',
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        renderTitle: () => html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: renderTitle,
};

export const Application: Story = {
  ...getIframeParameters(250),
  decorators: [forceCompactAppearance],
  args: {
    title: '[Application Title]',
    mainNav: false,
    globalNavSecondary: false,
    globalNavPrimary: false,
    localNav: true,
    languageMenu: true,
    postLogin: false,
    targetGroup: false,
  },
};

export const ApplicationWithSideNavigation: Story = {
  args: {
    title: '[Application Title]',
    mainNav: false,
    globalNavSecondary: false,
    globalNavPrimary: false,
    localNav: true,
    languageMenu: false,
    sideNav: true,
    postLogin: false,
    targetGroup: false,
  },
  decorators: [forceCompactAppearance],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
      source: {
        code: `
<post-header text-menu="Menu">
  <post-logo slot="post-logo" url="/">Homepage</post-logo>
  <post-side-navigation-trigger slot="side-nav" for="sidenav">
    <button>
      <post-icon aria-hidden="true" name="burger"></post-icon>
    </button>
  </post-side-navigation-trigger>
  <p slot="title">[Application Title]</p>
</post-header>

<post-side-navigation id="sidenav" text-close="Close">
  <nav aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</post-side-navigation>

<main class="main-container">
  <!-- Page content -->
</main>
`,
      },
    },
  },
};

export const ApplicationWithSideNavigation: Story = {
  args: {
    title: '[Application Title]',
    mainNav: false,
    globalNavSecondary: false,
    globalNavPrimary: false,
    localNav: true,
    languageMenu: false,
    sideNav: true,
    postLogin: false,
    targetGroup: false,
  },
  decorators: [forceCompactAppearance],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
      source: {
        code: `
<post-header text-menu="Menu">
  <post-logo slot="post-logo" url="/">Homepage</post-logo>
  <post-side-navigation-trigger slot="side-nav" for="sidenav">
    <button>
      <post-icon aria-hidden="true" name="burger"></post-icon>
    </button>
  </post-side-navigation-trigger>
  <p slot="title">[Application Title]</p>
</post-header>

<post-side-navigation id="sidenav" text-close="Close">
  <nav aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</post-side-navigation>

<main class="main-container">
  <!-- Page content -->
</main>
`,
      },
    },
  },
};

// User is logged in
export const LoggedIn: Story = {
  ...getIframeParameters(400),
  args: {
    isLoggedIn: true,
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        renderUserMenu: () => html` ${story(context.args, context)} `,
        renderMainnavigation: () => renderMainnavigation({ showMegadropdown: false }),
      });
      return renderHeader(context.args);
    },
  ],
  render: () => renderUserMenu(),
};

// User is logged out
export const LoggedOut: Story = {
  ...getIframeParameters(200),
  args: {
    isLoggedIn: false,
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const renderHeader = getHeaderRenderer({
        renderLoginLink: () => html` ${story(context.args, context)} `,
        renderMainnavigation: () => renderMainnavigation({ showMegadropdown: false }),
      });
      return renderHeader(context.args);
    },
  ],
  render: () => renderLoginLink(),
};
