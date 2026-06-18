import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { deepNesting, withIcons, activeItem } from './side-navigation.examples';

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
};

export default meta;

// RENDERERS

export function renderSideNavigation(
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
          <post-side-navigation-trigger for="${resolvedId}">
            <button>
              <span>Menu</span>
              <post-icon aria-hidden="true" name="burger"></post-icon>
            </button>
          </post-side-navigation-trigger>
        `
      : nothing}

    <post-side-navigation id="${resolvedId}" text-close="${args.textClose}">
      <nav
        aria-labelledby="${ariaLabel ? nothing : titleId}"
        aria-label="${ariaLabel ?? nothing}"
      >
        ${navContent}
      </nav>
    </post-side-navigation>
  `;
}

function renderWithHeader(navContent: TemplateResult, args: Args) {
  const resolvedId = crypto.randomUUID();

  return html`
    <post-header text-menu="Menu">
      <post-logo slot="post-logo" url="/">Homepage</post-logo>
      <p slot="title">[Application Title]</p>
      <ul slot="local-nav">
        <li>
          <post-side-navigation-trigger for="${resolvedId}">
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
    ${renderSideNavigation(navContent, args, resolvedId, undefined, false)}
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

// STORIES

type Story = StoryObj;

/**
 * Default: Composed example showing all navigation patterns
 */
export const Default: Story = {
  ...getIframeParameters(900),
  render: (args: Args) =>
    renderWithHeader(
      html`
        <!-- Link only: Simple links without nesting or disclosure controls -->
        <h2 class="post-side-navigation-heading">Section title</h2>
        
        <ul>
          <li><a href="#" class="post-side-navigation-item">Link only</a></li>
          <li><a href="#" class="post-side-navigation-item">Link only</a></li>
        </ul>

        <!-- Nested but not collapsible: Hierarchical items with children always visible. 
             Parent can be a link or a non-clickable span. -->
        <h2 class="post-side-navigation-heading">Section title</h2>

        <ul>
          <li>
            <a href="#" class="post-side-navigation-item">Nested but not collapsible</a>
            <ul>
              <li><a href="#" class="post-side-navigation-item">Child link</a></li>
              <li><a href="#" class="post-side-navigation-item">Child link</a></li>
            </ul>
          </li>
        </ul>

        <!-- Collapsible but not linked: Expandable sections with a button.
             Level-1 items disclose children but don't navigate anywhere. -->
        <h2 class="post-side-navigation-heading">Section title</h2>

        <ul>
          <li>
            <post-collapsible-trigger>
              <button class="post-side-navigation-item">
                Collapsible but not linked
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
              <post-collapsible collapsed>
                <ul>
                  <li><a href="#" class="post-side-navigation-item">Child link</a></li>
                  <li><a href="#" class="post-side-navigation-item">Child link</a></li>
                </ul>
              </post-collapsible>
            </post-collapsible-trigger>
          </li>
        </ul>

        <!-- Collapsible and linked: Level-1 items both navigate and expand.
             A link and a separate disclosure button work together. -->
        <h2 class="post-side-navigation-heading">Section title</h2>

        <ul>
          <li>
            <post-collapsible-trigger>
              <div class="post-side-navigation-item">
                <a href="#">Collapsible and linked</a>
                <button>
                  <span class="visually-hidden">Expand</span>
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
              </div>
              <post-collapsible collapsed>
                <ul>
                  <li><a href="#" class="post-side-navigation-item">Child link</a></li>
                  <li><a href="#" class="post-side-navigation-item">Child link</a></li>
                </ul>
              </post-collapsible>
            </post-collapsible-trigger>
          </li>
        </ul>
      `,
      args,
    ),
};

/**
 * Deep Nesting: Shows navigation with maximum depth (4 levels)
 */
export const DeepNesting: Story = {
  ...getIframeParameters(500),
  render: (args: Args) =>
    renderWithHeader(html`${deepNesting}`, args),
};

/**
 * With Icons: Navigation items with icons on level 1
 */
export const WithIcons: Story = {
  ...getIframeParameters(600),
  render: (args: Args) =>
    renderWithHeader(html`${withIcons}`, args),
};

export const ActiveNavigationItem: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderWithHeader(html`<ul>${activeItem}</ul>`, args),
};