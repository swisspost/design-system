import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '605c788d-3f75-4e6c-8498-be3d546843c2',
  title: 'Components/Card',
  tags: ['package:HTML'],
  decorators: [clickBlocker, paddedContainer],
  parameters: {
    badges: [],
    controls: {
      exclude: ['Custom Header', 'Custom Body', 'Custom Footer'],
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
    content: 'Contentus momentus vero siteos et accusam iretea et justo.',
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
      name: 'Show List Group',
      description: 'When set to `true`, a list group is shown in the card.',
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

function paddedContainer(story: StoryFn, context: StoryContext) {
  return html` <div class="p-8">${story(context.args, context)}</div> `;
}

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row">
      <div class="col-lg-4 col-sm-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

// RENDERER
function getCardLinks() {
  return html`
    ${['Ligilo teksto', 'Pli da ligo'].map(
      label => html` <a class="card-link" href="#">${label}</a> `,
    )}
  `;
}

function getCardButton() {
  return html`
    <button class="btn btn-primary">
      <span>Butonon teksto</span>
    </button>
  `;
}

function getCardBody({ customBody, content, action, showTitle, showSubtitle }: Args) {
  if (customBody) return unsafeHTML(customBody);

  return html`
    <div class="card-body">
      ${showTitle ? html` <h5 class="card-title">Titulum</h5> ` : nothing}
      ${showSubtitle ? html` <h6 class="card-subtitle mb-8 text-muted">Sub Titulum</h6> ` : nothing}
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
    <ul class="list-group">
      ${['Ero', 'Dua ero', 'Alio ero'].map(
        label => html` <li class="list-group-item">${label}</li> `,
      )}
    </ul>
  `;
}

function getCardHeader({ customHeader }: Args) {
  if (customHeader) return unsafeHTML(customHeader);

  return html` <div class="card-header">Kapo Titulum</div> `;
}

function getCardFooter({ customFooter }: Args) {
  if (customFooter) return unsafeHTML(customFooter);

  return html` <div class="card-footer">Piedo Contentus momentus</div> `;
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

// STORIES
type Story = StoryObj;

const singleCardStory: Story = {
  decorators: [gridContainer],
  render: renderCard,
};

export const Default: Story = {
  ...singleCardStory,
  parameters: {
    controls: {
      exclude: ['Custom Header', 'Custom Body', 'Custom Footer', 'Show Body', 'Show List Group'],
    },
  },
};

export const ListGroup: Story = {
  ...singleCardStory,
  parameters: {
    controls: {
      include: ['Show Image', 'Image Position', 'Show Header', 'Show Body', 'Show Footer'],
    },
  },
  args: {
    showImage: false,
    showBody: false,
    showListGroup: true,
  },
};

export const CustomContent: Story = {
  ...singleCardStory,
  parameters: {
    controls: {
      include: ['Show Header', 'Show Footer'],
    },
  },
  args: {
    showImage: false,
    showHeader: true,
    showFooter: true,
    customHeader: `<div class="card-header d-flex">
  <post-icon aria-hidden="true" class="fs-small-huge" name="3217"></post-icon>
  <h3 class="fw-bold mb-0 me-auto">Detaloj de la Uzanto</h3>
  <a href="#" aria-labelledby="detaloj-title">
    <post-icon aria-hidden="true" class="fs-large" name="3020"></post-icon>
    <span class="visually-hidden">Administrado de kontoj</span>
  </a>
</div>`,
    customBody: `<ul class="list-group">
  <li class="list-group-item d-flex align-items-center justify-content-between">
    <address class="mb-0">
      Mr<br>Pronomo Familinomo<br>Strato 1<br>1234 Urbo
    </address>
    <a href="#">
      <post-icon aria-label="Redaktu adreson" class="fs-large" name="3193"></post-icon>
      <span class="visually-hidden">Redaktu adreson</span>
    </a>
  </li>
  <li class="list-group-item d-flex align-items-center justify-content-between">
    <p class="mb-0">Lingvo: <span class="fw-bold">Germana</span></p>
    <a href="#">
      <post-icon aria-label="Redakti lingvon" class="fs-large" name="3193"></post-icon>
      <span class="visually-hidden">Redakti lingvon</span>
    </a>
  </li>
</ul>`,
    customFooter: `<div class="card-footer card-links">
  <a href="#">Aldonu adreson</a>
</div>`,
  },
};

export const CardGroup: Story = {
  parameters: {
    controls: {
      include: ['Show Image', 'Image Position', 'Show Header', 'Show Footer'],
    },
  },
  args: {
    action: 'none',
  },
  render: args => {
    const cardTexts = [
      'Enhavo de la maldekstra karto, ĉi tiu teksto estas tie nur kiel ekzemplo.',
      'Enhavo de la meza karto, ĉi tiu teksto estas tie nur kiel ekzemplo.',
      'Enhavo de la ĝusta karto, ĉi tiu teksto estas tie nur kiel ekzemplo.',
    ];

    return html`
      <div class="card-group">
        ${cardTexts.map(text => html` ${renderCard({ ...args, text })} `)}
      </div>
    `;
  },
};

export const BackgroundImage: Story = {
  ...singleCardStory,
  parameters: {
    controls: {
      include: [],
    },
  },
  args: {
    showImage: false,
    customBody: `<img class="card-img" src="https://picsum.photos/id/20/300/200" alt="" />
  <div class="card-img-overlay">
    <div class="card-body">
      <h5 class="card-title">Titulum</h5>

      <p class="card-text">Contentus momentus vero siteos et accusam iretea et justo.</p>

      <button class="btn btn-primary">
        <span>Butonon teksto</span>
      </button>
    </div>
  </div>`,
  },
};
