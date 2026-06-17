import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, TemplateResult, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import {
  linkOnly,
  nested,
  collapsibleNotLinked,
  collapsibleLinked,
  activeItem,
} from './side-navigation.examples';

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
        '<post-banner data-size="sm"><p>' +
        'Only level-1 navigation items can have icons.<br>' +
        'Either <strong>all or none</strong>, do not mix.' +
        '</p></post-banner>',
      control: { type: 'boolean' },
      table: { category: 'Content' },
    },
  },
  render: renderSideNavigationWithHeader(),
};

export default meta;

// RENDERERS

// Core renderer: just the side-navigation component without header.
// Used by snapshots and variant stories.
// Set includeTrigger=false when a trigger is already provided externally (e.g. inside post-header).
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
        <h2 id="${titleId}" class="post-side-navigation-heading">Section title</h2>
        ${navContent}
      </nav>
    </post-side-navigation>
  `;
}

// Default story renderer: wraps the core renderer with a post-header.
// The trigger lives inside the header's local-nav slot, so includeTrigger=false
// is passed to renderSideNavigation to avoid a duplicate trigger below the header.
function renderSideNavigationWithHeader(navContent?: TemplateResult) {
  return (args: Args) => {
    const resolvedId = crypto.randomUUID();
    const icon = (name: string) =>
      args.showIcons ? html`<post-icon name="${name}" aria-hidden="true"></post-icon>` : nothing;

    const content = navContent ?? html`
      <ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${icon('letter')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              ${icon('bulkparcels')} Level 1
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
            <post-collapsible>
              <ul>
                <li>
                  <post-collapsible-trigger>
                    <button class="post-side-navigation-item">
                      Level 2
                      <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                    </button>
                    <post-collapsible>
                      <ul>
                        <li>
                          <post-collapsible-trigger>
                            <button class="post-side-navigation-item">
                              Level 3
                              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                            </button>
                            <post-collapsible>
                              <ul>
                                <li><a href="#" class="post-side-navigation-item">Level 4</a></li>
                              </ul>
                            </post-collapsible>
                          </post-collapsible-trigger>
                        </li>
                      </ul>
                    </post-collapsible>
                  </post-collapsible-trigger>
                </li>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </post-collapsible-trigger>
        </li>
      </ul>

      <p class="post-side-navigation-heading">Section title</p>
      <ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${icon('search')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              ${icon('login')} Level 1
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
            <post-collapsible collapsed>
              <ul>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </post-collapsible-trigger>
        </li>
      </ul>

      <p class="post-side-navigation-heading">Section title</p>
      <ul>
        <li>
          <a href="#" class="post-side-navigation-item">
            ${icon('gear')} Level 1
          </a>
        </li>
        <li>
          <post-collapsible-trigger>
            <button class="post-side-navigation-item">
              ${icon('profile')} Level 1
              <post-icon name="chevrondown" aria-hidden="true"></post-icon>
            </button>
            <post-collapsible collapsed>
              <ul>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
              </ul>
            </post-collapsible>
          </post-collapsible-trigger>
        </li>
      </ul>
    `;

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
      ${renderSideNavigation(content, args, resolvedId, undefined, false)}
    `;
  };
}

// HELPERS

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

export const Default: Story = {
  ...getIframeParameters(700),
};

export const LinkOnly: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderSideNavigation(html`<ul>${linkOnly}</ul>`, args),
};

export const Nested: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderSideNavigation(html`<ul>${nested}</ul>`, args),
};

export const CollapsibleNotLinked: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderSideNavigation(html`<ul>${collapsibleNotLinked}</ul>`, args),
};

export const CollapsibleLinked: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderSideNavigation(html`<ul>${collapsibleLinked}</ul>`, args),
};

export const ActiveNavigationItem: Story = {
  ...getIframeParameters(400),
  render: (args: Args) => renderSideNavigation(html`<ul>${activeItem}</ul>`, args),
};