import { renderAudience } from '@/stories/components/header/renderers/audience';
import { renderGlobalNavSecondary } from '@/stories/components/header/renderers/global-nav-secondary';
import { renderJobControls } from '@/stories/components/header/renderers/job-controls';
import { renderMainnavigation } from '@/stories/components/header/renderers/main-navigation';
import { renderMicrositeControls } from '@/stories/components/header/renderers/microsite-controls';
import { renderTitle } from '@/stories/components/header/renderers/title';
import { renderUserMenu } from '@/stories/components/header/renderers/user-menu';
import { fakeContent } from '@/utils';
import { renderLoginLink } from '@root/src/stories/components/header/renderers/login-link';
import { MetaComponent } from '@root/types';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, TemplateResult } from 'lit';

const meta: MetaComponent = {
  id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
  title: 'Components/Header',
  tags: ['package:WebComponents'],
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
    isLoggedIn: false,
    jobs: false,
    fullWidth: false,
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
        'Whether or not application-specific controls are displayed ("search" and "login").',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
      if: {
        arg: 'jobs',
        truthy: false,
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
  },
  decorators: [
    story =>
      html` <div class="header-story-wrapper">
        <div class="virtual-body">${story()} ${fakeContent()}</div>
      </div>`,
  ],
  render: getHeaderRenderer(),
};

function getHeaderRenderer(
  subComponents: {
    mainnavigation?: TemplateResult;
    loginLink?: TemplateResult;
    userMenu?: TemplateResult;
    title?: TemplateResult;
  } = {},
) {
  return (args: Args) => {
    const mainnavigation = subComponents.mainnavigation ?? renderMainnavigation();
    const loginLink = subComponents.loginLink ?? renderLoginLink();
    const userMenu = subComponents.userMenu ?? renderUserMenu();
    const title = subComponents.title ?? renderTitle(args);

    const globalLogin = args.isLoggedIn ? userMenu : loginLink;

    const globalControls = html`
      <!-- Global controls (Search) -->
      <ul slot="global-nav-primary">
        <li>
          <a href="">
            <span>Search</span>
            <post-icon aria-hidden="true" name="search"></post-icon>
          </a>
        </li>
      </ul>
    `;

    return html`
      <post-header text-menu="${args.textMenu}" full-width="${args.fullWidth || nothing}">
        <!-- Logo -->
        <post-logo slot="post-logo" url="/">Homepage</post-logo>

        ${args.targetGroup ? renderAudience(args) : nothing}
        ${args.globalNavPrimary && !args.jobs ? globalControls : nothing}
        ${args.globalNavSecondary ? renderGlobalNavSecondary(args) : nothing}

        <!-- Language menu -->
        <post-language-menu
          text-change-language="Change the language"
          text-current-language="The currently selected language is #name."
          name="language-menu-example"
          slot="language-menu"
        >
          <post-language-menu-item code="de" name="German">de</post-language-menu-item>
          <post-language-menu-item code="fr" name="French">fr</post-language-menu-item>
          <post-language-menu-item code="it" name="Italian">it</post-language-menu-item>
          <post-language-menu-item active="true" code="en" name="English"
            >en</post-language-menu-item
          >
        </post-language-menu>

        ${!args.title && !args.jobs ? globalLogin : nothing} ${args.title !== '' ? title : nothing}
        ${args.localNav ? renderMicrositeControls(args) : nothing}
        ${args.mainNav ? mainnavigation : nothing} ${args.jobs ? renderJobControls() : nothing}
      </post-header>
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
        mainnavigation: html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: () => renderMainnavigation({ showActiveLink: true, showMegadropdown: false }),
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
        title: html` ${story(context.args, context)} `,
      });
      return renderHeader(context.args);
    },
  ],
  render: renderTitle,
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
        userMenu: html` ${story(context.args, context)} `,
        mainnavigation: renderMainnavigation({ showMegadropdown: false }),
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
        loginLink: html` ${story(context.args, context)} `,
        mainnavigation: renderMainnavigation({ showMegadropdown: false }),
      });
      return renderHeader(context.args);
    },
  ],
  render: () => renderLoginLink(),
};
