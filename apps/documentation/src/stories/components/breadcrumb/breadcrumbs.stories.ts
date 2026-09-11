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

export const ClientSideRouting: Story = {
  args: {
    itemCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slot your own `<a>` (e.g. a framework `Link`) into the `home` slot and into each `post-breadcrumb-item`, instead of using `home-url`/`url`, so client-side routing frameworks like Next.js or Angular Router can handle navigation instead of the browser doing a full page reload. The slotted `<a>` must be a direct child of `post-breadcrumbs`/`post-breadcrumb-item`, not wrapped in another element.',
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
