import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import {
  linkOnly,
  nested,
  collapsibleNotLinked,
  collapsibleLinked,
} from './sidenavigation.examples';

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
  render: renderSidenavigationWithHeader(),
};

export default meta;

// RENDERERS

// Core renderer: just the sidenavigation component without header
// Used by snapshots and variant stories
export function renderSidenavigation(navContent: TemplateResult, args: Args, navId?: string, ariaLabel?: string) {
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

// Default story: wraps the core renderer with header
function renderSidenavigationWithHeader(navContent?: TemplateResult) {
  return (args: Args) => {
    const resolvedId = crypto.randomUUID();
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

      ${renderSidenavigation(content, args, resolvedId)}
    `;
  };
}

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
    render: (args: Args) => renderSidenavigation(content, args),
    decorators: [withPadding],
  };
}

export const Default: Story = {};

export const LinkOnly: Story = variantStory(linkOnly);
export const Nested: Story = variantStory(nested);
export const CollapsibleNotLinked: Story = variantStory(collapsibleNotLinked);
export const CollapsibleLinked: Story = variantStory(collapsibleLinked);
export const ActiveNavigationItem: Story = variantStory(activeItem);