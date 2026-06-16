import { useArgs } from 'storybook/preview-api';
import { StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { spreadArgs } from '@/utils';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent<HTMLPostCollapsibleElement> = {
  id: '6a91848c-16ec-4a23-bc45-51c797b5b2c3',
  title: 'Components/Collapsible',
  tags: ['package:WebComponents'],
  component: 'post-collapsible',
  render: renderCollapsible,
  parameters: {
    badges: [],
    controls: {
      exclude: ['innerHTML'],
    },
  },
  args: {
    innerHTML: `<p class='border rounded p-24'>This is collapsible content that can be shown or hidden.</p>`,
    collapsed: false,
  },
};

export default meta;

//RENDERER
let ignoreToggle = true;
function renderCollapsible(
  { innerHTML, ...args }: Partial<HTMLPostCollapsibleElement>,
  context: StoryContext<HTMLPostCollapsibleElement>,
) {
  const [_, updateArgs] = useArgs();
  const handleToggle = (e: CustomEvent<boolean>) => {
    if (ignoreToggle) return;

    const collapsed = !e.detail;
    updateArgs({ collapsed });
  };

  // ignore the first toggle event after a collapsed arg update
  ignoreToggle = true;
  setTimeout(() => {
    ignoreToggle = false;
  }, 200);

  return html`
    <post-collapsible-trigger for=${context.id}>
      <button class="btn btn-secondary mb-16">Toggle Collapsible</button>
    </post-collapsible-trigger>

    <post-collapsible id=${context.id} ${spreadArgs(args)} @postToggle="${handleToggle}">
      ${unsafeHTML(innerHTML)}
    </post-collapsible>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostCollapsibleElement>;

export const Default: Story = {};

export const InitiallyCollapsed: Story = {
  args: { collapsed: true },
};

export const WrappedCollapsible: Story = {
  render: ({ innerHTML, ...args }: Partial<HTMLPostCollapsibleElement>) => html`
    <post-collapsible-trigger>
      <button class="btn btn-secondary mb-16">Toggle Collapsible</button>
      <post-collapsible ${spreadArgs(args)}> ${unsafeHTML(innerHTML)} </post-collapsible>
    </post-collapsible-trigger>
  `,
};
