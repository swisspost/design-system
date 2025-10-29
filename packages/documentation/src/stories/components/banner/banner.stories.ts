import { StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { useArgs } from 'storybook/preview-api';

type PostBannerControls = Partial<HTMLPostBannerElement> & {
  dismissible: boolean;
  dismissed?: boolean;
};

const meta: MetaComponent<PostBannerControls> = {
  id: '105e67d8-31e9-4d0b-87ff-685aba31fd4c',
  title: 'Components/Banner',
  tags: ['package:WebComponents'],
  component: 'post-banner',
  render: renderBanner,
  decorators: [],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=1447-8848',
    },
    controls: {
      exclude: ['dismissed'],
    },
  },
  args: {
    innerHTML: '<p>This is the content of the banner. It helps to draw attention to critical messages.</p>',
    type: 'info',
    dismissible: false,
    dismissed: false,
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
    dismissed: {
      table: { disable: true },
      control: { disable: true },
    },
  },
};

export default meta;

// Renderer
function renderBanner({ innerHTML, dismissible, dismissed, type }: PostBannerControls) {
  const [, updateArgs] = useArgs();

  if (dismissed && !dismissible) {
    updateArgs({ dismissed: false });
    return html``;
  }

  if (dismissed) {
    return html`
      <button class="btn btn-secondary" @click=${() => updateArgs({ dismissed: false })}>
        Reset Banner
      </button>`;
  }

  return html`
  <post-banner type=${type === 'info' ? nothing : type} @postDismissed=${() => updateArgs({ dismissed: true })}>
      ${dismissible
        ? html`
            <post-closebutton
              slot="close-button"
            >
              Close
            </post-closebutton>
          `
        : nothing}
      ${unsafeHTML(innerHTML ?? '')}
    </post-banner>
  `;
}

// STORIES
type Story = StoryObj<PostBannerControls>;

export const Default: Story = {};

export const Contents: Story = {
  args: {
    innerHTML:
      '<h4 slot="heading">Heading Title</h4>' +
      '<ul class="list-unstyled">' +
      '<li class="d-flex gap-8"><post-icon name="moon"></post-icon>An example list item</li>' +
      '<li class="d-flex gap-8"><post-icon name="sun"></post-icon>Another example list item</li>' +
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
