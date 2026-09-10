import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
  title: 'Components/Breadcrumbs',
  component: 'post-breadcrumbs',
  tags: ['package:WebComponents', 'status:New'],
  render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-16158&m=dev',
    },
    controls: {
      exclude: ['itemCount'],
    },
  },
  args: {
    homeUrl: '/',
    textHome: 'Home',
    textBreadcrumbs: 'Breadcrumbs',
    textMoreItems: 'More items',
    showHomeText: false,
    itemCount: 3,
  },
};

function render(args: Args) {
  return html`
    <post-breadcrumbs
      home-url=${args.homeUrl}
      text-home=${args.textHome}
      text-breadcrumbs=${args.textBreadcrumbs}
      text-more-items=${args.textMoreItems}
      ?show-home-text=${args.showHomeText}
    >
      ${Array.from({ length: args.itemCount }).map(
        (_, i) =>
          html`<post-breadcrumb-item url="/section${i + 1}"
            >Section ${i + 1}</post-breadcrumb-item
          > `,
      )}
    </post-breadcrumbs>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Concatenated: Story = {
  args: {
    itemCount: 15,
  },
};

export const CustomHomeText: Story = {
  args: {
    showHomeText: true,
    textHome: 'Private customers',
  },
  parameters: {
    docs: {
      description: {
        story:
          "Set `show-home-text` to `true` to replace the home icon with the visible text set on `text-home`, enabling segment specific breadcrumbs (e.g. to link to a segment's own home page instead of the generic site root). Unlike the middle segments, home and the last (selected) segment are never simply collapsed into the menu — home gets its own menu as a last resort, and the last segment wraps onto multiple lines only if that's still not enough.",
      },
    },
  },
  render: args => html`
    <post-breadcrumbs
      home-url=${args.homeUrl}
      text-home=${args.textHome}
      text-breadcrumbs=${args.textBreadcrumbs}
      text-more-items=${args.textMoreItems}
      ?show-home-text=${args.showHomeText}
    >
      <post-breadcrumb-item url="/section1">Send letters</post-breadcrumb-item>
      <post-breadcrumb-item url="/section2">Letters abroad</post-breadcrumb-item>
      <post-breadcrumb-item url="/section3">Europe</post-breadcrumb-item>
      <post-breadcrumb-item url="/section4">Neighbouring countries</post-breadcrumb-item>
      <post-breadcrumb-item url="/section5">Letters to Switzerland</post-breadcrumb-item>
    </post-breadcrumbs>
  `,
};

export const ClientSideRouting: Story = {
  args: {
    itemCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slot your own `<a>` (e.g. a framework `Link`) into the `home` slot and into each `post-breadcrumb-item`, instead of using `home-url`/`url`, so client-side routing frameworks like Next.js or Angular Router can handle navigation instead of the browser doing a full page reload.',
      },
    },
    controls: {
      exclude: ['itemCount', 'homeUrl'],
    },
  },
  render: args => html`
    <post-breadcrumbs
      text-home=${args.textHome}
      text-breadcrumbs=${args.textBreadcrumbs}
      text-more-items=${args.textMoreItems}
    >
      <a slot="home" href="/">
        <span class="visually-hidden">${args.textHome}</span>
        <post-icon aria-hidden="true" name="home"></post-icon>
      </a>
      ${Array.from({ length: args.itemCount }, (_, i) => {
        const isLast = i === args.itemCount - 1;
        return html`<post-breadcrumb-item ?selected=${isLast}
          ><a href="/section${i + 1}" aria-current=${isLast ? 'page' : nothing}
            >Section ${i + 1}</a
          ></post-breadcrumb-item
        > `;
      })}
    </post-breadcrumbs>
  `,
};
