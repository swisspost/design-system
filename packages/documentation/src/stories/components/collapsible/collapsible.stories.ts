import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spreadArgs } from '../../../utils';

const meta: Meta<HTMLPostCollapsibleElement> = {
  id: '6a91848c-16ec-4a23-bc45-51c797b5b2c3',
  title: 'Components/Collapsible',
  component: 'post-collapsible',
  render: renderCollapsible,
  decorators: [externalControls],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=42%3A358&mode=design&t=OK8meBHjpJvBhwZI-1',
    },
    controls: {
      exclude: ['innerHTML'],
    },
  },
  args: {
    innerHTML: `<p class='border rounded p-large'>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
    collapsed: false,
  },
};

export default meta;

// DECORATORS
function externalControls(story: StoryFn, context: StoryContext) {
  const { args, canvasElement } = context;
  const togglerId = `button--${context.id}`;

  let collapsible!: HTMLPostCollapsibleElement;
  let toggler!: HTMLButtonElement;
  setTimeout(async () => {
    collapsible = canvasElement.querySelector('post-collapsible') as HTMLPostCollapsibleElement;
    toggler = canvasElement.querySelector(`#${togglerId}`) as HTMLButtonElement;

    await collapsible.componentOnReady();

    toggler.setAttribute('aria-controls', collapsible.id);
  });

  const toggle = async () => {
    const isOpen = await collapsible.toggle();
    toggler.setAttribute('aria-expanded', String(isOpen));
  };

  return html`
    <button
      id=${togglerId}
      aria-controls="${collapsible?.id}"
      aria-expanded="${!args.collapsed}"
      class="btn btn-secondary mb-regular"
      @click="${toggle}"
    >
      <span>Toggle Collapsible</span>
    </button>

    ${story(args, context)}
  `;
}

//RENDERER
function renderCollapsible(args: Partial<HTMLPostCollapsibleElement>) {
  return html` <post-collapsible ${spreadArgs(args)}></post-collapsible> `;
}

// STORIES
type Story = StoryObj<HTMLPostCollapsibleElement>;

export const Default: Story = {};

export const InitiallyCollapsed: Story = {
  args: { collapsed: true },
};
