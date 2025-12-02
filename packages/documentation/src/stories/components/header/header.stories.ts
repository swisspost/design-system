import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html, nothing, TemplateResult } from 'lit';
import { fakeContent } from '@/utils';
import { renderMainnavigation } from '@/stories/components/header/renderers/main-navigation';
import { renderGlobalNavSecondary } from '@/stories/components/header/renderers/global-nav-secondary';
import { renderAudience } from '@/stories/components/header/renderers/audience';
import { renderMicrositeControls } from '@/stories/components/header/renderers/microsite-controls';
import { renderJobControls } from '@/stories/components/header/renderers/job-controls';
import { renderUserMenu } from '@/stories/components/header/renderers/user-menu';
import { renderTitle } from '@/stories/components/header/renderers/title';

const meta: MetaComponent = {
  id: '27a2e64d-55ba-492d-ab79-5f7c5e818498',
  title: 'Components/Header',
  tags: ['package:WebComponents', 'status:InProgress'],
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
    globalNavSecondary: true,
    globalNavPrimary: true,
    audience: true,
    postLogin: true,
    localNav: false,
    isLoggedIn: false,
    jobs: false,
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
    audience: {
      name: 'Audience',
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
    userMenu?: TemplateResult;
    title?: TemplateResult;
  } = {},
) {
  return (args: Args) => {
    const mainnavigation = subComponents.mainnavigation ?? renderMainnavigation();
    const userMenu = subComponents.userMenu ?? renderUserMenu();
    const title = subComponents.title ?? renderTitle(args);

    const globalLogin = args.isLoggedIn
      ? html` <div slot="post-login">${userMenu}</div> `
      : html`
          <a href="" slot="post-login">
            <span>Login</span>
            <post-icon name="login"></post-icon>
          </a>
        `;

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
      <post-header>
        <!-- Logo -->
        <post-logo slot="post-logo" url="/">Homepage</post-logo>

        ${audienceEnabled ? renderAudience(args) : nothing}
        ${globalNavPrimaryEnabled && !args.jobs ? globalControls : nothing}
        ${globalNavSecondaryEnabled ? renderGlobalNavSecondary(args) : nothing}

        <!-- Language switch -->
        <post-language-switch
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
          name="language-switch-example"
          slot="language-menu"
        >
          <post-language-option code="de" name="German">de</post-language-option>
          <post-language-option code="fr" name="French">fr</post-language-option>
          <post-language-option code="it" name="Italian">it</post-language-option>
          <post-language-option active="true" code="en" name="English">en</post-language-option>
        </post-language-switch>

        ${!args.title && !args.jobs
          ? html`
              <!-- Global header login/user menu -->
              ${globalLogin}
            `
          : nothing}

        <!-- Menu button for mobile -->
        <post-togglebutton slot="post-togglebutton">
          <span>Menu</span>
          <post-icon aria-hidden="true" name="burger" data-showWhen="untoggled"></post-icon>
          <post-icon aria-hidden="true" name="closex" data-showWhen="toggled"></post-icon>
        </post-togglebutton>

        ${args.title !== '' ? title : nothing}
        ${args.localNav ? renderMicrositeControls(args) : nothing}
        ${args.mainNavigation ? mainnavigation : nothing}
        ${args.jobs ? renderJobControls() : nothing}
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
  render: () => html`
    <post-mainnavigation slot="main-nav" caption="Main navigation">
      <post-list title-hidden="">
        <p>Main Navigation</p>
        <post-list-item slot="post-list-item">
          <a href="/letters">Letters</a>
        </post-list-item>

        <post-list-item slot="post-list-item">
          <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
          <a href="/packages" aria-current="page">Packages</a>
        </post-list-item>
      </post-list>
    </post-mainnavigation>
  `,
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
    audience: false,
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
    audience: false,
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

// Used in target group documentation
export const WithTargetGroup: Story = {
  args: {
    audience: true,
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
        userMenu: html` ${story(context.args, context)} `,
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
};
