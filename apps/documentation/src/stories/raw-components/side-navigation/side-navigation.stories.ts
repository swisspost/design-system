import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';
import { fakeContent } from '@/utils';
import { activeItem, deepNesting, defaultNav, withIcons } from './side-navigation.examples';

// Shared ID so the decorator's trigger and the story's side-navigation stay in sync
const navigationId = crypto.randomUUID();

const meta: MetaComponent = {
  id: '9f26d86e-7edb-5804-ac96-92g22f91c9d9',
  title: 'Raw Components/Side Navigation',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-side-navigation',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    docs: {
      story: {
        inline: false,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=14478-28019',
    },
  },
  args: {
    textClose: 'Close',
  },
  argTypes: {
    textClose: {
      name: 'text-close',
      description: 'Accessible label for the close button shown in the mobile navigation dialog.',
      table: {
        category: 'Props',
      },
    },
  },
  decorators: [
    story =>
      html`<div class="side-nav-story-wrapper">
        <post-header text-menu="Menu">
          <post-logo slot="post-logo" url="/">Homepage</post-logo>
          <p slot="title">[Application Title]</p>
          <ul slot="local-nav">
            <li>
              <post-side-navigation-trigger for="${navigationId}">
                <button>
                  <span>Menu</span>
                  <post-icon aria-hidden="true" name="burger"></post-icon>
                </button>
              </post-side-navigation-trigger>
            </li>
            <li>
              <a href="#">
                <span>Search</span>
                <post-icon aria-hidden="true" name="search"></post-icon>
              </a>
            </li>
            <li class="local-login">
              <a href="">
                <span>Login</span>
                <post-icon name="login"></post-icon>
              </a>
            </li>
          </ul>
        </post-header>
        <div class="d-flex virtual-body">
          ${story()}
        </div>
      </div>`,
  ],
};

export default meta;

// HELPERS

function storySource(navContent: string, iframeHeight = 500) {
  return {
    docs: {
      story: {
        iframeHeight,
      },
      source: {
        code: `
<div class="d-flex">
  <post-side-navigation text-close="Close" class="flex-shrink-0">
    <nav aria-label="Main navigation">
${navContent}
    </nav>
  </post-side-navigation>

  <main class="flex-grow-1">
    <!-- The content of your page comes here -->
  </main>
</div>
        `,
      },
    },
  };
}

// RENDERERS

function renderWithLayout(navContent: string, args: Args, fakeContentCount = 6) {
  return html`
    <post-side-navigation id="${navigationId}" text-close="${args.textClose}">
      <nav aria-label="Main navigation">
        ${unsafeHTML(navContent)}
      </nav>
    </post-side-navigation>

    <main class="flex-grow-1">
      ${fakeContent(fakeContentCount)}
    </main>
  `;
}

// STORIES

type Story = StoryObj;

/**
 * Default: Composed example showing all navigation patterns
 */
export const Default: Story = {
  parameters: storySource(defaultNav, 800),
  render: (args: Args) => renderWithLayout(defaultNav, args, 4),
};

/**
 * Deep Nesting: Shows navigation with maximum depth (4 levels)
 */
export const DeepNesting: Story = {
  parameters: storySource(deepNesting, 500),
  render: (args: Args) => renderWithLayout(deepNesting, args, 3),
};

/**
 * With Icons: Navigation items with icons on level 1
 */
export const WithIcons: Story = {
  parameters: storySource(withIcons, 500),
  render: (args: Args) => renderWithLayout(withIcons, args, 3),
};

/**
 * Active Navigation Item: Shows aria-current="page" usage
 */
export const ActiveNavigationItem: Story = {
  parameters: storySource(`<ul>${activeItem}</ul>`, 400),
  render: (args: Args) => renderWithLayout(`<ul>${activeItem}</ul>`, args, 2),
};