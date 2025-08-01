import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '605c788d-3f75-4e6c-8498-be3d546843c2',
  title: 'Components/Card',
  tags: ['package:HTML'],
  decorators: [clickBlocker],
  parameters: {
    badges: [],
    controls: {
      exclude: [
        'Custom Header',
        'Custom Body',
        'Custom Footer',
        'Show Body',
        'Show List Interactive',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21462-3684&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    showImage: true,
    imagePosition: 'top',
    showHeader: false,
    customHeader: null,
    showBody: true,
    customBody: null,
    showTitle: true,
    showSubtitle: false,
    content: 'This is the card content that can contain various types of information.',
    action: 'button',
    showListGroup: false,
    showFooter: false,
    customFooter: null,
  },
  argTypes: {
    showImage: {
      name: 'Show Image',
      description: 'When set to `true`, an image is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Image',
      },
    },
    imagePosition: {
      name: 'Image Position',
      description: 'Defines the position of the image within the card.',
      if: {
        arg: 'showImage',
      },
      control: {
        type: 'inline-radio',
        labels: {
          top: 'Top',
          bottom: 'Bottom',
        },
      },
      options: ['top', 'bottom'],
      table: {
        category: 'Card Image',
      },
    },
    showHeader: {
      name: 'Show Header',
      description: 'When set to `true`, a header is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Header',
      },
    },
    customHeader: {
      name: 'Custom Header',
      description: 'HTML content to use as a header for the card.',
      if: {
        arg: 'showHeader',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Header',
      },
    },
    showBody: {
      name: 'Show Body',
      description: 'When set to `true`, a body is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    customBody: {
      name: 'Custom Body',
      description: 'HTML content to use as a body for the card.',
      if: {
        arg: 'showBody',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Body',
      },
    },
    showTitle: {
      name: 'Show Title',
      description: 'When set to `true`, a title is shown in the card body.',
      if: {
        arg: 'showBody',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    showSubtitle: {
      name: 'Show Subtitle',
      description: 'When set to `true`, a subtitle is shown in the card body.',
      if: {
        arg: 'showBody',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    content: {
      name: 'Content',
      description: 'The text contained in the card body.',
      if: {
        arg: 'showBody',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Body',
      },
    },
    action: {
      name: 'Action',
      description: 'Defines the call-to-action to show in the card body.',
      if: {
        arg: 'showBody',
      },
      control: {
        type: 'inline-radio',
        labels: {
          button: 'Button',
          links: 'Links',
          none: 'None',
        },
      },
      options: ['button', 'links', 'none'],
      table: {
        category: 'Card Body',
      },
    },
    showListGroup: {
      name: 'Show List Interactive',
      description: 'When set to `true`, a list interactive is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Body',
      },
    },
    showFooter: {
      name: 'Show Footer',
      description: 'When set to `true`, a footer is shown in the card.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Card Footer',
      },
    },
    customFooter: {
      name: 'Custom Footer',
      description: 'HTML content to use as the footer of the card.',
      if: {
        arg: 'showFooter',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'Card Footer',
      },
    },
  },
};

export default meta;

// DECORATORS
function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row gy-16">
      <div class="col-lg-4 col-sm-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

// RENDERER
function getCardLinks() {
  return html`
    ${['Link Text', 'More Link'].map(label => html` <a class="card-link" href="#">${label}</a> `)}
  `;
}

function getCardButton() {
  return html`
    <button class="btn btn-primary">
      <span>Button Text</span>
    </button>
  `;
}

function getCardBody({ customBody, content, action, showTitle, showSubtitle }: Args) {
  if (customBody) return unsafeHTML(customBody);

  return html`
    <div class="card-body">
      ${showTitle ? html` <h5 class="card-title">Card Title</h5> ` : nothing}
      ${showSubtitle
        ? html` <h6 class="card-subtitle mb-8 text-muted">Card Subtitle</h6> `
        : nothing}
      <p class="card-text">${content}</p>
      ${choose(
        action,
        [
          ['button', getCardButton],
          ['links', getCardLinks],
        ],
        () => html` ${nothing} `,
      )}
    </div>
  `;
}

function getCardListGroup() {
  return html`
    <ul class="list-interactive">
      ${['First Item', 'Second Item', 'Another Item'].map(
        label => html` <li class="list-interactive-item">${label}</li> `,
      )}
    </ul>
  `;
}

function getCardHeader({ customHeader }: Args) {
  if (customHeader) return unsafeHTML(customHeader);

  return html` <div class="card-header">Header Title</div> `;
}

function getCardFooter({ customFooter }: Args) {
  if (customFooter) return unsafeHTML(customFooter);

  return html` <div class="card-footer">Footer Content</div> `;
}

function getCardImage({ imagePosition }: Args) {
  return html`
    <img class=${'card-img-' + imagePosition} src="https://picsum.photos/id/20/300/200" alt="" />
  `;
}

function renderCard(args: Args) {
  const { showImage, imagePosition, showHeader, showBody, showListGroup, showFooter } = args;

  return html`
    <div class="card">
      ${showImage && imagePosition === 'top' ? getCardImage(args) : nothing}
      ${showHeader ? getCardHeader(args) : nothing} ${showBody ? getCardBody(args) : nothing}
      ${showListGroup ? getCardListGroup() : nothing} ${showFooter ? getCardFooter(args) : nothing}
      ${showImage && imagePosition === 'bottom' ? getCardImage(args) : nothing}
    </div>
  `;
}

function renderCardWithInteractiveContainer(args: Args) {
  return html`<post-linkarea>${renderCard(args)}</post-linkarea>`;
}

const renderSimpleInteractiveCard = html`
  <post-linkarea>
    <div class="card p-16">
      <p><a href="http://google.com">Interactive card</a></p>
    </div>
  </post-linkarea>
`;

// STORIES
type Story = StoryObj;

const singleCardStory: Story = {
  decorators: [gridContainer],
  render: (args: Args) =>
    html`${args.action === 'button' ? renderCardWithInteractiveContainer(args) : renderCard(args)}`,
};

export const Default: Story = {
  ...singleCardStory,
};

export const Foundation: Story = {
  decorators: [story => html`<div class="d-flex gap-16">${story()}</div>`],
  render: () => html`
    <div class="card p-16">
      <p>Non-interactive card</p>
    </div>
    ${renderSimpleInteractiveCard}
  `,
};

export const Palette: Story = {
  decorators: [],
  parameters: {
    layout: 'fullscreen',
  },
  render: () =>
    html`
      <div class="palette palette-default">
        <div class="container py-32">
          <div class="row gy-16">
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
          </div>
        </div>
      </div>
      <div class="palette palette-alternate">
        <div class="container py-32">
          <div class="row gy-16">
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
            <div class="col-sm-6 col-12">${renderSimpleInteractiveCard}</div>
          </div>
        </div>
      </div>
    `,
};

export const ListGroup: Story = {
  ...singleCardStory,
  args: {
    showImage: false,
    showBody: false,
    showListGroup: true,
    action: 'none',
  },
};

export const CustomContent: Story = {
  ...singleCardStory,
  args: {
    showImage: false,
    showHeader: true,
    showFooter: true,
    action: 'links',
    customHeader: `<div class="card-header d-flex">
  <post-icon aria-hidden="true" scale="2" name="3217"></post-icon>
  <h3 class="fw-bold mb-0 me-auto">User Details</h3>
  <a href="#" aria-labelledby="details-title">
    <post-icon aria-hidden="true" scale="1.5" name="3020"></post-icon>
    <span class="visually-hidden">Account Management</span>
  </a>
</div>`,
    customBody: `<ul class="list-interactive">
  <li class="list-interactive-item d-flex align-items-center justify-content-between">
    <address class="mb-0">
      Mr<br>First Name Last Name<br>Street 1<br>1234 City
    </address>
    <a href="#">
      <post-icon aria-label="Edit Address" scale="1.5" name="3193"></post-icon>
      <span class="visually-hidden">Edit Address</span>
    </a>
  </li>
  <li class="list-interactive-item d-flex align-items-center justify-content-between">
    <p class="mb-0">Language: <span class="fw-bold">English</span></p>
    <a href="#">
      <post-icon aria-label="Edit Language" scale="1.5" name="3193"></post-icon>
      <span class="visually-hidden">Edit Language</span>
    </a>
  </li>
</ul>`,
    customFooter: `<div class="card-footer card-links">
  <a href="#">Add Address</a>
</div>`,
  },
};

export const BackgroundImage: Story = {
  ...singleCardStory,
  args: {
    showImage: false,
    customBody: `<img class="card-img" src="https://picsum.photos/id/20/300/200" alt="" />
  <div class="card-img-overlay">
    <div class="card-body">
      <h5 class="card-title">Card Title</h5>

      <p class="card-text">This is the card content that can contain various types of information.</p>

      <button class="btn btn-primary">
        <span>Button Text</span>
      </button>
    </div>
  </div>`,
  },
};
