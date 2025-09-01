import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
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
    innerHTML:
      '<p>This is the content of the banner. It helps to draw attention to critical messages.</p>',
    type: 'info',
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
  const { canvasElement } = context;

  const view = html`
    <a class="btn btn-secondary banner-button" href="#" hidden style="display:none">
      <span>Reset Banner</span>
    </a>
    <div class="banner-container">${story({}, context)}</div>
  `;

  queueMicrotask(() => {
    console.log('on microtask start');
    (canvasElement as any).__cleanup__?.();

    const banner = canvasElement.querySelector('post-banner') as HTMLPostBannerElement | null;
    const btn = canvasElement.querySelector('.banner-button') as HTMLButtonElement | null;
    const container = canvasElement.querySelector('.banner-container') as HTMLElement | null;

    console.log(banner, btn, container);
    if (!banner || !btn || !container) return;

    const hideBtn = () => {
      console.log('hideBtn');
      btn.hidden = true;
      btn.style.display = 'none';
    };
    const showBtnIfDismissible = () => {
      console.log('switch btn if dismissible');
      const isDismissible =
        banner.hasAttribute('dismissible') && banner.getAttribute('dismissible') !== 'false';
      if (isDismissible) {
        btn.hidden = false;
        btn.style.display = '';
        btn.focus();
      }
    };

    hideBtn();

    const onDismiss = () => showBtnIfDismissible();
    banner.addEventListener('postDismissed', onDismiss);

    const mo = new MutationObserver(() => {
      const isDismissible =
        banner.hasAttribute('dismissible') && banner.getAttribute('dismissible') !== 'false';
      if (!isDismissible) hideBtn();
    });
    mo.observe(banner, { attributes: true, attributeFilter: ['dismissible'] });

    const onClick = (e: Event) => {
      e.preventDefault();
      if (!banner.parentNode) {
        container.appendChild(banner);
        hideBtn();
      }
    };
    btn.addEventListener('click', onClick);

    (canvasElement as any).__cleanup__ = () => {
      banner.removeEventListener('postDismissed', onDismiss);
      btn.removeEventListener('click', onClick);
      mo.disconnect();
    };
  });

  return view;
}

// RENDERER
function renderBanner(args: Partial<HTMLPostBannerElement>) {
  return html` <post-banner ${spreadArgs(args)}></post-banner> `;
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
      '<hr/>' +
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
