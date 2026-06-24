import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';
import { fakeContent } from '@/utils';
import { defaultNav } from './nav-content';
import { forceCompactAppearance } from '../../../../.storybook/helpers';

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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=14478-28019',
    },
  },
  args: {
    textClose: 'Close',
    showIcons: false,
  },
  argTypes: {
    textClose: {
      name: 'text-close',
      description: 'Accessible label for the close button shown in the mobile navigation dialog.',
      table: {
        category: 'Props',
      },
    },
    showIcons: {
      name: 'Show icons',
      description:
        'Prepend an icon to every level-1 navigation item.' +
        '<post-banner data-size="sm"><p>' +
        '<strong>Level-1 only:</strong> never use icons on levels 2, 3, or 4.<br/>' +
        '<strong>All or none:</strong> apply icons to all level-1 items or none, do not mix.' +
        '</p></post-banner>',
      control: { type: 'boolean' },
      table: {
        category: 'Content',
      },
    },
  },
  decorators: [
    forceCompactAppearance,
    story => html`
      <div class="side-nav-story-wrapper">
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
      </div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div class="d-flex">
  <post-side-navigation text-close="Close">
    <nav aria-label="Main navigation">
      ${defaultNav(false)}
    </nav>
  </post-side-navigation>

  <main class="flex-grow-1">
    <!-- Page content -->
  </main>
</div>`,
      },
    },
  },
  render: (args: Args) => html`
    <post-side-navigation id="${navigationId}" text-close="${args.textClose}">
      <nav aria-label="Main navigation">
        ${unsafeHTML(defaultNav(args.showIcons))}
      </nav>
    </post-side-navigation>

    <main class="flex-grow-1">
      ${fakeContent(4)}
    </main>
  `,
};