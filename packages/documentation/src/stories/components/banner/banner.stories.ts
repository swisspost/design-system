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
    innerHTML: '<p>This is the content of the banner. It helps to draw attention to critical messages.</p>',
    type: 'info',
    dismissible: false,
  },
  argTypes: {
    dismissible: {
      description: 'If `true`, a close button (×) is displayed and the banner can be dismissed by the user.',
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

interface CleanupHTMLElement extends HTMLElement {
  __cleanup__?: () => void;
}

// DECORATORS
function externalControl(story: StoryFn, context: StoryContext) {
  const { canvasElement, args } = context;

  const view = html`
    <a class="btn btn-secondary banner-button" href="#" style="display:none">
      <span>Reset Banner</span>
    </a>
    <div class="banner-container">${story({}, context)}</div>
  `;

  queueMicrotask(() => {
    const element = canvasElement as CleanupHTMLElement;
    element.__cleanup__?.();

    const banner = element.querySelector('post-banner') as HTMLPostBannerElement;
    const btn = element.querySelector('.banner-button') as HTMLButtonElement;
    const container = element.querySelector('.banner-container') as HTMLElement;

    if (!banner || !btn || !container) return;

    let hasBeenDismissed = false;

    const updateButton = () => {
      const shouldShow = args.dismissible && hasBeenDismissed;
      btn.style.display = shouldShow ? '' : 'none';
      if (shouldShow) btn.focus();
    };

    // Initial state
    updateButton();

    // Handle dismiss event
    const onDismiss = () => {
      hasBeenDismissed = true;
      updateButton();
    };

    const onReset = (e: Event) => {
      e.preventDefault();
      if (!banner.parentNode) {
        container.appendChild(banner);
        hasBeenDismissed = false;
        updateButton();
      }
    };

    banner.addEventListener('postDismissed', onDismiss);
    btn.addEventListener('click', onReset);

    element.__cleanup__ = () => {
      banner.removeEventListener('postDismissed', onDismiss);
      btn.removeEventListener('click', onReset);
    };
  });

  return view;
}

// RENDERER
function renderBanner({ innerHTML, dismissible, ...args }: PostBannerControls) {
  return html`
    <post-banner ${spreadArgs(args)}>
      ${dismissible ? html`
        <post-closebutton slot="close-button">Close</post-closebutton>
      ` : nothing}
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
