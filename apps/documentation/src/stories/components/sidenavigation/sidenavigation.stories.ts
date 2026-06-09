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

// All level-1 items have icons — Figma rule: either all or none on a given level.
const linkOnly = html`
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="letter" aria-hidden="true"></post-icon>
      Letters
    </a>
  </li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="package" aria-hidden="true"></post-icon>
      Packages
    </a>
  </li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="search" aria-hidden="true"></post-icon>
      Search
    </a>
  </li>
`;

// Expandable but not navigable — button only, no link on level 1.
const collapsibleNotLinked = html`
  <li>
    <post-collapsible-trigger for="section-collapsible-1">
      <button class="post-sidenavigation-item">
        Level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
    </post-collapsible-trigger>
    <post-collapsible id="section-collapsible-1">
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
      </ul>
    </post-collapsible>
  </li>
  <li>
    <post-collapsible-trigger for="section-collapsible-2">
      <button class="post-sidenavigation-item">
        Level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
    </post-collapsible-trigger>
    <post-collapsible id="section-collapsible-2" collapsed>
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
      </ul>
    </post-collapsible>
  </li>
`;

// Expandable and navigable — link + separate chevron button on level 1.
const collapsibleLinked = html`
  <li>
    <div class="post-sidenavigation-item">
      <a href="#">Level 1</a>
      <post-collapsible-trigger for="section-linked-1">
        <button>
          <span class="visually-hidden">Expand Level 1</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-collapsible-trigger>
    </div>
    <post-collapsible id="section-linked-1">
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
      </ul>
    </post-collapsible>
  </li>
  <li>
    <div class="post-sidenavigation-item">
      <a href="#">Level 1</a>
      <post-collapsible-trigger for="section-linked-2">
        <button>
          <span class="visually-hidden">Expand Level 1</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-collapsible-trigger>
    </div>
    <post-collapsible id="section-linked-2" collapsed>
      <ul>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
      </ul>
    </post-collapsible>
  </li>
`;

// Default: no icons, two sections, one item expanded to show all 4 levels.
function render(args: Args) {
  const resolvedId = crypto.randomUUID();
  const titleId = `${resolvedId}-title`;

  return html`
    <post-sidenavigation-trigger for="${resolvedId}">
      <button>
        <span>Menu</span>
        <post-icon aria-hidden="true" name="burger"></post-icon>
      </button>
    </post-sidenavigation-trigger>

    <post-sidenavigation id="${resolvedId}" text-close="${args.textClose}">
      <nav aria-labelledby="${titleId}">
        <h2 id="${titleId}" class="post-sidenavigation-heading">Section title</h2>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
          <li>
            <post-collapsible-trigger for="default-1">
              <button class="post-sidenavigation-item">
                Level 1
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
            </post-collapsible-trigger>
            <post-collapsible id="default-1">
              <ul>
                <li>
                  <post-collapsible-trigger for="default-2">
                    <button class="post-sidenavigation-item">
                      Level 2
                      <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                    </button>
                  </post-collapsible-trigger>
                  <post-collapsible id="default-2">
                    <ul>
                      <li>
                        <post-collapsible-trigger for="default-3">
                          <button class="post-sidenavigation-item">
                            Level 3
                            <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                          </button>
                        </post-collapsible-trigger>
                        <post-collapsible id="default-3">
                          <ul>
                            <li><a href="#" class="post-sidenavigation-item">Level 4</a></li>
                          </ul>
                        </post-collapsible>
                      </li>
                    </ul>
                  </post-collapsible>
                </li>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </li>
        </ul>

        <p class="post-sidenavigation-heading">Section title</p>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
          <li>
            <post-collapsible-trigger for="default-4">
              <button class="post-sidenavigation-item">
                Level 1
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
            </post-collapsible-trigger>
            <post-collapsible id="default-4" collapsed>
              <ul>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </li>
        </ul>

        <p class="post-sidenavigation-heading">Section title</p>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
          <li>
            <post-collapsible-trigger for="default-5">
              <button class="post-sidenavigation-item">
                Level 1
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
            </post-collapsible-trigger>
            <post-collapsible id="default-5" collapsed>
              <ul>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </li>
        </ul>
      </nav>
    </post-sidenavigation>
  `;
}

// STORIES

type Story = StoryObj;

export const Default: Story = {};

// Link only — no children, no collapsible.
export const LinkOnly: Story = {
  render: (args: Args) => renderSidenav(linkOnly, args),
};

// Collapsible but not linked — button only on level 1, no link.
export const CollapsibleNotLinked: Story = {
  render: (args: Args) => renderSidenav(collapsibleNotLinked, args),
};

// Collapsible and linked — link + separate expand button on level 1.
export const CollapsibleLinked: Story = {
  render: (args: Args) => renderSidenav(collapsibleLinked, args),
};

