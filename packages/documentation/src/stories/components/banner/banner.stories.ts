import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { spreadArgs } from '@/utils';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type PostBannerControls = Partial<HTMLPostBannerElement> & { dismissible: boolean };

const meta: MetaComponent<PostBannerControls> = {
  id: '105e67d8-31e9-4d0b-87ff-685aba31fd4c',
  title: 'Components/Banner',
  tags: ['package:WebComponents'],
  component: 'post-banner',
  render: renderBanner,
  decorators: [externalControl],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=1447-8848',
    },
  },
  args: {
    innerHTML:
      '<p>This is the content of the banner. It helps to draw attention to critical messages.</p>',
    type: 'info',
    dismissible: false,
  },
  argTypes: {
    dismissible: {
      description:
        'If `true`, a close button (×) is displayed and the banner can be dismissed by the user.',
      table: {
        category: 'content',
        type: {
          summary: 'boolean',
        },
      },
    },
    innerHTML: {
      description: 'Defines the HTML markup contained in the banner.',
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
function externalControl(story: StoryFn, context: StoryContext) {
  const { args, canvasElement } = context;
  let banner: HTMLPostBannerElement;
  let button: HTMLButtonElement;

  const toggleBanner = async (e: Event) => {
    e.preventDefault();

    const bannerContainer = canvasElement.querySelector('.banner-container') as HTMLElement;

    if (banner.parentNode) {
      await banner.dismiss();
    } else {
      bannerContainer.appendChild(banner);
      button.style.display = 'none';
    }
  };

  setTimeout(() => {
    banner = canvasElement.querySelector('post-banner') as HTMLPostBannerElement;
    button = canvasElement.querySelector('.banner-button') as HTMLButtonElement;

    button.style.display = 'none';
    banner.addEventListener('postDismissed', () => {
      button.style.display = '';
      button.focus();
    });
  });

  return html`
    <a class="btn btn-secondary banner-button" href="#" @click="${(e: Event) => toggleBanner(e)}">
      <span>Reset Banner</span>
    </a>
    <div class="banner-container">${story(args, context)}</div>
  `;
}

// RENDERER
function renderBanner({ innerHTML, dismissible, ...args }: PostBannerControls) {
  return html`
    <post-banner ${spreadArgs(args)}>
      ${dismissible
        ? html` <post-closebutton slot="close-button">Close</post-closebutton> `
        : nothing}
      ${unsafeHTML(innerHTML)}
    </post-banner>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostBannerElement>;

export const Default: Story = {};

export const Contents: Story = {
  args: {
    innerHTML:
      '<h4 slot="heading">Heading Title</h4>' +
      '<ul class="list-unstyled">' +
      '<li class="d-flex gap-8"><post-icon name="1027"></post-icon>An example list item</li>' +
      '<li class="d-flex gap-8"><post-icon name="1028"></post-icon>Another example list item</li>' +
      '</ul>' +
      '<hr class="w-full"/>' +
      '<p>This is the banner content that provides important information to the user.</p>' +
      '<button slot="actions" class="btn btn-secondary"><span>Cancel</span></button>' +
      '<button slot="actions" class="btn btn-primary"><span>Accept</span></button>',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
  },
};
