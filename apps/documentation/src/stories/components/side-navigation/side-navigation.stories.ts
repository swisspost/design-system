import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';
import { fakeContent } from '@/utils';
import { defaultNav, largeNav, smallNav } from './nav-content';
import { forceCompactAppearance } from '../../../../.storybook/helpers';

const meta: MetaComponent = {
  id: '9f26d86e-7edb-5804-ac96-92g22f91c9d9',
  title: 'Components/Side Navigation',
  tags: ['package:WebComponents'],
  component: 'post-side-navigation',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-V2?node-id=33106-167470',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
  args: {
    textClose: 'Close',
    showIcons: false,
    size: 'large',
  },
  argTypes: {
    textClose: {
      name: 'text-close',
      description: 'Accessible label for the close button shown in the mobile navigation dialog.',
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
    size: {
      name: 'size',
      description:
        'Controls the size of the navigation items. Choose "small" for deep and long navigation, and "large" (default) for a flat and short navigation.',

      control: {
        type: 'radio',
      },
    },
  },
  decorators: [
    forceCompactAppearance,
    story => html`
      <post-header text-menu="Menu">
        <post-logo slot="post-logo" url="/">Homepage</post-logo>
        <post-side-navigation-trigger slot="side-nav" for="sidenavigation">
          <button>
            <span>Menu</span>
            <post-icon aria-hidden="true" name="burger"></post-icon>
          </button>
        </post-side-navigation-trigger>
        <p slot="title">[Application Title]</p>
      </post-header>
      ${story()}
      <main class="main-container">
        <div class="d-flex virtual-body"></div>
      </main>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
  <post-side-navigation text-close="Close">
    <nav aria-label="Main navigation">
      ${defaultNav}
    </nav>
  </post-side-navigation>

  <main class="main-container">
    <!-- Page content -->
  </main>
`,
      },
    },
  },
  render: (args: Args) => html`
    <post-side-navigation ?size="${args.size}" id="sidenavigation" text-close="${args.textClose}">
      <nav aria-label="Main navigation">${unsafeHTML(defaultNav)}</nav>
    </post-side-navigation>

    <main class="main-container flex-grow-1">${fakeContent(4)}</main>
  `,
};

export const Small: Story = {
  render: (args: Args) => html`
    <post-side-navigation size="small" id="sidenavigation" text-close="${args.textClose}">
      <nav aria-label="Main navigation">${unsafeHTML(smallNav)}</nav>
    </post-side-navigation>

    <main class="main-container flex-grow-1">${fakeContent(4)}</main>
  `,
};

export const Large: Story = {
  render: (args: Args) => html`
    <post-side-navigation id="sidenavigation" text-close="${args.textClose}">
      <nav aria-label="Main navigation">${unsafeHTML(largeNav)}</nav>
    </post-side-navigation>

    <main class="main-container flex-grow-1">${fakeContent(4)}</main>
  `,
};

export const HeaderTrigger: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<post-header text-menu="Menu">
  ...
  <post-side-navigation-trigger slot="side-nav" for="sidenav">
    <button>
      <post-icon aria-hidden="true" name="burger"></post-icon>
    </button>
  </post-side-navigation-trigger>
  <p slot="title">[Application Title]</p>
  ...
</post-header>

<post-side-navigation id="sidenav" text-close="Close">
  ...
</post-side-navigation>

`,
      },
    },
  },
};