// With icons — mirrors Default but all level-1 items have icons.
// Figma rule: either all or none of the level-1 elements on a given level should have an icon.
export const WithIcons: Story = {
  render: (args: Args) => {
    const resolvedId = crypto.randomUUID();
    const titleId = `${resolvedId}-title`;

    return html`
      <post-sidenavigation-trigger for="${resolvedId}">
        <button>
          <span>Menu</span>
          <post-icon aria-hidden="true" name="burger"></post-icon>
        </button>
      </post-sidenavigation-trigger>

      <post-sidenavigation id="${resolvedId}" text-close="${args.textClose}">
        <nav aria-labelledby="${titleId}">
          <h2 id="${titleId}" class="post-sidenavigation-heading">Section title</h2>
          <ul>
            <li>
              <a href="#" class="post-sidenavigation-item">
                <post-icon name="letter" aria-hidden="true"></post-icon>
                Level 1
              </a>
            </li>
            <li>
              <post-collapsible-trigger for="icons-1">
                <button class="post-sidenavigation-item">
                  <post-icon name="bulkparcels" aria-hidden="true"></post-icon>
                  Level 1
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
              </post-collapsible-trigger>
              <post-collapsible id="icons-1">
                <ul>
                  <li>
                    <post-collapsible-trigger for="icons-2">
                      <button class="post-sidenavigation-item">
                        Level 2
                        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                      </button>
                    </post-collapsible-trigger>
                    <post-collapsible id="icons-2">
                      <ul>
                        <li>
                          <post-collapsible-trigger for="icons-3">
                            <button class="post-sidenavigation-item">
                              Level 3
                              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                            </button>
                          </post-collapsible-trigger>
                          <post-collapsible id="icons-3">
                            <ul>
                              <li><a href="#" class="post-sidenavigation-item">Level 4</a></li>
                            </ul>
                          </post-collapsible>
                        </li>
                      </ul>
                    </post-collapsible>
                  </li>
                  <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                </ul>
              </post-collapsible>
            </li>
          </ul>

          <p class="post-sidenavigation-heading">Section title</p>
          <ul>
            <li>
              <a href="#" class="post-sidenavigation-item">
                <post-icon name="search" aria-hidden="true"></post-icon>
                Level 1
              </a>
            </li>
            <li>
              <post-collapsible-trigger for="icons-4">
                <button class="post-sidenavigation-item">
                  <post-icon name="login" aria-hidden="true"></post-icon>
                  Level 1
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
              </post-collapsible-trigger>
              <post-collapsible id="icons-4" collapsed>
                <ul>
                  <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                  <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                </ul>
              </post-collapsible>
            </li>
          </ul>

          <p class="post-sidenavigation-heading">Section title</p>
          <ul>
            <li>
              <a href="#" class="post-sidenavigation-item">
                <post-icon name="gear" aria-hidden="true"></post-icon>
                Level 1
              </a>
            </li>
            <li>
              <post-collapsible-trigger for="icons-5">
                <button class="post-sidenavigation-item">
                  <post-icon name="profile" aria-hidden="true"></post-icon>
                  Level 1
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
              </post-collapsible-trigger>
              <post-collapsible id="icons-5" collapsed>
                <ul>
                  <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                  <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                </ul>
              </post-collapsible>
            </li>
          </ul>
        </nav>
      </post-sidenavigation>
    `;
  },
};

export const ActiveNavigationItem: Story = {
  render: (args: Args) =>
    renderSidenav(
      html`
        <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
        <li>
          <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
          <a href="#" class="post-sidenavigation-item" aria-current="page">Level 1</a>
        </li>
        <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
      `,
      args,
    ),
};

// Realistic integration: the trigger sits in the local header alongside other
// microsite controls. On desktop the grid places local-nav on the right of the
// title (standard microsite layout). On mobile/tablet the trigger opens the dialog.
export const InHeader: Story = {
  render: (args: Args) => html`
    <post-header text-menu="Menu">
      <post-logo slot="post-logo" url="/">Homepage</post-logo>

      <ul slot="local-nav">
        <li>
          <post-sidenavigation-trigger for="sidenav">
            <button>
              <span>Menu</span>
              <post-icon aria-hidden="true" name="burger"></post-icon>
            </button>
          </post-sidenavigation-trigger>
        </li>
        <li>
          <a href="#">
            <span>Search</span>
            <post-icon aria-hidden="true" name="search"></post-icon>
          </a>
        </li>
        <li>
          <a href="">
            <span>Login</span>
            <post-icon name="login"></post-icon>
          </a>
        </li>
      </ul>

      <p slot="title">Application title</p>
    </post-header>

    <post-sidenavigation id="sidenav" text-close="${args.textClose}">
      <nav aria-labelledby="sidenav-title-header">
        <h2 id="sidenav-title-header" class="post-sidenavigation-heading">Section title</h2>
        <ul>
          <li>
            <a href="#" class="post-sidenavigation-item">
              <post-icon name="letter" aria-hidden="true"></post-icon>
              Level 1
            </a>
          </li>
          <li>
            <div class="post-sidenavigation-item">
              <a href="#">
                <post-icon name="package" aria-hidden="true"></post-icon>
                Level 1
              </a>
              <post-collapsible-trigger for="sidenav-header-collapsible">
                <button>
                  <span class="visually-hidden">Expand Level 1</span>
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
              </post-collapsible-trigger>
            </div>
            <post-collapsible id="sidenav-header-collapsible">
              <ul>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
                <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </li>
          <li>
            <a href="#" class="post-sidenavigation-item">
              <post-icon name="search" aria-hidden="true"></post-icon>
              Level 1
            </a>
          </li>
        </ul>
      </nav>
    </post-sidenavigation>
  `,
};