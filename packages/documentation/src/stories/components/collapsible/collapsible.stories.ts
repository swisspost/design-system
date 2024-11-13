import { useArgs } from '@storybook/preview-api';
import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
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
  decorators: [gap],
  parameters: {
    badges: [],
    controls: {
      exclude: ['innerHTML'],
    },
  },
  args: {
    innerHTML: `<p class='border rounded p-24'>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
    collapsed: false,
  },
};

export default meta;

// DECORATORS
function gap(story: StoryFn, context: StoryContext) {
  return html` <div class="d-flex flex-column gap-16">${story(context.args, context)}</div> `;
}

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
      <button class="btn btn-secondary">Toggle Collapsible</button>
    </post-collapsible-trigger>

    <post-collapsible id=${context.id} ${spreadArgs(args)}  @postToggle="${handleToggle}">
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
