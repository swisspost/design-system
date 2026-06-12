import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8d15c75d-3cda-4793-9b85-81f11cabb81c',
  title: 'Raw Components/Side Navigation',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-sidenavigation',
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
        '<post-banner data-size="sm"><p>' +
        'Only level-1 navigation items can have icons. Either <strong>all or none</strong> — do not mix.' +
        '</p></post-banner>',
      control: { type: 'boolean' },
      table: { category: 'Content' },
    },
  },
  render: getSidenavRenderer(),
  decorators: [(story) => html`<div style="padding-bottom: 3rem">${story()}</div>`],
};

export default meta;

// RENDERERS

// Returns a render function for the Default story.
// Accepts optional nav content to override the default; variant stories pass their own content.
// Mirrors the getHeaderRenderer() pattern from header.stories.ts.
function getSidenavRenderer(navContent?: TemplateResult) {
  return (args: Args) => {
    const resolvedId = crypto.randomUUID();
    const titleId = `${resolvedId}-title`;
    const icon = (name: string) =>
      args.showIcons ? html`<post-icon name="${name}" aria-hidden="true"></post-icon>` : nothing;

    const content = navContent ?? html`
      <ul>
        <li>
          <a href="#" class="post-sidenavigation-item">
            ${icon('letter')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger for="default-1">
            <button class="post-sidenavigation-item">
              ${icon('bulkparcels')} Level 1
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
        <li>
          <a href="#" class="post-sidenavigation-item">
            ${icon('search')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger for="default-4">
            <button class="post-sidenavigation-item">
              ${icon('login')} Level 1
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
        <li>
          <a href="#" class="post-sidenavigation-item">
            ${icon('gear')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger for="default-5">
            <button class="post-sidenavigation-item">
              ${icon('profile')} Level 1
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
    `;

    return html`
      <post-header text-menu="Menu">
        <post-logo slot="post-logo" url="/">Homepage</post-logo>

        <ul slot="local-nav">
          <li>
            <post-sidenavigation-trigger for="${resolvedId}">
              <button>
                <span>Menu</span>
                <post-icon aria-hidden="true" name="burger"></post-icon>
              </button>
            </post-sidenavigation-trigger>
          </li>
        </ul>

        <p slot="title">Application title</p>
      </post-header>

      <post-sidenavigation id="${resolvedId}" text-close="${args.textClose}">
        <nav aria-labelledby="${titleId}">
          <h2 id="${titleId}" class="post-sidenavigation-heading">Section title</h2>
          ${content}
        </nav>
      </post-sidenavigation>
    `;
  };
}

// Renders just the trigger + sidenav without a header wrapper, used by variant stories
// so the canvas focuses on the nav content rather than the full page chrome.
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

// Nested but not collapsible — children always visible.
// Parent can be a link or a non-clickable span.
const nested = html`
  <li>
    <a href="#" class="post-sidenavigation-item">Sidenav link</a>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
  <li>
    <span class="post-sidenavigation-item">Not clickable level 1</span>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
`;

// Expandable but not navigable — button only, no link on level 1.
// Shows both without and with a leading icon.
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
        <post-icon name="search" aria-hidden="true"></post-icon>
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

// Active item — aria-current="page" marks the current page link.
const activeItem = html`
  <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
  <li>
    <!-- The active link must have aria-current="page" for correct accessibility and styling. -->
    <a href="#" class="post-sidenavigation-item" aria-current="page">Level 1</a>
  </li>
  <li><a href="#" class="post-sidenavigation-item">Level 1</a></li>
`;

// STORIES

type Story = StoryObj;

// Wraps variant stories (non-fullscreen) with left padding to offset from the canvas edge.
const withPadding = (story: () => unknown) => html`<div style="padding-left: 2rem">${story()}</div>`;

// Shorthand for variant stories that share the same render + decorator pattern.
function variantStory(content: TemplateResult): Story {
  return {
    render: (args: Args) => renderSidenav(content, args),
    decorators: [withPadding],
  };
}

export const Default: Story = {};

export const LinkOnly: Story = variantStory(linkOnly);
export const Nested: Story = variantStory(nested);
export const CollapsibleNotLinked: Story = variantStory(collapsibleNotLinked);
export const CollapsibleLinked: Story = variantStory(collapsibleLinked);
export const ActiveNavigationItem: Story = variantStory(activeItem);