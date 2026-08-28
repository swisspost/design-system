import type { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { StoryContext, StoryFn } from '@storybook/web-components-vite';

const meta: MetaComponent<HTMLPostLanguageMenuItemElement> = {
  id: '3753ab83-a659-47b5-a2f2-ac452ec97916',
  title: 'Components/Header/Sub Components/Language Menu Item',
  tags: ['package:WebComponents', 'status:New'],
  component: 'post-language-menu-item',
  render: renderLanguageOption,
  decorators: [listContainer],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
    },
    controls: {
      exclude: ['default', 'variant'],
    },
  },
  args: {
    active: true,
    code: 'en',
    name: 'English',
    innerHTML: 'EN',
  },
  argTypes: {
    innerHTML: {
      description: 'Defines the HTML markup contained in the language menu item.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

// DECORATORS
function listContainer(story: StoryFn, context: StoryContext) {
  return html`
    <post-language-menu
      text-change-language="Change the language"
      text-current-language="The currently selected language is ${context.args.name}"
      variant="list"
      >${story(context.args, context)}</post-language-menu
    >
  `;
}

// RENDERERS
function renderLanguageOption(args: Partial<HTMLPostLanguageMenuItemElement>) {
  return html`<post-language-menu-item
    code=${args.code}
    name=${args.name ? args.name : nothing}
    active=${args.active ? args.active : nothing}
    url=${args.url ? args.url : nothing}
    description=${args.description ? args.description : nothing}
  >
    ${args.innerHTML}
  </post-language-menu-item>`;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageMenuItemElement>;

export const Default: Story = {};
