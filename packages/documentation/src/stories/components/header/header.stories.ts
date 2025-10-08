import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html } from 'lit';
import { fakeContent } from '@/utils';

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
    mainNavigation: true,
    globalControls: true,
    metaNavigation: true,
    globalLogin: true,
    targetGroup: true,
    customControls: false,
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
    mainNavigation: {
      name: 'Main navigation',
      description: 'Whether or not the main navigation is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    globalControls: {
      name: 'Global controls',
      description: 'Whether or not the global controls are displayed (Search).',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    metaNavigation: {
      name: 'Meta navigation',
      description:
        'Whether or not the meta navigation is displayed (Jobs).',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    globalLogin: {
      name: 'Global login',
      description: 'Whether or not the global login button is displayed.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    targetGroup: {
      name: 'Target group',
      description: 'Whether or not the target group buttons are visible.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    customControls: {
      name: 'Custom controls',
      description: 'Whether or not the legacy custom controls are displayed (deprecated).',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
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

function getHeaderRenderer(mainnavigation = renderMainnavigation()) {
  return (args: Args) => html`<post-header>
    <!-- Logo -->
    <post-logo slot="post-logo" url="/">Homepage</post-logo>

    <!-- Global controls (Search) -->
    ${args.globalControls
      ? html`
          <ul class="list-inline" slot="global-controls">
            <li>
              <a href="">
                <span class="visually-hidden-sm">Search</span>
                <post-icon name="search" aria-hidden="true"></post-icon>
              </a>
            </li>
          </ul>
        `
      : ''}

    ${args.metaNavigation
      ? html`
          <!-- Meta navigation (Jobs) -->
          <ul class="list-inline" slot="meta-navigation">
            <li>
              <a href="">
                Jobs
                <post-icon name="jobs" aria-hidden="true"></post-icon>
              </a>
            </li>
          </ul>
        `
      : ''}

    <!-- Language switch -->
    <post-language-switch
      caption="Change the language"
      description="The currently selected language is English."
      variant="list"
      name="language-switch-example"
      slot="post-language-switch"
    >
      <post-language-option code="de" name="German">de</post-language-option>
      <post-language-option code="fr" name="French">fr</post-language-option>
      <post-language-option code="it" name="Italian">it</post-language-option>
      <post-language-option active="true" code="en" name="English">en</post-language-option>
    </post-language-switch>

    <!-- Global login -->
    ${args.globalLogin
      ? html`
          <ul class="list-inline" slot="global-login">
            <li>
              <a href="">
                <span class="visually-hidden-sm">Login</span>
                <post-icon name="login" aria-hidden="true"></post-icon>
              </a>
            </li>
          </ul>
        `
      : ''}

    <!-- Menu button for mobile -->
    <post-togglebutton slot="post-togglebutton">
      <span class="visually-hidden-sm">Menu</span>
      <post-icon aria-hidden="true" name="burger" data-showWhen="untoggled"></post-icon>
      <post-icon aria-hidden="true" name="closex" data-showWhen="toggled"></post-icon>
    </post-togglebutton>

    ${args.title !== ''
      ? html`
          <!-- Application title (optional) -->
          <h1 slot="title">${args.title}</h1>
        `
      : ''}
    ${args.targetGroup
      ? html`
          <ul slot="target-group" class="target-group">
            <li>
              <a href="#" class="active">Private customers</a>
            </li>
            <li>
              <a href="#">Business customers</a>
            </li>
          </ul>
        `
      : ''}
    ${args.customControls
      ? html`
          <!-- Custom content (optional) -->
          <ul class="list-inline">
            <li>
              <a href="#">
                <span class="visually-hidden-sm">Search</span>
                <post-icon aria-hidden="true" name="search"></post-icon>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="visually-hidden-sm">Login</span>
                <post-icon aria-hidden="true" name="login"></post-icon>
              </a>
            </li>
          </ul>
        `
      : ''}
    ${args.mainNavigation ? mainnavigation : ''}
  </post-header>`;
}

function renderMainnavigation() {
  return html`
    <!-- Main navigation -->
    <post-mainnavigation caption="Main navigation">
      <post-list title-hidden="">
        <h2>Main Navigation</h2>
        <!-- Link only level 1 -->
        <post-list-item slot="post-list-item">
          <a href="/letters">Letters</a>
        </post-list-item>
        <post-list-item slot="post-list-item">
          <a href="/packages">Packages</a>
        </post-list-item>

        <!-- Level 1 with megadropdown -->
        <post-list-item slot="post-list-item">
          <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
          <post-megadropdown id="letters">
            <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
              <post-icon name="arrowleft"></post-icon>
              Back
            </button>
            <post-closebutton slot="close-button">Close</post-closebutton>
            <h2 slot="megadropdown-title">Letters title</h2>
            <post-list>
              <h3>Send letters</h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Letters Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
            <post-list>
              <h3><a href="/step-by-step">Step by step</a></h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
          </post-megadropdown>
        </post-list-item>
        <post-list-item slot="post-list-item">
          <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
          <post-megadropdown id="packages">
            <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
              <post-icon name="arrowleft"></post-icon>
              Back
            </button>
            <post-closebutton slot="close-button">Close</post-closebutton>
            <h2 slot="megadropdown-title">Packages title</h2>
            <post-list>
              <h3>Send packages</h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
            <post-list>
              <h3><a href="/step-by-step">Step by step</a></h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
          </post-megadropdown>
        </post-list-item>
      </post-list>
    </post-mainnavigation>
  `;
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
      const renderHeader = getHeaderRenderer(html` ${story(context.args, context)} `);
      return renderHeader(context.args);
    },
  ],
  render: () => html`
    <post-mainnavigation caption="Main navigation">
      <post-list title-hidden="">
        <h2>Main Navigation</h2>
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

export const Microsite: Story = {
  ...getIframeParameters(550),
  args: {
    title: '[Microsite Title]',
    mainNavigation: true,
    globalControls: true,
    metaNavigation: false,
    globalLogin: true,
    targetGroup: false,
    customControls: false,
  },
};

export const OnePager: Story = {
  ...getIframeParameters(250),
  args: {
    title: '[One Pager Title]',
    mainNavigation: false,
    globalControls: false,
    metaNavigation: false,
    globalLogin: false,
    targetGroup: false,
    customControls: false,
  },
};

// Used in target group documentation
export const WithTargetGroup: Story = {
  args: {
    targetGroup: true,
  },
};
