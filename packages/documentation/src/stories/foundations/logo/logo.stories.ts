import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostLogoElement> = {
  id: '73066e1c-0720-4a9b-8f81-a29d4250872a',
  title: 'Foundations/Logo',
  tags: ['package:WebComponents'],
  component: 'post-logo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=7402-44020&t=NlJxMtn6FqcqrXok-4',
    },
  },
  render: renderLogo(),
  argTypes: {
    url: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

// DECORATORS
function containerWithHeight(story: StoryFn, context: StoryContext) {
  return html` <div class="h-80">${story(context.args, context)}</div> `;
}

// RENDERER
function renderLogo(pageTitle = '[page title]') {
  return (args: Partial<HTMLPostLogoElement>) => {
    const imageDescription = `Logo of the Post`;
    const linkDescription = `${imageDescription}, To ${pageTitle}`;

    return html`
      <post-logo url=${args.url || nothing}
        >${args.url ? linkDescription : imageDescription}</post-logo
      >
    `;
  };
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  decorators: [containerWithHeight],
};

export const Link: Story = {
  args: {
    url: 'https://www.post.ch/en',
  },
  render: renderLogo('the homepage'),
  decorators: [containerWithHeight],
};

export const Height: Story = {
  render: () => html` <post-logo class="h-56">Logo of the Post</post-logo> `,
};
