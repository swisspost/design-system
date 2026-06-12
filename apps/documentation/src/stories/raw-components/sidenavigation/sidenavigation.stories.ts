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
  render: renderSidenavigationWithHeader(),
  decorators: [(story) => html`<div style="padding-bottom: 3rem">${story()}</div>`],
};

export default meta;

// RENDERERS

// Core renderer: just the sidenavigation component without header.
// Used by snapshots and variant stories.
// Set includeTrigger=false when a trigger is already provided externally (e.g. inside post-header).
export function renderSidenavigation(
  navContent: TemplateResult,
  args: Args,
  navId?: string,
  ariaLabel?: string,
  includeTrigger = true,
) {
  const resolvedId = navId ?? crypto.randomUUID();
  const titleId = `${resolvedId}-title`;

  return html`
    ${includeTrigger
      ? html`
          <post-sidenavigation-trigger for="${resolvedId}">
            <button>
              <span>Menu</span>
              <post-icon aria-hidden="true" name="burger"></post-icon>
            </button>
          </post-sidenavigation-trigger>
        `
      : nothing}

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

// Default story renderer: wraps the core renderer with a post-header.
// The trigger lives inside the header's local-nav slot, so includeTrigger=false
// is passed to renderSidenavigation to avoid a duplicate trigger below the header.
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
        <p slot="title">[Application Title]</p>
        <ul slot="local-nav">
          <li>
            <post-sidenavigation-trigger for="${resolvedId}">
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
          <li class="local-login">
            <a href="">
              <span>Login</span>
              <post-icon name="login"></post-icon>
            </a>
          </li>
        </ul>
      </post-header>
      ${renderSidenavigation(content, args, resolvedId, undefined, false)}
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