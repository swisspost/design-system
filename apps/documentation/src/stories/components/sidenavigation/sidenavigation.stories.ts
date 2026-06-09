import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8d15c75d-3cda-4793-9b85-81f11cabb81c',
  title: 'Components/Side Navigation',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-sidenavigation',
  parameters: {
    badges: [],
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
  render,
};

export default meta;

// RENDERERS

// Renders the trigger together with the navigation, so the copied snippet is complete:
// on mobile/tablet the trigger opens the dialog, on desktop it is hidden and the
// navigation is shown inline. The navigation is authored by the consumer: a <nav> with a
// heading linked via aria-labelledby, <ul>/<li> lists and the .post-sidenavigation-* classes.
export function renderSidenav(navContent: TemplateResult, args: Args, navId?: string, ariaLabel?: string) {
  const resolvedId = navId ?? crypto.randomUUID();
  const titleId = `${resolvedId}-title`;

  return html`
    <post-sidenavigation-trigger for="${resolvedId}">
      <button>
        <span>Menu</span>
        <post-icon aria-hidden="true" name="burger"></post-icon>
      </button>
    </post-sidenavigation-trigger>

    <post-sidenavigation id="${resolvedId}" text-close="${args.textClose}">
      <nav
        aria-labelledby="${ariaLabel ? nothing : titleId}"
        aria-label="${ariaLabel ?? nothing}"
      >
        <h2 id="${titleId}" class="post-sidenavigation-heading">Section title</h2>
        <ul>
          ${navContent}
        </ul>
      </nav>
    </post-sidenavigation>
  `;
}

export const DefaultNavContent = html`
  <li><a href="#" class="post-sidenavigation-item">Sidenav link</a></li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="search" aria-hidden="true"></post-icon>
      Sidenav link with icon
    </a>
  </li>
  <li>
    <a href="#" class="post-sidenavigation-item">Sidenav link with children</a>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
`;

const linkOnly = html`
  <li><a href="#" class="post-sidenavigation-item">Sidenav link</a></li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="search" aria-hidden="true"></post-icon>
      Sidenav link with icon
    </a>
  </li>
`;

const nested = html`
  <li>
    <a href="#" class="post-sidenavigation-item">Sidenav link with children</a>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
`;

const collapsibleNotLinked = html`
  <li>
    <post-collapsible-trigger for="section-collapsible">
      <button class="post-sidenavigation-item">
        Sidenav level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
    </post-collapsible-trigger>
    <post-collapsible id="section-collapsible">
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
        <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      </ul>
    </post-collapsible>
  </li>
`;

const collapsibleLinked = html`
  <li>
    <div class="post-sidenavigation-item">
      <a href="#">Sidenav link</a>
      <post-collapsible-trigger for="section-linked">
        <button>
          <span class="visually-hidden">Expand Sidenav link</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-collapsible-trigger>
    </div>
    <post-collapsible id="section-linked">
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
        <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      </ul>
    </post-collapsible>
  </li>
`;

// Deep nesting: a level can mix links with a collapsible that reveals the next
// level. Indentation grows per level. No leading icons here, so the steps read
// cleanly (an icon would shift the label and blur the nesting).
const deeplyNested = html`
  <li>
    <post-collapsible-trigger for="deep-level-1">
      <button class="post-sidenavigation-item">
        Level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
    </post-collapsible-trigger>
    <post-collapsible id="deep-level-1">
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Level 2 link</a></li>
        <li><a href="#" class="post-sidenavigation-item">Level 2 link</a></li>
        <li>
          <post-collapsible-trigger for="deep-level-2">
            <button class="post-sidenavigation-item">
              Level 2
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
          </post-collapsible-trigger>
          <post-collapsible id="deep-level-2">
            <ul>
              <li><a href="#" class="post-sidenavigation-item">Level 3 link</a></li>
              <li>
                <post-collapsible-trigger for="deep-level-3">
                  <button class="post-sidenavigation-item">
                    Level 3
                    <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                  </button>
                </post-collapsible-trigger>
                <post-collapsible id="deep-level-3">
                  <ul>
                    <li><a href="#" class="post-sidenavigation-item">Level 4 link</a></li>
                  </ul>
                </post-collapsible>
              </li>
            </ul>
          </post-collapsible>
        </li>
      </ul>
    </post-collapsible>
  </li>
`;

function render(args: Args) {
  return renderSidenav(
    html`${linkOnly}${nested}${collapsibleNotLinked}${collapsibleLinked}${deeplyNested}`,
    args,
  );
}

// STORIES

type Story = StoryObj;

export const Default: Story = {};

export const LinkOnly: Story = {
  render: (args: Args) => renderSidenav(linkOnly, args),
};

export const Nested: Story = {
  render: (args: Args) => renderSidenav(nested, args),
};

export const CollapsibleNotLinked: Story = {
  render: (args: Args) => renderSidenav(collapsibleNotLinked, args),
};

export const CollapsibleLinked: Story = {
  render: (args: Args) => renderSidenav(collapsibleLinked, args),
};

export const ActiveNavigationItem: Story = {
  render: (args: Args) =>
    renderSidenav(
      html`
        <li><a href="#" class="post-sidenavigation-item">Sidenav link</a></li>
        <li>
          <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
          <a href="#" class="post-sidenavigation-item" aria-current="page">Sidenav link</a>
        </li>
      `,
      args,
    ),
};

// Realistic integration: the trigger sits in the header on mobile/tablet,
// while the navigation lives in the page body.
export const InHeader: Story = {
  render: (args: Args) => html`
    <post-header text-menu="Menu">
      <post-logo slot="post-logo" url="/">Homepage</post-logo>
      <p slot="title">Application title</p>

      <ul slot="local-nav">
        <li>
          <post-sidenavigation-trigger for="sidenav">
            <button>
              <span>Menu</span>
              <post-icon aria-hidden="true" name="burger"></post-icon>
            </button>
          </post-sidenavigation-trigger>
        </li>
      </ul>
    </post-header>

    <post-sidenavigation id="sidenav" text-close="${args.textClose}">
      <nav aria-labelledby="sidenav-title-header">
        <h2 id="sidenav-title-header" class="post-sidenavigation-heading">Section title</h2>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Sidenav link</a></li>
          <li><a href="#" class="post-sidenavigation-item">Sidenav link</a></li>
          <li>
            <post-collapsible-trigger for="section-header">
              <button class="post-sidenavigation-item">
                Sidenav level 1
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
            </post-collapsible-trigger>
            <post-collapsible id="section-header">
              <ul>
                <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
                <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
              </ul>
            </post-collapsible>
          </li>
        </ul>
      </nav>
    </post-sidenavigation>
  `,
};