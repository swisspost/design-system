import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spreadArgs } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostBannerElement> = {
  id: '8fd36823-966e-46a8-8432-a4439f6e208f',
  title: 'Components/Banner',
  tags: ['package:WebComponents', 'redirect:105e67d8-31e9-4d0b-87ff-685aba31fd4c'],
  component: 'post-banner',
  render: renderBanner,
  decorators: [externalControl],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1447-8848&node-type=instance&t=NVtE44T0sX5wsag9-0',
    },
  },
  args: {
    innerHTML: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    dismissible: false,
    dismissLabel: 'Dismiss',
  },
  argTypes: {
    dismissLabel: {
      if: {
        arg: 'dismissible',
      },
      type: {
        name: 'string',
        required: true,
      },
    },
    icon: {
      control: {
        type: 'select',
        labels: {
          '1001': '1001 (Envelope)',
          '2023': '2023 (Cog)',
          '2025': '2025 (Send)',
          '2035': '2035 (Home)',
          '2101': '2101 (Bubble)',
        },
      },
      options: ['none', '1001', '2023', '2025', '2035', '2101'],
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
      button.hidden = true;
    }
  };

  setTimeout(() => {
    banner = canvasElement.querySelector('post-banner') as HTMLPostBannerElement;
    button = canvasElement.querySelector('.banner-button') as HTMLButtonElement;

    button.hidden = true;
    banner.addEventListener('postDismissed', () => {
      button.hidden = false;
      button.focus();
    });
  });

  return html`
    <a
      class="btn btn-secondary btn-animated banner-button"
      href="#"
      @click="${(e: Event) => toggleBanner(e)}"
    >
      <span>Reset Banner</span>
    </a>
    <div class="banner-container">${story(args, context)}</div>
  `;
}

// RENDERER
function renderBanner(args: Partial<HTMLPostBannerElement>) {
  console.log(args);
  return html` <post-banner ${spreadArgs(args)}></post-banner> `;
}

// STORIES
type Story = StoryObj<HTMLPostBannerElement>;

export const Default: Story = {};

export const Contents: Story = {
  args: {
    innerHTML:
      '<h4 slot="heading">Titulum</h4>' +
      '<ul class="list-unstyled">' +
      '<li class="d-flex gap-8"><post-icon name="1027"></post-icon>Un orde redlis titem</li>' +
      '<li class="d-flex gap-8"><post-icon name="1028"></post-icon>An deven moreun orde redlis titem</li>' +
      '</ul>' +
      '<hr/>' +
      '<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr.</p>' +
      '<button slot="actions" class="btn btn-secondary btn-animated"><span>Aborti</span></button>' +
      '<button slot="actions" class="btn btn-primary btn-animated"><span>Akcepti</span></button>',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '1001',
  },
};

export const NoIcon: Story = {
  args: {
    icon: 'none',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
  },
};
