import type { StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { StoryContext, StoryFn } from '@storybook/web-components';

const meta: MetaComponent<HTMLPostLanguageOptionElement> = {
  id: '3753ab83-a659-47b5-a2f2-ac452ec97916',
  title: 'Components/Header/Language Option',
  tags: ['package:WebComponents'],
  component: 'post-language-option',
  render: renderLanguageOption,
  decorators: [listContainer],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
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
      description: 'Defines the HTML markup contained in the alert.',
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
  return html` <div role="list">${story(context.args, context)}</div> `;
}

// RENDERERS
function renderLanguageOption(args: Partial<HTMLPostLanguageOptionElement>) {
  return html`<post-language-option
    code=${args.code}
    name=${args.name ? args.name : nothing}
    active=${args.active ? args.active : nothing}
    url=${args.url ? args.url : nothing}
    onClick=${args.url ? nothing : 'e => changeLangTo(e.detail)'}
  >
    ${args.innerHTML}
  </post-language-option>`;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageOptionElement>;

export const Default: Story = {};

export const Anchor: Story = {
  args: {
    url: 'https://www.post.ch/en',
  },
};
